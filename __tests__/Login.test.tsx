import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Login from "../screens/Login";

describe("Login screen", () => {
  test("renders correctly", () => {
    const { getByTestId, getByText } = render(<Login />);

    const mobileInput = getByTestId("Mobile Number");
    const passwordInput = getByTestId("Password");
    const continueButton = getByText("Continue");

    expect(mobileInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(continueButton).toBeDefined();
  });

  test("updates input values correctly", () => {
    const { getByTestId } = render(<Login />);

    const mobileInput = getByTestId("Mobile Number");
    const passwordInput = getByTestId("Password");

    fireEvent.changeText(mobileInput, "917834811114");
    fireEvent.changeText(passwordInput, "secret1234");

    expect(mobileInput.props.value).toBe("917834811114");
    expect(passwordInput.props.value).toBe("secret1234");
  });

  test("error message when empty mobile number input", async () => {
    const { getByTestId, getByText } = render(<Login />);

    const passwordInput = getByTestId("Password");
    fireEvent.changeText(passwordInput, "secret1234");

    const continueButton = getByText("Continue");
    fireEvent.press(continueButton);

    const errorMessage = getByText("Please enter mobile number and password!");
    expect(errorMessage).toBeDefined();
  });

  test("error message when empty password input", async () => {
    const { getByTestId, getByText } = render(<Login />);

    const mobileInput = getByTestId("Mobile Number");
    fireEvent.changeText(mobileInput, "917834811114");

    const continueButton = getByText("Continue");
    fireEvent.press(continueButton);

    const errorMessage = getByText("Please enter mobile number and password!");
    expect(errorMessage).toBeDefined();
  });

  // test("navigates to Chat screen on successful submit", async () => {
  //   const navigationMock = { navigate: jest.fn() };

  //   const { getByTestId, getByText } = render(<Login navigation={navigationMock} />);

  //   const mobileInput = getByTestId("Mobile Number");
  //   const passwordInput = getByTestId("Password");
  //   const continueButton = getByText("Continue");

  //   fireEvent.changeText(mobileInput, "1234567890");
  //   fireEvent.changeText(passwordInput, "password123");

  //   fireEvent.press(continueButton);
  //   expect(navigationMock.navigate).toHaveBeenCalledWith("Chat");
  // });
});