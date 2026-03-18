/**
 * Visual Regression Test Report Generator
 *
 * Generates an interactive HTML report from comparison images in .vitest-attachments/
 * Can be used as:
 * 1. Vitest reporter (auto-generates after each test run)
 * 2. Standalone script: npx tsx src/test/generate-vrt-report.ts
 *
 * THIS IS 100% vibe coded and not code reviewed, It's kind of a blackbox I don't want to know
 * what is happening under the hood it works for my local testing
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { Reporter } from 'vitest/reporters';

const ATTACHMENTS_DIR = '.vitest-attachments';
const REPORT_FILE = '.vitest-attachments/vrt-report.html';

interface ComparisonResult {
  testName: string;
  specFile: string;
  referenceImage: string | null;
  actualImage: string | null;
  diffImage: string | null;
  passed: boolean;
  errorMessage: string | null;
  diffPercentage: number | null;
  maxDiffPercentage: number | null;
  imageWidth: number | null;
  imageHeight: number | null;
}

async function findComparisonImages(): Promise<ComparisonResult[]> {
  const results: ComparisonResult[] = [];
  const attachmentsPath = path.join(process.cwd(), ATTACHMENTS_DIR);

  try {
    const entries = await fs.readdir(attachmentsPath, { withFileTypes: true });

    for (const entry of entries) {
      // Skip __vis__ directory and non-directories
      if (!entry.isDirectory() || entry.name === '__vis__') continue;

      const specDir = path.join(attachmentsPath, entry.name);
      const files = await fs.readdir(specDir);

      // Group files by test name (remove suffix like -diff, -actual, -reference)
      const testNames = new Set<string>();
      for (const file of files) {
        if (!file.endsWith('.png')) continue;
        const baseName = file
          .replace(/-diff\.png$/, '')
          .replace(/-actual\.png$/, '')
          .replace(/-reference\.png$/, '');
        testNames.add(baseName);
      }

      for (const testName of testNames) {
        const referenceFile = `${testName}-reference.png`;
        const actualFile = `${testName}-actual.png`;
        const diffFile = `${testName}-diff.png`;
        const metadataFile = `${testName}-metadata.json`;

        const hasReference = files.includes(referenceFile);
        const hasActual = files.includes(actualFile);
        const hasDiff = files.includes(diffFile);
        const hasMetadata = files.includes(metadataFile);

        // Read metadata if available
        let errorMessage: string | null = null;
        let diffPercentage: number | null = null;
        let maxDiffPercentage: number | null = null;
        let imageWidth: number | null = null;
        let imageHeight: number | null = null;
        let passed: boolean | null = null;

        if (hasMetadata) {
          try {
            const metadataPath = path.join(specDir, metadataFile);
            const metadataContent = await fs.readFile(metadataPath, 'utf-8');
            const metadata = JSON.parse(metadataContent);
            errorMessage = metadata.errorMessage || null;
            diffPercentage = metadata.diffPercentage ?? null;
            maxDiffPercentage = metadata.maxDiffPercentage ?? null;
            passed = metadata.matches ?? null;
            // Use the larger dimension from baseline or screenshot
            const baselineW = metadata.baselineSize?.width ?? 0;
            const baselineH = metadata.baselineSize?.height ?? 0;
            const screenshotW = metadata.screenshotSize?.width ?? 0;
            const screenshotH = metadata.screenshotSize?.height ?? 0;
            imageWidth = Math.max(baselineW, screenshotW);
            imageHeight = Math.max(baselineH, screenshotH);
          } catch {
            // Ignore metadata read errors
          }
        }

        if (hasActual || hasDiff) {
          results.push({
            testName,
            specFile: entry.name,
            referenceImage: hasReference ? path.join(entry.name, referenceFile) : null,
            actualImage: hasActual ? path.join(entry.name, actualFile) : null,
            diffImage: hasDiff ? path.join(entry.name, diffFile) : null,
            // Use metadata.matches if available, otherwise fall back to !hasDiff
            passed: passed !== null ? passed : !hasDiff,
            errorMessage,
            diffPercentage,
            maxDiffPercentage,
            imageWidth,
            imageHeight,
          });
        }
      }
    }
  } catch (error) {
    console.error('Error reading attachments directory:', error);
  }

  return results;
}

async function imageToBase64(imagePath: string): Promise<string | null> {
  try {
    const fullPath = path.join(process.cwd(), ATTACHMENTS_DIR, imagePath);
    const buffer = await fs.readFile(fullPath);
    return `data:image/png;base64,${buffer.toString('base64')}`;
  } catch {
    return null;
  }
}

async function generateHtml(results: ComparisonResult[]): Promise<string> {
  // Convert all images to base64 for embedding
  const comparisons = await Promise.all(
    results.map(async (result) => ({
      ...result,
      referenceBase64: result.referenceImage ? await imageToBase64(result.referenceImage) : null,
      actualBase64: result.actualImage ? await imageToBase64(result.actualImage) : null,
      diffBase64: result.diffImage ? await imageToBase64(result.diffImage) : null,
    }))
  );

  const comparisonsJson = JSON.stringify(comparisons);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Visual Regression Test Report</title>
  <style>
    :root {
      --bg-primary: #1a1a2e;
      --bg-secondary: #16213e;
      --bg-card: #0f3460;
      --text-primary: #eaeaea;
      --text-secondary: #a0a0a0;
      --accent: #e94560;
      --success: #4ade80;
      --border: #334155;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: var(--bg-primary);
      color: var(--text-primary);
      line-height: 1.6;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
    }

    header {
      margin-bottom: 1rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid var(--border);
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.5rem 1.5rem;
    }

    h1 {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0;
    }

    .summary {
      color: var(--text-secondary);
      font-size: 0.85rem;
      display: flex;
      gap: 1rem;
    }

    .timestamp {
      color: var(--text-secondary);
      font-size: 0.8rem;
      margin-left: auto;
    }

    .controls {
      display: flex;
      gap: 0.5rem;
    }

    .summary .fail {
      color: var(--accent);
    }

    .summary .pass {
      color: var(--success);
    }

    .test-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .test-card {
      background: var(--bg-secondary);
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid var(--border);
    }

    .test-card.hidden {
      display: none;
    }

    .test-header {
      padding: 0.5rem 1rem;
      background: var(--bg-card);
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
    }

    .test-header:hover {
      background: #1a4a7a;
    }

    .test-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .test-name {
      font-weight: 500;
      font-size: 0.95rem;
    }

    .spec-file {
      color: var(--text-secondary);
      font-size: 0.8rem;
    }

    .diff-stats {
      color: var(--text-secondary);
      font-size: 0.8rem;
      font-family: monospace;
    }

    .diff-stats .actual {
      color: var(--text-primary);
    }

    .diff-stats .threshold {
      color: var(--text-secondary);
    }

    .test-status {
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: 500;
    }

    .test-status.diff {
      background: rgba(233, 69, 96, 0.2);
      color: var(--accent);
    }

    .test-status.match {
      background: rgba(74, 222, 128, 0.2);
      color: var(--success);
    }

    .test-content {
      padding: 0.75rem 1rem;
      display: block;
    }

    .test-card.collapsed .test-content {
      display: none;
    }

    .view-tabs {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }

    .view-tab {
      padding: 0.35rem 0.75rem;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 4px;
      color: var(--text-secondary);
      cursor: pointer;
      font-size: 0.85rem;
    }

    .view-tab:hover {
      background: #1a4a7a;
    }

    .view-tab.active {
      background: var(--accent);
      color: white;
      border-color: var(--accent);
    }

    .comparison-view {
      display: none;
    }

    .comparison-view.active {
      display: block;
    }

    /* Side by side view */
    .side-by-side {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }

    .image-panel {
      background: var(--bg-card);
      border-radius: 6px;
      padding: 1rem;
    }

    .image-panel h4 {
      font-size: 0.85rem;
      color: var(--text-secondary);
      margin-bottom: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .image-panel img {
      max-width: 100%;
      height: auto;
      border-radius: 4px;
      background: repeating-conic-gradient(#808080 0% 25%, transparent 0% 50%) 50% / 20px 20px;
    }

    .no-image {
      color: var(--text-secondary);
      font-style: italic;
      padding: 2rem;
      text-align: center;
      background: rgba(0,0,0,0.2);
      border-radius: 4px;
    }

    /* Slider view */
    .slider-container {
      position: relative;
      display: inline-block;
    }

    .slider-wrapper {
      text-align: center;
    }

    .slider-images-wrapper {
      position: relative;
      padding: 0 20px;
    }

    .slider-images {
      position: relative;
      background: repeating-conic-gradient(#808080 0% 25%, transparent 0% 50%) 50% / 20px 20px;
      border-radius: 6px;
      overflow: hidden;
    }

    .slider-images img {
      display: block;
      width: 100%;
      height: auto;
    }

    .slider-images .overlay {
      position: absolute;
      top: 0;
      left: -20px;
      height: 100%;
      overflow: hidden;
      padding-left: 20px;
    }

    .slider-images .overlay::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 2px;
      height: 100%;
      background: var(--accent);
      pointer-events: none;
    }

    .slider-images .overlay.hide-bar::after {
      display: none;
    }

    .slider-images .overlay img {
      max-width: none;
    }

    .slider-control {
      width: calc(100% + 40px);
      margin: 0.75rem -40px 0;
    }

    .slider-labels {
      display: flex;
      justify-content: space-between;
      font-size: 0.8rem;
      color: var(--text-secondary);
      margin: 0 -20px;
    }

    .slider-labels span:first-child {
      text-align: left;
    }

    .slider-labels span:last-child {
      text-align: right;

    }

    .zoom-controls {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
    }

    .zoom-btn {
      padding: 0.25rem 0.5rem;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 4px;
      color: var(--text-primary);
      cursor: pointer;
      font-size: 0.9rem;
      line-height: 1;
    }

    .zoom-btn:hover {
      background: #1a4a7a;
    }

    .zoom-level {
      font-size: 0.8rem;
      color: var(--text-secondary);
      min-width: 3rem;
      text-align: center;
    }


    .expand-icon {
      transition: transform 0.2s;
      transform: rotate(180deg);
    }

    .test-card.collapsed .expand-icon {
      transform: rotate(0deg);
    }

    .error-message {
      background: rgba(233, 69, 96, 0.15);
      border: 1px solid rgba(233, 69, 96, 0.4);
      border-radius: 6px;
      padding: 0.75rem 1rem;
      margin-bottom: 1rem;
      color: var(--accent);
      font-family: monospace;
      font-size: 0.9rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>Visual Regression Test Report</h1>
      <div class="summary" id="summary"></div>
      <div class="controls">
        <button onclick="expandAll()" class="view-tab">Expand All</button>
        <button onclick="collapseAll()" class="view-tab">Collapse All</button>
        <button id="filterAll" onclick="setFilter('all')" class="view-tab active">All</button>
        <button id="filterPass" onclick="setFilter('pass')" class="view-tab">Passing</button>
        <button id="filterFail" onclick="setFilter('fail')" class="view-tab">Failing</button>
      </div>
      <div class="timestamp">${new Date().toLocaleString()}</div>
    </header>
    <div class="test-list" id="testList"></div>
  </div>

  <script>
    const comparisons = ${comparisonsJson};

    function renderSummary() {
      const total = comparisons.length;
      const passed = comparisons.filter(c => c.passed).length;
      const failed = total - passed;
      document.getElementById('summary').innerHTML = \`
        <span>Total: <strong>\${total}</strong></span>
        <span class="pass">Passed: <strong>\${passed}</strong></span>
        <span class="fail">Failed: <strong>\${failed}</strong></span>
      \`;
    }

    function createTestCard(comparison, index) {
      const card = document.createElement('div');
      card.className = 'test-card';
      card.dataset.status = comparison.passed ? 'pass' : 'fail';
      const diffStatsHtml = comparison.diffPercentage !== null
        ? \`<span class="diff-stats"><span class="actual">\${comparison.diffPercentage.toFixed(2)}%</span> / <span class="threshold">\${comparison.maxDiffPercentage !== null ? comparison.maxDiffPercentage.toFixed(2) : '?'}%</span></span>\`
        : '';

      card.innerHTML = \`
        <div class="test-header" onclick="toggleCard(\${index})">
          <span class="test-status \${comparison.passed ? 'match' : 'diff'}">
            \${comparison.passed ? 'PASS' : 'FAIL'}
          </span>
          <div class="test-info">
            <div class="test-name">\${comparison.testName}</div>
            <div class="spec-file">\${comparison.specFile}</div>
            \${diffStatsHtml}
          </div>
          <div style="display: flex; align-items: center; gap: 1rem; margin-left: auto;">
            <svg class="expand-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
        <div class="test-content">
          \${comparison.errorMessage ? \`<div class="error-message">\${comparison.errorMessage}</div>\` : ''}
          <div class="view-tabs">
            <button class="view-tab active" onclick="setView(\${index}, 'sideBySide')">Side by Side</button>
            <button class="view-tab" onclick="setView(\${index}, 'slider')">Slider</button>
          </div>

          <div class="comparison-view active" data-view="sideBySide">
            <div class="side-by-side">
              <div class="image-panel">
                <h4>Reference (Figma)</h4>
                \${comparison.referenceBase64
                  ? \`<img src="\${comparison.referenceBase64}" alt="Reference">\`
                  : '<div class="no-image">No reference image</div>'}
              </div>
              <div class="image-panel">
                <h4>Actual (Screenshot)</h4>
                \${comparison.actualBase64
                  ? \`<img src="\${comparison.actualBase64}" alt="Actual">\`
                  : '<div class="no-image">No actual image</div>'}
              </div>
              <div class="image-panel">
                <h4>Diff</h4>
                \${comparison.diffBase64
                  ? \`<img src="\${comparison.diffBase64}" alt="Diff">\`
                  : '<div class="no-image">No diff image</div>'}
              </div>
            </div>
          </div>

          <div class="comparison-view" data-view="slider">
            \${comparison.referenceBase64 && comparison.actualBase64 ? \`
              <div class="slider-wrapper">
                <div class="zoom-controls">
                  <button class="zoom-btn" onclick="zoomSlider(\${index}, -10)">−</button>
                  <span class="zoom-level" id="zoom-level-\${index}">100%</span>
                  <button class="zoom-btn" onclick="zoomSlider(\${index}, 10)">+</button>
                  <button class="zoom-btn" onclick="zoomSlider(\${index}, 0)" style="margin-left: 0.5rem;">Reset</button>
                </div>
                <div class="slider-container" id="slider-container-\${index}" \${comparison.imageWidth ? \`style="width: \${comparison.imageWidth + 40}px; max-width: 100%;" data-base-width="\${comparison.imageWidth + 40}"\` : ''}>
                  <div class="slider-images-wrapper">
                    <div class="slider-images" id="slider-\${index}">
                      <img src="\${comparison.actualBase64}" alt="Actual" class="base-image">
                      <div class="overlay" style="width: calc(50% + 20px);">
                        <img src="\${comparison.referenceBase64}" alt="Reference" style="width: \${comparison.imageWidth || 'auto'}px;">
                      </div>
                    </div>
                  </div>
                  <input type="range" class="slider-control" min="0" max="100" value="50"
                    oninput="updateSlider(\${index}, this.value)">
                  <div class="slider-labels">
                    <span>Reference (Figma)</span>
                    <span>Actual (Screenshot)</span>
                  </div>
                </div>
              </div>
            \` : '<div class="no-image">Both reference and actual images required for slider view</div>'}
          </div>
        </div>
      \`;
      return card;
    }

    function toggleCard(index) {
      const cards = document.querySelectorAll('.test-card');
      cards[index].classList.toggle('collapsed');
    }

    function expandAll() {
      const cards = document.querySelectorAll('.test-card');
      cards.forEach(card => card.classList.remove('collapsed'));
    }

    function collapseAll() {
      const cards = document.querySelectorAll('.test-card');
      cards.forEach(card => card.classList.add('collapsed'));
    }

    function setFilter(filter) {
      const cards = document.querySelectorAll('.test-card');
      const filterButtons = document.querySelectorAll('#filterAll, #filterPass, #filterFail');

      filterButtons.forEach(btn => btn.classList.remove('active'));
      document.getElementById('filter' + filter.charAt(0).toUpperCase() + filter.slice(1)).classList.add('active');

      cards.forEach(card => {
        const status = card.dataset.status;
        if (filter === 'all') {
          card.classList.remove('hidden');
        } else if (filter === 'pass') {
          card.classList.toggle('hidden', status !== 'pass');
        } else if (filter === 'fail') {
          card.classList.toggle('hidden', status !== 'fail');
        }
      });
    }

    function setView(index, viewName) {
      const card = document.querySelectorAll('.test-card')[index];
      const tabs = card.querySelectorAll('.view-tab');
      const views = card.querySelectorAll('.comparison-view');

      tabs.forEach((tab, i) => {
        tab.classList.toggle('active', ['sideBySide', 'slider'][i] === viewName);
      });

      views.forEach(view => {
        view.classList.toggle('active', view.dataset.view === viewName);
      });
    }

    function updateSlider(index, value) {
      const slider = document.getElementById(\`slider-\${index}\`);
      if (slider) {
        const overlay = slider.querySelector('.overlay');
        // Map 0-100 to include the 20px padding on each side
        // At 0%: overlay width = 0 (fully hidden, showing actual)
        // At 100%: overlay width = 100% + 40px (fully showing reference)
        const percentage = value / 100;
        overlay.style.width = \`calc(\${value}% + \${40 * percentage}px)\`;

        // Hide the red bar when slider is in the overrun areas (< 5% or > 95%)
        if (value < 5 || value > 95) {
          overlay.classList.add('hide-bar');
        } else {
          overlay.classList.remove('hide-bar');
        }
      }
    }

    const zoomLevels = {};

    function zoomSlider(index, delta) {
      if (delta === 0) {
        zoomLevels[index] = 100;
      } else {
        zoomLevels[index] = Math.max(25, (zoomLevels[index] || 100) + delta);
      }
      const zoom = zoomLevels[index];
      const container = document.getElementById(\`slider-container-\${index}\`);
      const zoomLabel = document.getElementById(\`zoom-level-\${index}\`);
      const sliderImages = document.getElementById(\`slider-\${index}\`);

      if (container && zoomLabel && sliderImages) {
        const baseWidth = parseInt(container.dataset.baseWidth) || container.offsetWidth;
        const baseImage = sliderImages.querySelector('.base-image');

        if (baseImage) {
          const scaledWidth = baseImage.naturalWidth * zoom / 100;
          const scaledHeight = baseImage.naturalHeight * zoom / 100;

          // Update container width (image width + 40px padding)
          container.style.width = \`\${scaledWidth + 40}px\`;
          container.style.maxWidth = '100%';

          // Update slider-images dimensions
          sliderImages.style.width = \`\${scaledWidth}px\`;
          sliderImages.style.height = \`\${scaledHeight}px\`;

          // Scale all images
          const images = sliderImages.querySelectorAll('img');
          images.forEach(img => {
            img.style.width = \`\${scaledWidth}px\`;
            img.style.height = \`\${scaledHeight}px\`;
          });

          // Update overlay image width to match
          const overlayImg = sliderImages.querySelector('.overlay img');
          if (overlayImg) {
            overlayImg.style.width = \`\${scaledWidth}px\`;
            overlayImg.style.height = \`\${scaledHeight}px\`;
          }
        }

        zoomLabel.textContent = \`\${zoom}%\`;
      }
    }

    function init() {
      renderSummary();
      const testList = document.getElementById('testList');
      comparisons.forEach((comparison, index) => {
        testList.appendChild(createTestCard(comparison, index));
      });

      // All cards start expanded by default (no collapsed class)
    }

    init();
  </script>
</body>
</html>`;
}

/**
 * Generate the VRT report - can be called programmatically or as standalone
 */
export async function generateReport(silent = false): Promise<string | null> {
  const results = await findComparisonImages();

  if (results.length === 0) {
    if (!silent) {
      console.log('No comparison images found in .vitest-attachments/');
    }
    return null;
  }

  if (!silent) {
    console.log(`\nGenerating VRT report for ${results.length} comparison(s)...`);
  }

  const html = await generateHtml(results);
  const reportPath = path.join(process.cwd(), REPORT_FILE);
  await fs.writeFile(reportPath, html);

  if (!silent) {
    const passed = results.filter(r => !r.hasDiff).length;
    const failed = results.filter(r => r.hasDiff).length;
    console.log(`VRT Report: ${passed} passed, ${failed} failed`);
    console.log(`Report: file://${reportPath}\n`);
  }

  return reportPath;
}

/**
 * Vitest Reporter that auto-generates the VRT HTML report after each test run.
 * Works with both single runs and watch mode.
 */
export default class VrtReporter implements Reporter {
  async onFinished(): Promise<void> {
    // Generate report after all tests complete
    await generateReport(false);
  }
}

