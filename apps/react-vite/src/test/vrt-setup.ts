/**
 * VRT Test Setup
 *
 * This setup file is used specifically for Visual Regression Tests running in browser mode.
 * It imports styles and the Figma snapshot matcher.
 */

// Import global styles for consistent rendering
import '@/index.css';

// Import the Figma snapshot matcher (only in browser mode)
if (typeof (globalThis as { __vitest_browser__?: boolean }).__vitest_browser__ !== 'undefined') {
  import('./figma-snapshot-matcher');
}
