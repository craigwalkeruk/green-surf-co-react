import type { Meta, StoryObj } from '@storybook/react-vite';

import { WorldPeasBasketItem } from './world-peas-basket-item';

const meta: Meta<typeof WorldPeasBasketItem> = {
  title: 'Components/WorldPeasBasketItem',
  component: WorldPeasBasketItem,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-[1010px] max-w-full bg-white p-6">
        <Story />
      </div>
    ),
  ],
  args: {
    itemName: 'Item Name e.g. Apple',
    itemTotal: '$5.99',
    itemValue: 'Item Value e.g. $5.99 / lb',
    quantity: '1 lb',
  },
};

export default meta;

type Story = StoryObj<typeof WorldPeasBasketItem>;

export const Default: Story = {};

export const HeirloomTomatoes: Story = {
  args: {
    itemName: 'Heirloom tomatoes',
    itemTotal: '$8.97',
    itemValue: '$8.97 / 3 lb',
    quantity: '3 lb',
  },
};
