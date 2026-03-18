import { expect, it } from 'vitest';
import { page } from '@vitest/browser/context';
import * as React from 'react';
import { render } from 'vitest-browser-react';
import { WorldPeasHomepage } from './world-peas-homepage';

// Wait for fonts to load
await document.fonts.ready;

// Helper to wait for all images to load
const waitForImages = async () => {
  const images = document.querySelectorAll('img');
  await Promise.all(
    Array.from(images).map(async (img) => {
      if (img.complete) {
        await img.decode().catch(() => {});
        return;
      }
      return new Promise((resolve) => {
        img.addEventListener('load', async () => {
          await img.decode().catch(() => {});
          resolve(null);
        });
        img.addEventListener('error', resolve);
      });
    }),
  );
};

it('Homepage', async () => {
  render(
    <div data-testid="screenshot-container">
      <WorldPeasHomepage />
    </div>,
  );

  await waitForImages();

  const screenshotTarget = page.getByTestId('screenshot-container');

  // Compare with Figma reference using the custom matcher
  await expect(screenshotTarget).toMatchFigmaSnapshot({
    imageName: 'Homepage.png',
    maxDiffPercentage: 15,
  });
});
