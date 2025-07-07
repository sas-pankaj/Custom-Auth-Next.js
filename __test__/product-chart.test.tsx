import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductChart from '../src/components/product-chart';

// Mock react-chartjs-2 Pie component
jest.mock('react-chartjs-2', () => ({
  Pie: ({ data }: any) => (
    <div data-testid="mock-pie">
      {data.labels.map((label: string) => (
        <span key={label}>{label}</span>
      ))}
    </div>
  ),
}));

const mockProducts = [
  { id: 1, name: 'Product A', category: 'Electronics' },
  { id: 2, name: 'Product B', category: 'Clothing' },
  { id: 3, name: 'Product C', category: 'Electronics' },
  { id: 4, name: 'Product D', category: 'Books' },
  { id: 5, name: 'Product E', category: 'Clothing' },
];

describe('ProductChart', () => {
  it('renders a pie chart with correct category labels', () => {
    render(<ProductChart products={mockProducts} />);
    expect(screen.getByTestId('mock-pie')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('Clothing')).toBeInTheDocument();
    expect(screen.getByText('Books')).toBeInTheDocument();
  });
});
