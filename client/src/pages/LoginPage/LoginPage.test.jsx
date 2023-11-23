// LoginPage.test.jsx
import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  screen,
  render,
  cleanup,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import LoginPage from '.';
import { ExampleProvider } from '../../contexts'; // Adjust the import as needed

describe('Login Page', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <ExampleProvider>
          <LoginPage />
        </ExampleProvider>
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('Displays a username with appropriate text', () => {
    const elem = screen.getByPlaceholderText('Username');
    expect(elem).toBeInTheDocument();
  });

  it('Displays a Sign in button with appropriate text', () => {
    const elem = screen.getByRole('button', { name: /Sign in/i });
    expect(elem).toBeInTheDocument();
  });

  it('Displays a Register button with appropriate text', () => {
    const elem = screen.getByRole('button', { name: /Create an Account/i });
    expect(elem).toBeInTheDocument();
  });

  it('Displays a username with appropriate text', () => {
    const elem = screen.getByPlaceholderText('Username');
    expect(elem).toBeInTheDocument();
  });

  it('logins when correct credentials entered', async () => {
    const userInput = screen.getByPlaceholderText('Username');
    userEvent.type(userInput, 'user');
    const passwordInput = screen.getByPlaceholderText('Password');
    userEvent.type(passwordInput, 'pass');
    const signIn = screen.getByRole('button', { name: /Sign in/i });

    const fetchSpy = vi.spyOn(global, 'fetch');
    const mockResponse = {
      token: 'asdfsaf-sdfafsa-sdfas',
    };

    const mockResolveValue = {
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockResponse),
    };

    fetchSpy.mockReturnValue(mockResolveValue);

    fireEvent.click(signIn);

    await vi.waitFor(() => {
      expect(fetchSpy).toHaveBeenCalled();
      expect(window.location.href).toEqual('http://localhost:3000/dashboard');
    });

    fetchSpy.mockRestore();
  });

  it('fails to log in when incorrect credentials entered', async () => {
    const userInput = screen.getByPlaceholderText('Username');
    userEvent.type(userInput, 'user');
    const passwordInput = screen.getByPlaceholderText('Password');
    userEvent.type(passwordInput, 'wrongpassword');
    const signIn = screen.getByRole('button', { name: /Sign in/i });

    const fetchSpy = vi.spyOn(global, 'fetch');
    const mockResponse = {
      error: 'Invalid credentials',
    };

    const mockResolveValue = {
      ok: false,
      status: 401,
      json: () => Promise.resolve(mockResponse),
    };

    fetchSpy.mockReturnValue(mockResolveValue);

    fireEvent.click(signIn);

    await vi.waitFor(() => {
      expect(fetchSpy).toHaveBeenCalled();
      expect(screen.getByText('Incorrect Credentials')).toBeInTheDocument();
    });

    fetchSpy.mockRestore();
  });

  it('navigates to register page', () => {
    const registerButton = screen.getByRole('button', {
      name: /Create an Account/,
    });
    fireEvent.click(registerButton);

    expect(window.location.href).toEqual('http://localhost:3000/register');
  });
});
