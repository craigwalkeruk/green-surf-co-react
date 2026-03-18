import { expect, it } from 'vitest';
import { page } from '@vitest/browser/context';
import * as React from 'react';
import { render } from 'vitest-browser-react';
import { Button } from './button';

// Wait for fonts to load
await document.fonts.ready;




// This test uses a screenshot exported from Figma as a golden source of truth
it('Button-default', async () => {
  render(
    <div data-testid="screenshot-container" style={{ width: '126px' }}>
      <Button variant="default">Button</Button>
    </div>
  );

  const screenshotTarget = page.getByTestId('screenshot-container');

  // Compare with Figma reference using the custom matcher
  await expect(screenshotTarget).toMatchFigmaSnapshot({
    imageName: 'Button-default.png',
  });
});

it.skip('Button-default-sm', async () => {
  render(
    <div data-testid="screenshot-container-sm" style={{ width: '80px' }}>
      <Button variant="default" size="sm">Button</Button>
    </div>
  );

  const screenshotTarget = page.getByTestId('screenshot-container-sm');

  await expect(screenshotTarget).toMatchFigmaSnapshot({
    imageName: 'Button-default-sm.png',
  });
});

it.skip('Button-default-lg', async () => {
  render(
    <div data-testid="screenshot-container-lg" style={{ width: '106px' }}>
      <Button variant="default" size="lg">Button</Button>
    </div>
  );

  const screenshotTarget = page.getByTestId('screenshot-container-lg');

  await expect(screenshotTarget).toMatchFigmaSnapshot({
    imageName: 'Button-default-lg.png',
  });
});

it.skip('Button-destructive', async () => {
  render(
    <div data-testid="screenshot-container-destructive" style={{ width: '88px' }}>
      <Button variant="destructive">Button</Button>
    </div>
  );

  const screenshotTarget = page.getByTestId('screenshot-container-destructive');

  await expect(screenshotTarget).toMatchFigmaSnapshot({
    imageName: 'Button-destructive.png',
  });
});

it.skip('Button-outline', async () => {
  render(
    <div data-testid="screenshot-container-outline" style={{ width: '88px' }}>
      <Button variant="outline">Button</Button>
    </div>
  );

  const screenshotTarget = page.getByTestId('screenshot-container-outline');

  await expect(screenshotTarget).toMatchFigmaSnapshot({
    imageName: 'Button-outline.png',
  });
});

it.skip('Button-secondary', async () => {
  render(
    <div data-testid="screenshot-container-secondary" style={{ width: '88px' }}>
      <Button variant="secondary">Button</Button>
    </div>
  );

  const screenshotTarget = page.getByTestId('screenshot-container-secondary');

  await expect(screenshotTarget).toMatchFigmaSnapshot({
    imageName: 'Button-secondary.png',
  });
});

it.skip('Button-ghost', async () => {
  render(
    <div data-testid="screenshot-container-ghost" style={{ width: '88px' }}>
      <Button variant="ghost">Button</Button>
    </div>
  );

  const screenshotTarget = page.getByTestId('screenshot-container-ghost');

  await expect(screenshotTarget).toMatchFigmaSnapshot({
    imageName: 'Button-ghost.png',
  });
});

it.skip('Button-link', async () => {
  render(
    <div data-testid="screenshot-container-link" style={{ width: '88px' }}>
      <Button variant="link">Button</Button>
    </div>
  );

  const screenshotTarget = page.getByTestId('screenshot-container-link');

  await expect(screenshotTarget).toMatchFigmaSnapshot({
    imageName: 'Button-link.png',
  });
});
