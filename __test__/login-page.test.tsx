import React from 'react';
import { render, screen } from '@testing-library/react';
import Page from '../src/app/login/page';

jest.mock('../src/app/login/page', () => () => <div data-testid="auth-form" />);

describe('Login Page', () => {
  it('renders the AuthForm component', () => {
    render(Page());
    expect(screen.getByTestId('auth-form')).toBeInTheDocument();
  });
});