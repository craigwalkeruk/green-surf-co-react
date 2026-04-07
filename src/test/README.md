# Visual Regression Testing (VRT) Documentation

This directory contains the custom Vitest-based visual regression testing implementation for this project.

## Overview

The VRT system compares rendered components against reference images (baselines) and generates visual diffs to detect UI changes. It's built on top of **Vitest's browser mode** with **Playwright** as the test provider.

## Architecture

### Core Components

1. **`vitest.commands.ts`** - Custom `compareWithFigma` command for screenshot comparison
2. **`generate-vrt-report.ts`** - HTML report generator (runs automatically after tests)
3. **`vitest.config.vrt.ts`** - Vitest configuration for VRT tests

## Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Test Execution (*.vrt.spec.ts)                           │
│    • Vitest browser mode launches Chromium (Playwright)     │
│    • Test renders component in iframe                       │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. compareWithFigma Command (Server-side)                   │
│    • Takes CSS selector or base64 screenshot                │
│    • Creates new browser context (deviceScaleFactor: 1)     │
│    • Captures clean screenshot at 1:1 scale                 │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. Image Comparison (pixelmatch)                            │
│    • Loads reference from __screenshots__/{spec}/{name}.png │
│    • Compares pixel-by-pixel with threshold                 │
│    • Handles size mismatches with padding                   │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. Artifacts Generation (.vitest-attachments/)              │
│    • {test}-reference.png - Baseline image                  │
│    • {test}-actual.png - Current screenshot                 │
│    • {test}-diff.png - Visual diff (pink highlights)        │
│    • {test}-metadata.json - Test results & stats            │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. VrtReporter (onTestRunEnd)                               │
│    • Scans .vitest-attachments/ for artifacts               │
│    • Embeds images as base64 in HTML                        │
│    • Generates interactive report                           │
│    • Saves to .vitest-attachments/vrt-report.html           │
└─────────────────────────────────────────────────────────────┘
```

## Key Features

### 1. Server-Side Screenshot Capture

The `compareWithFigma` command runs **server-side** (not in the browser test context) to bypass Vitest's iframe scaling issues on retina displays.

**Two modes:**
- **Selector-based** (recommended): Pass a CSS selector, command creates clean context
- **Legacy base64**: Pass base64 PNG data directly

### 2. Scale-Accurate Screenshots ⚠️

**Problem:** Vitest browser mode **always** renders tests in an iframe (regardless of UI/headless/Docker settings). On retina displays, Vitest applies CSS transforms to this iframe, causing screenshots to be captured at 2x scale (device pixels instead of CSS pixels). This means a 100px wide button gets captured as 200px, breaking comparisons with design tool exports.

**Workaround:** The `compareWithFigma` command bypasses this scaling issue:
1. Reads DOM dimensions from the original Vitest iframe (unscaled CSS pixels)
2. Extracts element HTML and all stylesheets
3. Creates a **new browser context** with `deviceScaleFactor: 1` (forces 1:1 scale)
4. Renders element in a clean page outside Vitest's iframe
5. Captures screenshot at true 1:1 CSS pixel scale

This workaround is necessary in **all modes** (UI, headless, Docker) because the iframe exists universally in Vitest browser mode.

### 3. Intelligent Size Handling

- **Size tolerance**: Allows ±2px differences (configurable via `sizeTolerance`)
- **Padding**: If sizes differ beyond tolerance, pads smaller image with white background
- **Always generates diffs**: Even with size mismatches, diff images are created for inspection

### 4. Configuration

Global config in `vitest.config.vrt.ts`:
```typescript
browser: {
  compareWithFigmaOptions: {
    threshold: 0.1,           // Pixelmatch sensitivity (0-1)
    maxDiffPercentage: 5.0,   // Max % of different pixels
    sizeTolerance: 2,         // Allow ±2px size differences
  }
}
```

Per-test override:
```typescript
await browser.compareWithFigma('.my-component', {
  maxDiffPercentage: 1.0,
  imageName: 'custom-name.png'
});
```

### 5. Interactive HTML Report

Generated automatically after each test run:

**Features:**
- **Side-by-side view**: Reference, Actual, Diff images
- **Slider view**: Interactive overlay to compare images
- **Zoom controls**: Pixel-level inspection
- **Filtering**: Show all/passing/failing tests
- **Expand/collapse**: Manage large test suites
- **Embedded images**: Self-contained HTML file

## Usage

### Running Tests

```bash
# Run VRT tests
yarn test:vrt

# Generate report (if not auto-generated)
npx tsx src/test/generate-vrt-report.ts

# Open report
open .vitest-attachments/vrt-report.html
```

### Writing VRT Tests

```typescript
import { test, expect } from 'vitest';

test('Button renders correctly', async ({ browser }) => {
  await browser.visit('/');

  const result = await browser.compareWithFigma('.my-button', {
    maxDiffPercentage: 1.0
  });

  expect(result.matches).toBe(true);
});
```

### Creating Baselines

Reference images must be created manually and placed in:
```
__screenshots__/{spec-file-name}/{test-name}.png
```

**Note:** The command **never creates baselines automatically** - it fails if reference is missing.

## Known Issues

### 1. Retina Display Scaling (Primary Design Challenge)
**Issue:** Vitest's browser mode renders all tests in an iframe (across UI, headless, and Docker modes). On retina/HiDPI displays, Vitest applies CSS transforms to this iframe, causing screenshots to capture at device pixel ratio (2x on retina) instead of CSS pixels. A 100px button becomes 200px, making Figma/design tool comparisons impossible.

**Root Cause:** Vitest's iframe is scaled for UI presentation, but this scaling persists in the rendering context even in headless mode.

**Workaround:** The `compareWithFigma` command extracts the element from Vitest's iframe and re-renders it in a fresh browser context with `deviceScaleFactor: 1`. This guarantees 1:1 CSS pixel screenshots regardless of the host machine's display DPI.

**Why selector-based mode?** Taking screenshots directly via Vitest's built-in APIs would inherit the iframe's scaling. By using Playwright's native screenshot API in a new context, we bypass this entirely.

**Reference:** https://github.com/vitest-dev/vitest/issues/9363

### 2. Cross-Origin Stylesheets
**Issue:** Cannot read CSS rules from cross-origin stylesheets when extracting styles.

**Workaround:** Try/catch blocks skip inaccessible stylesheets. Use same-origin styles or inline critical CSS.

### 3. Font Loading Timing
**Issue:** Custom fonts may not load before screenshot, causing false diffs.

**Workaround:** Command waits for `document.fonts.ready`, but some fonts may still load late. Consider using `font-display: block` or preloading fonts.

### 4. Report Generation (Self-Acknowledged)
From the code comments:
> "THIS IS 100% vibe coded and not code reviewed, It's kind of a blackbox I don't want to know what is happening under the hood it works for my local testing"

The report generator works but hasn't been thoroughly reviewed. Use with awareness that edge cases may exist.

## File Locations

```
src/test/
├── vitest.commands.ts         # compareWithFigma implementation
├── generate-vrt-report.ts     # HTML report generator
└── vrt-setup.ts              # Test setup file

vitest.config.vrt.ts          # VRT-specific Vitest config

__screenshots__/              # Reference images (baselines)
└── {spec-name}/
    └── {test-name}.png

.vitest-attachments/          # Test artifacts & report
├── {spec-name}/
│   ├── {test}-reference.png
│   ├── {test}-actual.png
│   ├── {test}-diff.png
│   └── {test}-metadata.json
└── vrt-report.html
```

## Configuration Options

### `compareWithFigma(selector, options?)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `threshold` | number | 0.1 | Pixelmatch sensitivity (0=strict, 1=loose) |
| `maxDiffPercentage` | number | 1.0 | Max % of different pixels to pass |
| `sizeTolerance` | number | 2 | Allow ±Npx size differences |
| `imageName` | string | `{testName}.png` | Override default image name |

## Return Value

```typescript
interface CompareWithFigmaResult {
  matches: boolean;           // Did the comparison pass?
  diffPercentage: number;     // % of pixels that differ
  sizeMismatch: boolean;      // Size difference beyond tolerance?
  message: string;            // Human-readable result
}
```

## Tips

1. **Use selector-based mode** for most reliable screenshots
2. **Set appropriate thresholds** - UI changes like anti-aliasing can cause small diffs
3. **Review diffs in report** - Don't just check pass/fail, inspect visual changes
4. **Keep baselines in git** - Track reference images alongside code
5. **Use size tolerance** - Small rendering differences across environments are normal
