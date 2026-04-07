import { expect } from 'vitest';
import { commands } from 'vitest/browser';

import type {
  CompareWithFigmaOptions,
  CompareWithFigmaResult,
} from './vitest.commands';

// Augment the BrowserCommands type to include our custom command
declare module 'vitest/browser' {
  interface BrowserCommands {
    compareWithFigma: (
      selectorOrBase64: string,
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
 * 1. Takes a screenshot of the provided element/locator using Playwright directly
 * 2. Compares against a Figma-exported reference image
 * 3. Generates diff images in .vitest-attachments/ for inspection
 *
 * Key behaviors:
 * - Never creates/updates baseline files - fails if reference is missing
 * - References stored in `__screenshots__/{spec-name}/{imageName}`
 * - Use `yarn test-vrt:report` to generate an interactive HTML report
 * - Screenshots are taken via Playwright to avoid Vitest locator scaling issues
 */
async function toMatchFigmaSnapshot(
  this: ReturnType<typeof expect.getState>,
  received: { selector: string } | string,
  options?: ToMatchFigmaSnapshotOptions,
): Promise<{ pass: boolean; message: () => string }> {
  // Get the selector string - either from locator or passed directly
  let selectorOrBase64: string;

  if (typeof received === 'string') {
    // Could be a selector or base64 - let the command figure it out
    selectorOrBase64 = received;
  } else if (received && typeof received.selector === 'string') {
    // Vitest locator - selector is a property, not a method
    selectorOrBase64 = received.selector;
  } else {
    return {
      pass: false,
      message: () =>
        'Expected a Vitest Browser locator with selector property or a selector/base64 string',
    };
  }

  // Run the comparison - screenshot is taken server-side via Playwright
  const result = (await commands.compareWithFigma(
    selectorOrBase64,
    options,
  )) as CompareWithFigmaResult;

  return {
    pass: result.matches,
    message: () => result.message,
  };
}

// Extend Vitest's expect with our custom matcher
expect.extend({ toMatchFigmaSnapshot });

// Type augmentation for TypeScript
declare module 'vitest' {
  interface Assertion {
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
