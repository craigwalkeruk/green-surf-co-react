import * as React from 'react';
import { expect, it } from 'vitest';
import { render } from 'vitest-browser-react';

import { WorldPeasHomepage } from './world-peas-homepage';

await document.fonts.ready;

it('Homepage', async () => {
  render(
    <div
      data-testid="screenshot-container"
      style={{ width: '1440px', minWidth: '1440px' }}
    >
      <WorldPeasHomepage />
    </div>,
  );

  // Compare with Figma-exported PNG baseline in __screenshots__
  await expect('[data-testid="screenshot-container"]').toMatchFigmaSnapshot({
    imageName: 'Homepage.png',
    maxDiffPercentage: 5,
    imageNormalization: 'placeholder',
    svgReferencePath:
      'src/components/ui/world-peas/__screenshots__/world-peas-homepage.vrt.spec.tsx/world-peas-homepage.svg',
  });
});


