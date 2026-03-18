import { Meta, StoryObj } from '@storybook/react-vite';
import { HeroGeometric } from './shape-landing-hero';

const meta: Meta<typeof HeroGeometric> = {
  component: HeroGeometric,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof HeroGeometric>;

export const Default: Story = {
  args: {
    badge: 'Design Collective',
    title1: 'Elevate Your Digital Vision',
    title2: 'Crafting Exceptional Websites',
  },
};

export const CustomContent: Story = {
  args: {
    badge: 'Kokonut UI',
    title1: 'Build Better',
    title2: 'Faster Than Ever',
  },
};
