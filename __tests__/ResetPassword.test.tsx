import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import customRender from '../utils/jestRender';

import ResetPassword from '../screens/ResetPassword';

describe('Reset password screen', () => {
  test('renders correctly', () => {
    const { getByTestId, getByText } = customRender(<ResetPassword />);

    expect(getByTestId('mobileNumber')).toBeDefined();
    expect(getByText('Generate OTP')).toBeDefined();
  });

  test('updates input values correctly', () => {
    const { getByTestId } = customRender(<ResetPassword />);

    const mobileInput = getByTestId('mobileNumber');
    fireEvent.changeText(mobileInput, '7834811114');

    expect(mobileInput.props.value).toBe('7834811114');
  });

  test('error message when invalid mobile number input', async () => {
    const { getByTestId, getByText } = customRender(<ResetPassword />);

    const mobileInput = getByTestId('mobileNumber');

    fireEvent.changeText(mobileInput, '783481');
    fireEvent.press(getByText('Generate OTP'));
    expect(getByText('Please enter a valid mobile number!')).toBeDefined();

    fireEvent.changeText(mobileInput, '');
    fireEvent.press(getByText('Generate OTP'));
    expect(getByText('Please enter a valid mobile number!')).toBeDefined();
  });

  test('should navigate to otp screen', async () => {
    const navigateMock = jest.fn();
    const { getByTestId, getByText } = customRender(
      <ResetPassword navigation={{ navigate: navigateMock }} />
    );

    const mobileInput = getByTestId('mobileNumber');

    fireEvent.changeText(mobileInput, '7834811114');
    fireEvent.press(getByText('Generate OTP'));

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('OtpScreen');
    });
  });
});
