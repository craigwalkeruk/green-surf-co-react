import * as React from 'react';
import { expect, it } from 'vitest';
import { render } from 'vitest-browser-react';

import { WorldPeasHomepage } from './world-peas-homepage';

it('Homepage', async () => {
  render(
    <div data-testid="screenshot-container">
      <WorldPeasHomepage />
    </div>,
  );

  // Compare with Figma reference using the custom matcher
  await expect('[data-testid="screenshot-container"]').toMatchFigmaSnapshot({
    imageName: 'Homepage.png',
    maxDiffPercentage: 15,
  });
});
