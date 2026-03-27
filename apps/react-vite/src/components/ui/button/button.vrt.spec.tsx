import { expect, it } from 'vitest';
import { render } from 'vitest-browser-react';

import { Button } from './button';

// Wait for fonts to load before running tests
await document.fonts.ready;

// This test uses a screenshot exported from Figma as a golden source of truth
it('Button-default', async () => {
  render(
    <div data-testid="screenshot-container">
      <Button variant="default">Button</Button>
    </div>,
  );

  await expect('[data-testid="screenshot-container"]').toMatchFigmaSnapshot({
    imageName: 'Button-default.png',
  });
});

it.todo('Button-default-sm', async () => {
  render(
    <div data-testid="screenshot-container-sm" style={{ width: '80px' }}>
      <Button variant="default" size="sm">
        Button
      </Button>
    </div>,
  );

  await expect('[data-testid="screenshot-container-sm"]').toMatchFigmaSnapshot({
    imageName: 'Button-default-sm.png',
  });
});

it.todo('Button-default-lg', async () => {
  render(
    <div data-testid="screenshot-container-lg" style={{ width: '106px' }}>
      <Button variant="default" size="lg">
        Button
      </Button>
    </div>,
  );

  await expect('screenshot-container-lg').toMatchFigmaSnapshot({
    imageName: 'Button-default-lg.png',
  });
});

it.todo('Button-destructive', async () => {
  render(
    <div
      data-testid="screenshot-container-destructive"
      style={{ width: '88px' }}
    >
      <Button variant="destructive">Button</Button>
    </div>,
  );

  await expect('screenshot-container-destructive').toMatchFigmaSnapshot({
    imageName: 'Button-destructive.png',
  });
});

it.todo('Button-outline', async () => {
  render(
    <div data-testid="screenshot-container-outline" style={{ width: '88px' }}>
      <Button variant="outline">Button</Button>
    </div>,
  );

  await expect('screenshot-container-outline').toMatchFigmaSnapshot({
    imageName: 'Button-outline.png',
  });
});

it.todo('Button-secondary', async () => {
  render(
    <div data-testid="screenshot-container-secondary" style={{ width: '88px' }}>
      <Button variant="secondary">Button</Button>
    </div>,
  );

  await expect('screenshot-container-secondary').toMatchFigmaSnapshot({
    imageName: 'Button-secondary.png',
  });
});

it.todo('Button-ghost', async () => {
  render(
    <div data-testid="screenshot-container-ghost" style={{ width: '88px' }}>
      <Button variant="ghost">Button</Button>
    </div>,
  );

  await expect('screenshot-container-ghost').toMatchFigmaSnapshot({
    imageName: 'Button-ghost.png',
  });
});

it.todo('Button-link', async () => {
  render(
    <div data-testid="screenshot-container-link" style={{ width: '88px' }}>
      <Button variant="link">Button</Button>
    </div>,
  );

  await expect('screenshot-container-link').toMatchFigmaSnapshot({
    imageName: 'Button-link.png',
  });
});
