import { expect, it } from 'vitest';
import { page } from 'vitest/browser';
import * as React from 'react';
import { render } from 'vitest-browser-react';
import { WorldPeasHomepage } from './world-peas-homepage';

it('Homepage', async () => {
  render(
    <div data-testid="screenshot-container">
      <WorldPeasHomepage />
    </div>,
  );

  const screenshotTarget = page.getByTestId('screenshot-container');

  // Compare with Figma reference using the custom matcher
  await expect(screenshotTarget).toMatchFigmaSnapshot({
    imageName: 'Homepage.png',
    maxDiffPercentage: 15,
  });
});
