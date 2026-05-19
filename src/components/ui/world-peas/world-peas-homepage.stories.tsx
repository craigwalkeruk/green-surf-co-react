import { Meta, StoryObj } from '@storybook/react-vite';

import { WorldPeasHomepage } from './world-peas-homepage';

const meta: Meta<typeof WorldPeasHomepage> = {
  title: 'Components/WorldPeasHomepage',
  component: WorldPeasHomepage,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof WorldPeasHomepage>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};
