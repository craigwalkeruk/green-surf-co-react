import * as React from 'react';

import { rtlRender, screen } from '@/testing/test-utils';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../card';

test('should render card with all sub-components', () => {
  const titleText = 'Card Title';
  const descriptionText = 'Card description text';
  const contentText = 'Card content goes here';
  const footerText = 'Card footer';

  rtlRender(
    <Card>
      <CardHeader>
        <CardTitle>{titleText}</CardTitle>
        <CardDescription>{descriptionText}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{contentText}</p>
      </CardContent>
      <CardFooter>
        <p>{footerText}</p>
      </CardFooter>
    </Card>,
  );

  expect(screen.getByText(titleText)).toBeInTheDocument();
  expect(screen.getByText(descriptionText)).toBeInTheDocument();
  expect(screen.getByText(contentText)).toBeInTheDocument();
  expect(screen.getByText(footerText)).toBeInTheDocument();
});

test('should render card title as h3 element', () => {
  rtlRender(
    <Card>
      <CardHeader>
        <CardTitle>Test Title</CardTitle>
      </CardHeader>
    </Card>,
  );

  expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
    'Test Title',
  );
});

test('should apply custom className to card', () => {
  rtlRender(<Card className="custom-class" data-testid="card" />);

  expect(screen.getByTestId('card')).toHaveClass('custom-class');
});

test('should apply variant classes', () => {
  rtlRender(
    <Card variant="outline" data-testid="card">
      <CardContent>Content</CardContent>
    </Card>,
  );

  expect(screen.getByTestId('card')).toHaveClass('border-2');
});

test('should forward ref to card element', () => {
  const ref = React.createRef<HTMLDivElement>();

  rtlRender(<Card ref={ref} />);

  expect(ref.current).toBeInstanceOf(HTMLDivElement);
});
