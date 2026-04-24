import { promises as fs } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

import pixelmatch from 'pixelmatch';
// @ts-expect-error - pngjs has no type declarations
import { PNG } from 'pngjs';
import type { BrowserCommand, BrowserCommandContext } from 'vitest/node';

/** Options for configuring the Figma comparison behavior */
export interface CompareWithFigmaOptions {
  threshold?: number;
  maxDiffPercentage?: number;
  sizeTolerance?: number; // Allow small size differences (default: 2px)
  /**
   * When set, the baseline is a live Playwright capture of this HTML file
   * (viewport and clip match the captured component PNG size), instead of
   * `__screenshots__/{spec}/{imageName}`.
   */
  htmlReferencePath?: string;
}

async function captureHtmlReferenceClip(
  context: BrowserCommandContext,
  absoluteHtmlPath: string,
  clipWidth: number,
  clipHeight: number,
): Promise<{ ok: true; buffer: Buffer } | { ok: false; message: string }> {
  if (context.provider.name !== 'playwright') {
    return {
      ok: false,
      message: `HTML reference capture only supported with Playwright provider (got: ${context.provider.name})`,
    };
  }

  const browser = context.context.browser();
  if (!browser) {
    return {
      ok: false,
      message: 'Could not access browser instance from context',
    };
  }

  const newContext = await browser.newContext({
    deviceScaleFactor: 1,
    viewport: { width: Math.max(1, clipWidth), height: Math.max(1, clipHeight) },
  });

  try {
    const page = await newContext.newPage();
    await page.goto(pathToFileURL(absoluteHtmlPath).href, {
      waitUntil: 'networkidle',
    });

    await page.evaluate(() => document.fonts.ready);

    await page.evaluate(async () => {
      const images = document.querySelectorAll('img');
      await Promise.all(
        Array.from(images).map(async (img) => {
          if (img.complete && img.naturalWidth > 0) {
            return img.decode().catch(() => {});
          }
          return new Promise<void>((resolve) => {
            img.addEventListener('load', async () => {
              await img.decode().catch(() => {});
              resolve();
            });
            img.addEventListener('error', () => resolve());
            setTimeout(() => resolve(), 5000);
          });
        }),
      );
    });

    const buffer = await page.screenshot({
      type: 'png',
      clip: {
        x: 0,
        y: 0,
        width: Math.max(1, clipWidth),
        height: Math.max(1, clipHeight),
      },
    });

    await page.close();
    return { ok: true, buffer: Buffer.from(buffer) };
  } catch (err) {
    return {
      ok: false,
      message: `Failed to capture HTML reference "${absoluteHtmlPath}": ${err}`,
    };
  } finally {
    await newContext.close();
  }
}

/** Result returned from the Figma comparison command */
export interface CompareWithFigmaResult {
  /** Whether the images match within the configured threshold */
  matches: boolean;
  /** Percentage of pixels that differ between images */
  diffPercentage: number;
  /** Whether there was a size mismatch beyond tolerance */
  sizeMismatch: boolean;
  /** Human-readable message describing the result */
  message: string;
}

/**
 * Server-side command to compare a screenshot with a reference image.
 * - Never creates/updates baseline files - fails if reference is missing
 * - Handles size mismatches by padding and still generating diff
 * - Always logs diff percentage and generates diff image
 * - Outputs diffs to .vitest-attachments directory
 *
 * @param context
 * @param selectorOrBase64 - Either a CSS selector string to capture, or Base64-encoded PNG screenshot
 * @param options - Optional comparison options (including optional imageName override)
 */
export const compareWithFigma: BrowserCommand<
  [
    selectorOrBase64: string,
    options?: CompareWithFigmaOptions & { imageName?: string },
  ]
> = async (context, selectorOrBase64, options = {}) => {
  // Get testPath and testName from context
  const testPath = context.testPath ?? '';
  const testName = (
    context as BrowserCommandContext & { task?: { name?: string } }
  ).task?.name;

  // Read global options from vitest config (browser.compareWithFigmaOptions)
  const browserConfig = context.project?.config?.browser as unknown as
    | Record<string, unknown>
    | undefined;
  const globalOptions = (browserConfig?.['compareWithFigmaOptions'] ??
    {}) as CompareWithFigmaOptions;

  // Determine if input is a selector or base64 data
  // Base64 PNG data starts with 'iVBORw0KGgo' (the base64 encoding of PNG header)
  const isBase64 =
    selectorOrBase64.startsWith('iVBOR') || selectorOrBase64.length > 1000;

  let screenshotBuffer: Buffer;
  let targetWidth = 0;
  let targetHeight = 0;

  if (isBase64) {
    // Legacy path: decode the base64 screenshot passed from the test
    screenshotBuffer = Buffer.from(selectorOrBase64, 'base64');
    const screenshot = PNG.sync.read(screenshotBuffer);
    targetWidth = screenshot.width;
    targetHeight = screenshot.height;
  } else {
    // New path: take a screenshot directly using Playwright via the context
    // This avoids the Vitest locator scaling issues
    if (context.provider.name !== 'playwright') {
      return {
        matches: false,
        diffPercentage: 100,
        sizeMismatch: false,
        message: `Selector-based screenshots only supported with Playwright provider (got: ${context.provider.name})`,
      };
    }

    try {
      // Use Playwright's native screenshot API to bypass Vitest's iframe scaling issues
      // (See: https://github.com/vitest-dev/vitest/issues/9363)
      // context.iframe is a FrameLocator, context.frame() returns the actual Frame
      const frameLocator = context.iframe;
      const frame = await context.frame();

      // Get the element's actual dimensions from the DOM (unscaled CSS pixels)
      const elementHandle = await frameLocator
        .locator(selectorOrBase64)
        .elementHandle();
      if (!elementHandle) {
        throw new Error(`Element not found: ${selectorOrBase64}`);
      }

      const domRect = await elementHandle.evaluate((el) => {
        const rect = el.getBoundingClientRect();
        return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
      });

      // Target dimensions from DOM (CSS pixels) - this is what Figma baselines use
      targetWidth = Math.round(domRect.width);
      targetHeight = Math.round(domRect.height);

      // Get the element's outer HTML to re-render in a clean page
      const elementHtml = await elementHandle.evaluate((el) => el.outerHTML);

      // Get all stylesheets from the iframe to include in the new page
      // frame.evaluate() works on the actual Frame object
      const styles = await frame.evaluate(() => {
        const styleSheets = Array.from(document.styleSheets);
        let css = '';
        for (const sheet of styleSheets) {
          try {
            const rules = Array.from(sheet.cssRules || []);
            css += rules.map((rule) => rule.cssText).join('\n');
          } catch {
            // Skip cross-origin stylesheets
          }
        }
        return css;
      });

      // Create a new browser context with deviceScaleFactor: 1 for accurate screenshots
      // This bypasses Vitest's iframe scaling issues on retina displays
      // context.context is the BrowserContext, from which we can get the browser
      const browser = context.context.browser();
      if (!browser) {
        throw new Error('Could not access browser instance from context');
      }

      const newContext = await browser.newContext({
        deviceScaleFactor: 1,
        viewport: { width: targetWidth + 100, height: targetHeight + 100 },
      });

      try {
        const newPage = await newContext.newPage();

        // Get the base URL from the original frame for resolving relative URLs
        const baseUrl = await frame.evaluate(() => window.location.href);

        // Build a minimal HTML page with the element and styles
        // Include base tag so relative URLs (images, etc.) resolve correctly
        const html = `
          <!DOCTYPE html>
          <html>
          <head>
            <base href="${baseUrl}">
            <style>${styles}</style>
            <style>
              body { margin: 0; padding: 0; }
              #root { display: inline-block; }
            </style>
          </head>
          <body>
            <div id="root">${elementHtml}</div>
          </body>
          </html>
        `;

        await newPage.setContent(html, { waitUntil: 'networkidle' });

        // Wait for fonts to load
        await newPage.evaluate(() => document.fonts.ready);

        // Wait for all images to load
        await newPage.evaluate(async () => {
          const images = document.querySelectorAll('img');
          await Promise.all(
            Array.from(images).map(async (img) => {
              if (img.complete && img.naturalWidth > 0) {
                return img.decode().catch(() => {});
              }
              return new Promise<void>((resolve) => {
                img.addEventListener('load', async () => {
                  await img.decode().catch(() => {});
                  resolve();
                });
                img.addEventListener('error', () => resolve());
                // Timeout after 5s to doesn't block forever
                setTimeout(() => resolve(), 5000);
              });
            }),
          );
        });

        // Take a screenshot of the element at 1:1 scale
        const element = newPage.locator('#root > *');
        screenshotBuffer = await element.screenshot();

        await newPage.close();
      } finally {
        await newContext.close();
      }
    } catch (err) {
      return {
        matches: false,
        diffPercentage: 100,
        sizeMismatch: false,
        message: `Failed to capture screenshot for selector "${selectorOrBase64}": ${err}`,
      };
    }
  }

  // Resolve testPath relative to project root (process.cwd())
  const absoluteTestPath = path.isAbsolute(testPath)
    ? testPath
    : path.join(process.cwd(), testPath);
  const testDir = path.dirname(absoluteTestPath);
  const specName = path.basename(absoluteTestPath);

  // Use the provided imageName or derive from the test name
  if (!options.imageName && !testName) {
    return {
      matches: false,
      diffPercentage: 100,
      sizeMismatch: false,
      message:
        'MISSING TEST NAME: context.task is undefined. Provide imageName in options.',
    };
  }
  const imageName = options.imageName ?? `${testName}.png`;

  // Merge options: per-call options > global config > defaults
  const {
    threshold = globalOptions.threshold ?? 0.1,
    maxDiffPercentage = globalOptions.maxDiffPercentage ?? 1.0,
    sizeTolerance = globalOptions.sizeTolerance ?? 2,
    htmlReferencePath,
  } = options;

  // Reference image path: __screenshots__/{spec-name}/{imageName}
  const screenshotsDir = path.join(testDir, '__screenshots__', specName);
  const baselinePath = path.join(screenshotsDir, imageName);

  // Diff output path: .vitest-attachments/{spec-name}/ (at project root)
  const attachmentDir = path.join(
    process.cwd(),
    '.vitest-attachments',
    specName,
  );
  const baseName = imageName.replace(/\.png$/, '');
  const diffPath = path.join(attachmentDir, `${baseName}-diff.png`);
  const actualPath = path.join(attachmentDir, `${baseName}-actual.png`);
  const referencePath = path.join(attachmentDir, `${baseName}-reference.png`);

  // Ensure the attachment directory exists
  await fs.mkdir(attachmentDir, { recursive: true });

  // Save the actual screenshot for inspection
  await fs.writeFile(actualPath, screenshotBuffer);

  let baselineData: Buffer;

  if (htmlReferencePath) {
    const absoluteHtmlPath = path.isAbsolute(htmlReferencePath)
      ? htmlReferencePath
      : path.join(process.cwd(), htmlReferencePath);

    try {
      await fs.access(absoluteHtmlPath);
    } catch {
      return {
        matches: false,
        diffPercentage: 100,
        sizeMismatch: false,
        message: `MISSING HTML REFERENCE: ${absoluteHtmlPath}`,
      };
    }

    const htmlCapture = await captureHtmlReferenceClip(
      context,
      absoluteHtmlPath,
      targetWidth,
      targetHeight,
    );

    if (!htmlCapture.ok) {
      return {
        matches: false,
        diffPercentage: 100,
        sizeMismatch: false,
        message: htmlCapture.message,
      };
    }

    baselineData = htmlCapture.buffer;
  } else {
    // Check if a baseline exists - never create it, just fail
    try {
      await fs.access(baselinePath);
    } catch (err) {
      const message = `MISSING REFERENCE IMAGE: ${baselinePath}`;
      console.error(`[compareWithFigma] ${message}`);
      console.error(`[compareWithFigma] Error details:`, err);
      console.error(
        `[compareWithFigma] testPath: ${testPath}, testDir: ${testDir}, specName: ${specName}`,
      );
      return {
        matches: false,
        diffPercentage: 100,
        sizeMismatch: false,
        message,
      };
    }

    baselineData = Buffer.from(await fs.readFile(baselinePath));
  }

  // Copy resolved baseline (file or html capture) to attachments for report
  await fs.writeFile(referencePath, baselineData);

  const baseline = PNG.sync.read(baselineData);
  const screenshot = PNG.sync.read(screenshotBuffer);

  let sizeMismatch = false;
  let width = baseline.width;
  let height = baseline.height;

  // Handle size differences - only flag as a mismatch if beyond tolerance
  const widthDiff = Math.abs(baseline.width - screenshot.width);
  const heightDiff = Math.abs(baseline.height - screenshot.height);
  const withinTolerance =
    widthDiff <= sizeTolerance && heightDiff <= sizeTolerance;

  if (
    baseline.width !== screenshot.width ||
    baseline.height !== screenshot.height
  ) {
    if (!withinTolerance) {
      sizeMismatch = true;
    }
    console.warn(
      `[compareWithFigma] SIZE DIFF: baseline=${baseline.width}x${baseline.height}, ` +
        `screenshot=${screenshot.width}x${screenshot.height} ` +
        `(${withinTolerance ? 'within tolerance' : 'MISMATCH'})`,
    );

    // Use the larger dimensions
    width = Math.max(baseline.width, screenshot.width);
    height = Math.max(baseline.height, screenshot.height);

    // Create padded versions of both images
    const paddedBaseline = new PNG({ width, height });
    const paddedScreenshot = new PNG({ width, height });

    // Fill with white background
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (width * y + x) << 2;
        paddedBaseline.data[idx] = 255;
        paddedBaseline.data[idx + 1] = 255;
        paddedBaseline.data[idx + 2] = 255;
        paddedBaseline.data[idx + 3] = 255;
        paddedScreenshot.data[idx] = 255;
        paddedScreenshot.data[idx + 1] = 255;
        paddedScreenshot.data[idx + 2] = 255;
        paddedScreenshot.data[idx + 3] = 255;
      }
    }

    // Copy original images into padded versions
    PNG.bitblt(
      baseline,
      paddedBaseline,
      0,
      0,
      baseline.width,
      baseline.height,
      0,
      0,
    );
    PNG.bitblt(
      screenshot,
      paddedScreenshot,
      0,
      0,
      screenshot.width,
      screenshot.height,
      0,
      0,
    );

    // Replace with padded versions for comparison
    baseline.data = paddedBaseline.data;
    baseline.width = width;
    baseline.height = height;
    screenshot.data = paddedScreenshot.data;
    screenshot.width = width;
    screenshot.height = height;
  }

  // Create diff image
  const diff = new PNG({ width, height });

  // Compare images
  const numDiffPixels = pixelmatch(
    baseline.data,
    screenshot.data,
    diff.data,
    width,
    height,
    { threshold },
  );

  // Always save diff image (even on pass)
  const diffBuffer = PNG.sync.write(diff);
  await fs.writeFile(diffPath, diffBuffer);

  const totalPixels = width * height;
  const diffPercentage = (numDiffPixels / totalPixels) * 100;
  const matches = !sizeMismatch && diffPercentage <= maxDiffPercentage;

  // Save an error message to JSON for the VRT report
  const errorMessage = sizeMismatch
    ? `Size mismatch and ${diffPercentage.toFixed(2)}% pixel difference`
    : !matches
      ? `Image differs by ${diffPercentage.toFixed(2)}% (threshold: ${maxDiffPercentage}%)`
      : null;

  const metadataPath = path.join(attachmentDir, `${baseName}-metadata.json`);
  await fs.writeFile(
    metadataPath,
    JSON.stringify(
      {
        matches,
        diffPercentage,
        maxDiffPercentage,
        sizeMismatch,
        errorMessage,
        baselineSize: { width: baseline.width, height: baseline.height },
        screenshotSize: { width: screenshot.width, height: screenshot.height },
      },
      null,
      2,
    ),
  );

  // Always log diff percentage
  console.log(
    `[compareWithFigma] ${imageName}: ${diffPercentage.toFixed(2)}% diff ` +
      `(${matches ? 'PASS' : 'FAIL'}, threshold: ${maxDiffPercentage}%)` +
      (sizeMismatch ? ' [SIZE MISMATCH]' : ''),
  );
  console.log(`[compareWithFigma] Diff saved to: ${diffPath}`);

  const message = sizeMismatch
    ? `Size mismatch and ${diffPercentage.toFixed(2)}% pixel difference. See diff: ${diffPath}`
    : matches
      ? `Image matches reference (diff: ${diffPercentage.toFixed(2)}%). See diff: ${diffPath}`
      : `Image differs by ${diffPercentage.toFixed(2)}% (threshold: ${maxDiffPercentage}%). See diff: ${diffPath}`;

  return {
    matches,
    diffPercentage,
    sizeMismatch,
    message,
  } as CompareWithFigmaResult;
};
