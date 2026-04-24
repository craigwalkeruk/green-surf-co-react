import * as React from 'react';
import { expect, it } from 'vitest';
import { render } from 'vitest-browser-react';

import { WorldPeasBasketItem } from './world-peas-basket-item';

await document.fonts.ready;

it('BasketItem', async () => {
  render(
    <div data-testid="screenshot-container" style={{ width: '1010px' }}>
      <WorldPeasBasketItem />
    </div>,
  );

  await expect('[data-testid="screenshot-container"]').toMatchFigmaSnapshot({
    imageName: 'BasketItem.png',
    maxDiffPercentage: 5,
  });
});
