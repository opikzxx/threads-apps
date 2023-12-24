/**
 * skenario testing LoginForm
 *    - should handle email typing correctly
 *    - should handle password typing correctly
 *    - should call login function when login button is clicked
 */
import React from 'react';
import {
  describe, it, expect, afterEach, vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import matchers from '@testing-library/jest-dom/matchers';
import userEvent from '@testing-library/user-event';
import LoginInput from './LoginInput';

expect.extend(matchers);

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    // Arrange
    render(<BrowserRouter><LoginInput login={() => {}} /></BrowserRouter>);
    const emailInput = await screen.getByPlaceholderText('email');

    // Action
    await userEvent.type(emailInput, 'test123@gmail.com');
    // Assert
    expect(emailInput).toHaveValue('test123@gmail.com');
  });
  it('should handle password typing correctly', async () => {
    // Arrange
    render(<BrowserRouter><LoginInput login={() => {}} /></BrowserRouter>);
    const passwordInput = await screen.getByPlaceholderText('password');

    // Action
    await userEvent.type(passwordInput, 'test123');
    // Assert
    expect(passwordInput).toHaveValue('test123');
  });
  it('should call login function when login button is clicked', async () => {
    // Arrange
    const mockLogin = vi.fn();
    render(<BrowserRouter><LoginInput login={mockLogin} /></BrowserRouter>);
    const emailInput = await screen.getByPlaceholderText('email');
    await userEvent.type(emailInput, 'test123@gmail.com');
    const passwordInput = await screen.getByPlaceholderText('password');
    await userEvent.type(passwordInput, 'test123');
    const loginButton = await screen.getByRole('button', { name: 'Sign in' });

    // Action
    await userEvent.click(loginButton);

    // Assert
    expect(mockLogin).toBeCalledWith({
      email: 'test123@gmail.com',
      password: 'test123',
    });
  });
});
