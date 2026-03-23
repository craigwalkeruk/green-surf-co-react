# Vitest Visual Regression Testing Example

This is an example repository forked from [Bulletproof React](https://github.com/alan2207/bulletproof-react) for the purpose of demonstrating a custom **Vitest-based Visual Regression Testing (VRT)** setup.

## Overview

This project showcases a POC visual testing solution built on top of Vitest's browser mode, with Playwright as the test provider. The implementation includes:

- **Custom `compareWithFigma` command** - A server-side Vitest command for pixel-perfect screenshot comparison
- **Automated diff generation** - Visual diffs, actual, and reference images saved to `.vitest-attachments`
- **HTML report generation** - Interactive reports showing test results with image comparisons
- **Configuration** - Support for custom thresholds, size tolerance, and per-test options

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
git clone https://github.com/your-fork/bulletproof-react.git
cd bulletproof-react
cd apps/react-vite
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
