import { expect } from 'vitest';
import { commands } from '@vitest/browser/context';
import type { CompareWithFigmaOptions, CompareWithFigmaResult } from './vitest.commands';

// Augment the BrowserCommands type to include our custom command
declare module '@vitest/browser/context' {
  interface BrowserCommands {
    compareWithFigma: (
      screenshotBase64: string,
      options?: CompareWithFigmaOptions & { imageName?: string },
    ) => Promise<CompareWithFigmaResult>;
  }
}

export interface ToMatchFigmaSnapshotOptions extends CompareWithFigmaOptions {
  /** Override the image name (defaults to test name + '.png') */
  imageName?: string;
}

/**
 * Custom Vitest matcher for comparing screenshots against Figma reference images.
 *
 * This matcher:
 * 1. Takes a screenshot of the provided element/locator
 * 2. Compares against a Figma-exported reference image
 * 3. Generates diff images in .vitest-attachments/ for inspection
 *
 * Key behaviors:
 * - Never creates/updates baseline files - fails if reference is missing
 * - References stored in `__screenshots__/{spec-name}/{imageName}`
 * - Use `yarn test-vrt:report` to generate an interactive HTML report
 */
async function toMatchFigmaSnapshot(
  this: ReturnType<typeof expect.getState>,
  received: { screenshot: (options?: { base64: true }) => Promise<{ base64: string }> } | string,
  options?: ToMatchFigmaSnapshotOptions,
): Promise<{ pass: boolean; message: () => string }> {
  // Get screenshot base64 - either from locator or passed directly
  let base64: string;

  if (typeof received === 'string') {
    base64 = received;
  } else if (received && typeof received.screenshot === 'function') {
    const screenshot = await received.screenshot({ base64: true });
    base64 = screenshot.base64;
  } else {
    return {
      pass: false,
      message: () =>
        'Expected a Vitest Browser locator with screenshot() method or a base64 string',
    };
  }

  // Run the comparison
  const result = (await commands.compareWithFigma(base64, options)) as CompareWithFigmaResult;

  return {
    pass: result.matches,
    message: () => result.message,
  };
}

// Extend Vitest's expect with our custom matcher
expect.extend({ toMatchFigmaSnapshot });

// Type augmentation for TypeScript
declare module 'vitest' {
  interface Assertion<T> {
    /**
     * Compare screenshot against a Figma reference image.
     *
     * @example
     * ```ts
     * // With a locator (recommended)
     * const element = page.getByTestId('my-component');
     * await expect(element).toMatchFigmaSnapshot({ imageName: 'my-component.png' });
     *
     * // With base64 directly
     * const screenshot = await element.screenshot({ base64: true });
     * await expect(screenshot.base64).toMatchFigmaSnapshot({ imageName: 'my-component.png' });
     * ```
     */
    toMatchFigmaSnapshot(options?: ToMatchFigmaSnapshotOptions): Promise<void>;
  }

  interface AsymmetricMatchersContaining {
    toMatchFigmaSnapshot(options?: ToMatchFigmaSnapshotOptions): void;
  }
}
