import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import customRender from '../utils/jestRender';

import OtpScreen from '../screens/OtpScreen';

describe('OTP screen', () => {
  test('renders correctly', () => {
    const { getByTestId, getByText } = customRender(<OtpScreen />);

    expect(getByTestId('otp')).toBeDefined();
    expect(getByText('CONTINUE')).toBeDefined();
  });

  test('updates input values correctly', () => {
    const { getByTestId } = customRender(<OtpScreen />);

    const otpInput = getByTestId('otp');
    fireEvent.changeText(otpInput, '123456');

    expect(otpInput.props.value).toBe('123456');
  });

  test('error message when invalid otp input', async () => {
    const { getByTestId, getByText } = customRender(<OtpScreen />);

    const otpInput = getByTestId('otp');

    fireEvent.changeText(otpInput, '7834');
    fireEvent.press(getByText('CONTINUE'));
    expect(getByText('Please enter a valid OTP!')).toBeDefined();

    fireEvent.changeText(otpInput, '');
    fireEvent.press(getByText('CONTINUE'));
    expect(getByText('Please enter a valid OTP!')).toBeDefined();
  });

  test('should navigate to New Password screen', async () => {
    const navigateMock = jest.fn();
    const { getByTestId, getByText } = customRender(
      <OtpScreen navigation={{ navigate: navigateMock }} />
    );

    const otpInput = getByTestId('otp');

    fireEvent.changeText(otpInput, '123456');
    fireEvent.press(getByText('CONTINUE'));

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('NewPassword');
    });
  });
});
