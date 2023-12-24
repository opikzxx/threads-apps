/**
 * skenario testing LoginForm
 *    - should handle email typing correctly
 *    - should handle name typing correctly
 *    - should handle password typing correctly
 *    - should call register function when register button is clicked
 */
import React from 'react';
import {
  describe, it, expect, afterEach, vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import matchers from '@testing-library/jest-dom/matchers';
import userEvent from '@testing-library/user-event';
import RegisterInput from './RegisterInput';

expect.extend(matchers);

describe('RegisterInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    // Arrange
    render(<BrowserRouter><RegisterInput register={() => {}} /></BrowserRouter>);
    const nameInput = await screen.getByPlaceholderText('name');

    // Action
    await userEvent.type(nameInput, 'test123@gmail.com');
    // Assert
    expect(nameInput).toHaveValue('test123@gmail.com');
  });

  it('should handle email typing correctly', async () => {
    // Arrange
    render(<BrowserRouter><RegisterInput register={() => {}} /></BrowserRouter>);
    const emailInput = await screen.getByPlaceholderText('email');

    // Action
    await userEvent.type(emailInput, 'test123@gmail.com');
    // Assert
    expect(emailInput).toHaveValue('test123@gmail.com');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    render(<BrowserRouter><RegisterInput register={() => {}} /></BrowserRouter>);
    const passwordInput = await screen.getByPlaceholderText('password');

    // Action
    await userEvent.type(passwordInput, 'test123');
    // Assert
    expect(passwordInput).toHaveValue('test123');
  });

  it('should call register function when register button is clicked', async () => {
    // Arrange
    const mockRegister = vi.fn();
    render(<BrowserRouter><RegisterInput register={mockRegister} /></BrowserRouter>);
    const nameInput = await screen.getByPlaceholderText('name');
    await userEvent.type(nameInput, 'test123@gmail.com');
    const emailInput = await screen.getByPlaceholderText('email');
    await userEvent.type(emailInput, 'test123@gmail.com');
    const passwordInput = await screen.getByPlaceholderText('password');
    await userEvent.type(passwordInput, 'test123');
    const registerButton = await screen.getByRole('button', { name: 'Sign up' });

    // Action
    await userEvent.click(registerButton);

    // Assert
    expect(mockRegister).toBeCalledWith({
      name: 'test123@gmail.com',
      email: 'test123@gmail.com',
      password: 'test123',
    });
  });
});
