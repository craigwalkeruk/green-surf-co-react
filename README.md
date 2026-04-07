# Vitest Visual Regression Testing Example

Originally forked from [Bulletproof React](https://github.com/alan2207/bulletproof-react), this repo is now an experiment sandbox for React workflows: Storybook integration, Figma-driven visual baselines, a custom Vitest VRT stack, and upcoming MUI trials.

## Status & Purpose

- Acts as a sandbox for rapid experiments; not a production app.
- Focus areas: React component workflows, Storybook stories, Figma-driven visual baselines, and future MUI trials.
- History preserved from the original Bulletproof React fork for reference.

## Experiments (ordered by priority)

1. **Visual Regression Testing (VRT) with Vitest + Playwright** — Primary focus. Includes:
   - Custom `compareWithFigma` command for pixel comparisons against Figma exports
   - Automated diffs (actual/reference/diff) saved to `.vitest-attachments`
   - HTML report generation for interactive review
   - Configurable thresholds and size tolerance per test
2. **Storybook workflows** — Story-centric dev loops, verifying stories remain the single source for visual specs.
3. **Figma baseline management** — Keeping exported reference images in sync with component changes.
4. **MUI experiments (upcoming)** — Theming, component overrides, and VRT coverage for MUI-based UI.

## Getting started with VRT

Run visual regression tests:

```bash
yarn test:vrt              # Run VRT tests
yarn test:vrt:report       # Generate and open HTML report
```

The custom VRT implementation is defined in [`src/test/vitest.commands.ts`](src/test/vitest.commands.ts) and provides a `compareWithFigma` command that compares rendered components against reference images.

📖 **[Read the detailed VRT documentation →](src/test/README.md)**

## Get Started in general

Prerequisites:

- Node 20+
- Yarn 1.22+

To set up the app execute the following commands.

```bash
git clone https://github.com/craigwalkeruk/green-surf-co-react.git
cd green-surf-co-react/apps/react-vite
cp .env.example .env
yarn install
```

##### `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

##### `yarn build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

See the section about [deployment](https://vitejs.dev/guide/static-deploy) for more information.
