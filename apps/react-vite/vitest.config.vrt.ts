/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import { compareWithFigma } from './src/test/vitest.commands';
import VrtReporter from './src/test/generate-vrt-report';

export default defineConfig({
  plugins: [react(), viteTsconfigPaths()],
  test: {
    update: false,
    globals: true,
    css: true,
    include: ['src/**/*.vrt.spec.{ts,tsx}'],
    setupFiles: ['./src/test/vrt-setup.ts'],
    browser: {
      enabled: true,
      name: 'chromium',
      provider: 'playwright',
      headless: true,
      commands: { compareWithFigma },
      // @ts-expect-error - Custom config option for compareWithFigma command
      compareWithFigmaOptions: {
        maxDiffPercentage: 5.0,
      },
      screenshotFailures: false,
      screenshotDirectory: '.vitest-attachments/temp',
      viewport: { width: 1440, height: 2092 },
    },
    // Use verbose reporter + custom VRT reporter that auto-generates HTML report
    reporters: ['verbose', new VrtReporter()],
  },
});
