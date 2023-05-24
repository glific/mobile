import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Login from '../screens/Login';
import AuthContext from '../config/AuthContext';

jest.mock('react-native-phone-number-input', () => {
  const { TextInput } = jest.requireActual('react-native');
  return jest.fn().mockImplementation((props) => {
    return <TextInput onChange={props.onChangeText} value={props.value} testID="Mobile Number" />;
  });
});

describe('Login screen', () => {
  test('renders correctly', () => {
    const { getByTestId, getByText } = render(
      <AuthContext.Provider value={{ token: 'existing_token', setToken: jest.fn() }}>
        <Login />
      </AuthContext.Provider>
    );

    const mobileInput = getByTestId('Mobile Number');
    const passwordInput = getByTestId('password');
    const continueButton = getByText('LOG IN');

    expect(mobileInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(continueButton).toBeDefined();
  });

  test('updates input values correctly', () => {
    const { getByTestId } = render(
      <AuthContext.Provider value={{ token: 'existing_token', setToken: jest.fn() }}>
        <Login />
      </AuthContext.Provider>
    );

    const mobileInput = getByTestId('Mobile Number');
    const passwordInput = getByTestId('password');

    fireEvent.changeText(mobileInput, '917834811114');
    fireEvent.changeText(passwordInput, 'secret1234');

    expect(mobileInput.props.value).toBe('917834811114');
    expect(passwordInput.props.value).toBe('secret1234');
  });

  test('error message when empty mobile number input', async () => {
    const { getByTestId, getByText } = render(
      <AuthContext.Provider value={{ token: 'existing_token', setToken: jest.fn() }}>
        <Login />
      </AuthContext.Provider>
    );

    const passwordInput = getByTestId('password');
    fireEvent.changeText(passwordInput, 'secret1234');

    const continueButton = getByText('LOG IN');
    fireEvent.press(continueButton);

    const errorMessage = getByText('Please enter mobile number and password!');
    expect(errorMessage).toBeDefined();
  });

  test('error message when empty password input', async () => {
    const { getByTestId, getByText } = render(
      <AuthContext.Provider value={{ token: 'existing_token', setToken: jest.fn() }}>
        <Login />
      </AuthContext.Provider>
    );

    const mobileInput = getByTestId('Mobile Number');
    fireEvent.changeText(mobileInput, '917834811114');

    const continueButton = getByText('LOG IN');
    fireEvent.press(continueButton);

    const errorMessage = getByText('Please enter mobile number and password!');
    expect(errorMessage).toBeDefined();
  });

  // test("navigates to Chat screen on successful submit", async () => {
  //   const navigationMock = { navigate: jest.fn() };

  //   const { getByTestId, getByText } = render(<Login navigation={navigationMock} />);

  //   const mobileInput = getByTestId("Mobile Number");
  //   const passwordInput = getByTestId("password");
  //   const continueButton = getByText("Continue");

  //   fireEvent.changeText(mobileInput, "1234567890");
  //   fireEvent.changeText(passwordInput, "password123");

  //   fireEvent.press(continueButton);
  //   expect(navigationMock.navigate).toHaveBeenCalledWith("Chat");
  // });
});
