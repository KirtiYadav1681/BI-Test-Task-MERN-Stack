import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import { ToastContainer } from 'react-toastify';

jest.mock('axios');

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Login component', () => {
    render(
      <BrowserRouter>
        <Login />
        <ToastContainer />
      </BrowserRouter>
    );
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  test('handles form input changes', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText(/Enter your email/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('handles successful login', async () => {
    axios.post.mockResolvedValue({
      data: {
        success: true,
        token: 'mocked-token',
      },
    });

    render(
      <BrowserRouter>
        <Login />
        <ToastContainer />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText(/Enter your email/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const loginButton = screen.getByText(/Login/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('mocked-token');
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    expect(screen.getByText(/Logged in successfully./i)).toBeInTheDocument();
  });

  test('handles unsuccessful login', async () => {
    axios.post.mockResolvedValue({
      data: {
        success: false,
        message: 'Invalid credentials',
      },
    });

    render(
      <BrowserRouter>
        <Login />
        <ToastContainer />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText(/Enter your email/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const loginButton = screen.getByText(/Login/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe(null);
      expect(mockNavigate).not.toHaveBeenCalled();
    });

    expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
  });

  test('displays error message on network error', async () => {
    axios.post.mockRejectedValue(new Error('Network Error'));

    render(
      <BrowserRouter>
        <Login />
        <ToastContainer />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText(/Enter your email/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const loginButton = screen.getByText(/Login/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe(null);
      expect(mockNavigate).not.toHaveBeenCalled();
    });

    expect(screen.getByText(/Something went wrong. Please try again./i)).toBeInTheDocument();
  });
});
