import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import Server from '../screens/Server';
import renderWithAuth from './AuthProvider';

describe('Server screen', () => {
  test('renders correctly', () => {
    const { getByTestId, getByText } = renderWithAuth(<Server />);

    const serverUrlInput = getByTestId('server');
    const continueButton = getByText('CONTINUE');

    expect(serverUrlInput).toBeDefined();
    expect(continueButton).toBeDefined();
  });

  test('updates server URL correctly', async () => {
    const { findByTestId, getByTestId } = renderWithAuth(<Server />);

    const serverUrlInput = getByTestId('server');

    const clearInput = await findByTestId('close');

    fireEvent.changeText(serverUrlInput, 'https://example.com');
    expect(serverUrlInput.props.value).toBe('https://example.com');

    fireEvent.press(clearInput);
    expect(serverUrlInput.props.value).toBe('');
  });

  test('displays error message for invalid server URL', () => {
    const { getByTestId, getByText } = renderWithAuth(<Server />);

    const serverUrlInput = getByTestId('server');
    const continueButton = getByText('CONTINUE');

    fireEvent.changeText(serverUrlInput, 'invalid-url');
    fireEvent.press(continueButton);

    const errorMessage = getByText('Please enter valid server url');
    expect(errorMessage).toBeDefined();
  });

  test('navigates to Login screen on successful submit', () => {
    const navigateMock = jest.fn();
    const { getByTestId, getByText } = renderWithAuth(
      <Server navigation={{ navigate: navigateMock }} />
    );

    const serverUrlInput = getByTestId('server');
    const continueButton = getByText('CONTINUE');

    fireEvent.changeText(serverUrlInput, 'https://example.com');
    fireEvent.press(continueButton);

    expect(navigateMock).toHaveBeenCalledWith('Login');
  });
});
