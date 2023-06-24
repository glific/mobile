import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import customRender from '../utils/jestRender';

import Login from '../screens/Login';

describe('Login screen', () => {
  test('renders correctly', () => {
    const { getByTestId, getByText } = customRender(<Login />);

    const mobileInput = getByTestId('mobileNumber');
    const passwordInput = getByTestId('password');
    const loginButton = getByText('LOG IN');

    expect(mobileInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(loginButton).toBeDefined();
    // const { getByTestId, getByPlaceholderText, getByText } = customRender(<Login />);

    // // Check if important components are rendered
    // expect(getByTestId('mobileNumber')).toBeDefined();
    // expect(getByTestId('password')).toBeDefined();
    // expect(getByPlaceholderText('Enter 10 digit phone number')).toBeDefined();
    // expect(getByPlaceholderText('Password')).toBeDefined();
    // expect(getByText('LOG IN')).toBeDefined();
  });

  test('updates input values correctly', () => {
    const { getByTestId } = customRender(<Login />);

    const mobileInput = getByTestId('mobileNumber');
    const passwordInput = getByTestId('password');

    fireEvent.changeText(mobileInput, '7834811114');
    fireEvent.changeText(passwordInput, 'secret1234');

    expect(mobileInput.props.value).toBe('7834811114');
    expect(passwordInput.props.value).toBe('secret1234');
  });

  test('error message when empty mobile number input', async () => {
    const { getByTestId, getByText } = customRender(<Login />);

    const passwordInput = getByTestId('password');
    fireEvent.changeText(passwordInput, 'secret1234');

    const continueButton = getByText('LOG IN');
    fireEvent.press(continueButton);

    const errorMessage = getByText('Please enter mobile number and password!');
    expect(errorMessage).toBeDefined();
  });

  test('error message when empty password input', async () => {
    const { getByTestId, getByText } = customRender(<Login />);

    const mobileInput = getByTestId('mobileNumber');
    fireEvent.changeText(mobileInput, '917834811114');

    const continueButton = getByText('LOG IN');
    fireEvent.press(continueButton);

    const errorMessage = getByText('Please enter mobile number and password!');
    expect(errorMessage).toBeDefined();
  });

  // test("navigates to Chat screen on successful submit", async () => {
  //   const navigationMock = { navigate: jest.fn() };

  //   const { getByTestId, getByText } = customRender(<Login />);

  //   const mobileInput = getByTestId("mobileNumber");
  //   const passwordInput = getByTestId("password");
  //   const continueButton = getByText("Continue");

  //   fireEvent.changeText(mobileInput, "1234567890");
  //   fireEvent.changeText(passwordInput, "password123");

  //   fireEvent.press(continueButton);
  //   expect(navigationMock.navigate).toHaveBeenCalledWith("Chat");
  // });
});
