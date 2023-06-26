import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import customRender from '../utils/jestRender';

import NewPassword from '../screens/NewPassword';

describe('NewPassword screen', () => {
  test('renders correctly', () => {
    const { getByTestId, getByText } = customRender(<NewPassword />);

    expect(getByTestId('newPassword')).toBeDefined();
    expect(getByTestId('confirmPassword')).toBeDefined();
    expect(getByText('SAVE')).toBeDefined();
  });

  test('updates input values correctly', () => {
    const { getByTestId } = customRender(<NewPassword />);

    const newInput = getByTestId('newPassword');
    const confirmInput = getByTestId('confirmPassword');

    fireEvent.changeText(newInput, 'secret1234');
    fireEvent.changeText(confirmInput, 'secret1234');

    expect(newInput.props.value).toBe('secret1234');
    expect(confirmInput.props.value).toBe('secret1234');
  });

  test('error message when invalid input', async () => {
    const { getByTestId, getByText } = customRender(<NewPassword />);

    const newInput = getByTestId('newPassword');
    const confirmInput = getByTestId('confirmPassword');

    fireEvent.changeText(newInput, 'secret1234');
    fireEvent.changeText(confirmInput, 'secret12');
    fireEvent.press(getByText('SAVE'));
    expect(getByText('Confirmed password is not same with new password')).toBeDefined();
  });

  test('should navigate to back to login screen', async () => {
    const navigateMock = jest.fn();
    const { getByTestId, getByText } = customRender(
      <NewPassword navigation={{ navigate: navigateMock }} />
    );

    const newInput = getByTestId('newPassword');
    const confirmInput = getByTestId('confirmPassword');

    fireEvent.changeText(newInput, 'secret1234');
    fireEvent.changeText(confirmInput, 'secret1234');

    fireEvent.press(getByText('SAVE'));
    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('Login');
    });
  });
});
