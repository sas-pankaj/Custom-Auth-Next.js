import React from 'react';
import { render, screen } from '@testing-library/react';
import Page from '../src/app/signUp/page';

jest.mock('../src/app/signUp/page', () => () => <div data-testid="auth-form" />);

describe('Sign up Page', () => {
  it('renders the AuthForm component', () => {
    render(Page());
    expect(screen.getByTestId('auth-form')).toBeInTheDocument();
  });
});