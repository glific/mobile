import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Server from '../screens/Server';

describe('Server screen', () => {
  test('renders correctly', () => {
    const { getByTestId, getByText } = render(<Server />);

    const serverUrlInput = getByTestId('Enter or paste URL here');
    const continueButton = getByText('CONTINUE');

    expect(serverUrlInput).toBeDefined();
    expect(continueButton).toBeDefined();
  });

  test('updates server URL correctly', () => {
    const { getByTestId } = render(<Server />);

    const serverUrlInput = getByTestId('Enter or paste URL here');
    const clearInput = getByTestId('close');

    fireEvent.changeText(serverUrlInput, 'https://example.com');
    expect(serverUrlInput.props.value).toBe('https://example.com');

    fireEvent.press(clearInput);
    expect(serverUrlInput.props.value).toBe('');
  });

  test('displays error message for invalid server URL', () => {
    const { getByTestId, getByText } = render(<Server />);

    const serverUrlInput = getByTestId('Enter or paste URL here');
    const continueButton = getByText('CONTINUE');

    fireEvent.changeText(serverUrlInput, 'invalid-url');
    fireEvent.press(continueButton);

    const errorMessage = getByText('Please enter valid server url');
    expect(errorMessage).toBeDefined();
  });

  test('navigates to Login screen on successful submit', () => {
    const navigateMock = jest.fn();
    const { getByTestId, getByText } = render(<Server navigation={{ navigate: navigateMock }} />);

    const serverUrlInput = getByTestId('Enter or paste URL here');
    const continueButton = getByText('CONTINUE');

    fireEvent.changeText(serverUrlInput, 'https://example.com');
    fireEvent.press(continueButton);

    expect(navigateMock).toHaveBeenCalledWith('Login');
  });
});
