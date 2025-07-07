import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Page, { CustomErrorComponent } from '../src/app/dashboard/page';

jest.mock('../src/components/product-table', () => () => <div data-testid="product-table" />);
jest.mock('../src/components/product-chart', () => () => <div data-testid="product-chart" />);

jest.mock('../src/lib/products', () => ({
  getAllProducts: jest.fn().mockResolvedValue({
    products: [{ id: 1, category: 'Test', brand: 'Brand', title: 'Title', price: 100, availabilityStatus: 'In Stock' }]
  }),
}));

describe('Dashboard Page', () => {
  it('renders ProductTable and ProductChart with products', async () => {
    // Page is an async component, so use await
    render(await Page());
    expect(screen.getByText('Dashboar for Login user only')).toBeInTheDocument();
    expect(screen.getByTestId('product-table')).toBeInTheDocument();
    expect(screen.getByTestId('product-chart')).toBeInTheDocument();
  });

  it('renders CustomErrorComponent on error', () => {
    render(<CustomErrorComponent />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});