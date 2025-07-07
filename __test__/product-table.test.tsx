import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductTable from '../src/components/product-table';

const mockProducts = [
  {
    id: 1,
    brand: 'Apple',
    category: 'Electronics',
    title: 'iPhone 15',
    price: 999.99,
    availabilityStatus: 'In Stock',
  },
  {
    id: 2,
    brand: 'Nike',
    category: 'Clothing',
    title: 'Air Max',
    price: 199.99,
    availabilityStatus: 'Low Stock',
  },
];

describe('ProductTable', () => {
  it('renders table headings', () => {
    render(<ProductTable products={mockProducts} />);
    expect(screen.getByText('S.No')).toBeInTheDocument();
    expect(screen.getByText('Brand')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Product Name')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Availability')).toBeInTheDocument();
  });

  it('renders product data', () => {
    render(<ProductTable products={mockProducts} />);
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('iPhone 15')).toBeInTheDocument();
    expect(screen.getByText('Nike')).toBeInTheDocument();
    expect(screen.getByText('Air Max')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('Clothing')).toBeInTheDocument();
    expect(screen.getByText('In Stock')).toBeInTheDocument();
    expect(screen.getByText('Low Stock')).toBeInTheDocument();
    expect(
      screen.getByText((content, node) =>
        node?.textContent === '₹1000'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText((content, node) =>
        node?.textContent === '₹200'
      )
    ).toBeInTheDocument();
  });

  it('renders "Low Stock" with red text', () => {
    render(<ProductTable products={mockProducts} />);
    const lowStockCell = screen.getByText('Low Stock');
    expect(lowStockCell).toHaveClass('text-red-500');
  });
});