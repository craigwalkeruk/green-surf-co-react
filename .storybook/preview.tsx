import type { Preview } from '@storybook/react-vite';
import React from 'react';
import { BrowserRouter as Router } from 'react-router';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
  },
  decorators: [
    (Story) => (
      <Router>
        <Story />
      </Router>
    ),
  ],
};

export default preview;
