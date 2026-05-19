import { render, screen } from '@/testing/test-utils';

import { WorldPeasBasketItem } from './world-peas-basket-item';

describe('WorldPeasBasketItem', () => {
  test('renders the basket item content', () => {
    render(
      <WorldPeasBasketItem
        itemName="Heirloom tomatoes"
        itemValue="$8.97 / 3 lb"
        itemTotal="$8.97"
        quantity="3 lb"
      />,
    );

    expect(
      screen.getByRole('heading', { name: 'Heirloom tomatoes' }),
    ).toBeInTheDocument();
    expect(screen.getByText('$8.97 / 3 lb')).toBeInTheDocument();
    expect(screen.getByText('$8.97')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Edit quantity' }),
    ).toHaveTextContent('3 lb');
  });

  test('calls the edit handler when the quantity control is pressed', async () => {
    const onEditQuantity = vi.fn();

    render(<WorldPeasBasketItem onEditQuantity={onEditQuantity} />);

    await screen.getByRole('button', { name: 'Edit quantity' }).click();

    expect(onEditQuantity).toHaveBeenCalledTimes(1);
  });
});
