import * as React from 'react';
import { expect, it } from 'vitest';
import { render } from 'vitest-browser-react';

import { WorldPeasHomepage } from './world-peas-homepage';

await document.fonts.ready;

it('Homepage', async () => {
  render(
    <div data-testid="screenshot-container">
      <WorldPeasHomepage />
    </div>,
  );

  // Compare with Figma-exported PNG baseline in __screenshots__
  await expect('[data-testid="screenshot-container"]').toMatchFigmaSnapshot({
    imageName: 'Homepage.png',
    maxDiffPercentage: 15,
  });
});

/**
 * Same React homepage vs a runtime screenshot of the Figma HTML export
 * (homepage slice). The HTML must match this screen — not basket-item.
 */
it('Homepage vs FigmaHtml', async () => {
  render(
    <div data-testid="screenshot-container-figma-html">
      <WorldPeasHomepage />
    </div>,
  );

  await expect('[data-testid="screenshot-container-figma-html"]').toMatchFigmaSnapshot({
    imageName: 'Homepage-figma-html.png',
    htmlReferencePath: '.vitest-attachments/temp/figma-to-html/Figma basics/index.html',
    maxDiffPercentage: 15,
  });
});
