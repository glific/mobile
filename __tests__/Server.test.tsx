import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Server from "../screens/Server";

describe("Server screen", () => {
  test("renders correctly", () => {
    const { getByTestId, getByText } = render(<Server />);

    const serverUrlInput = getByTestId("Server URL");
    const continueButton = getByText("Continue");

    expect(serverUrlInput).toBeDefined();
    expect(continueButton).toBeDefined();
  });

  test("updates server URL correctly", () => {
    const { getByTestId } = render(<Server />);

    const serverUrlInput = getByTestId("Server URL");

    fireEvent.changeText(serverUrlInput, "https://example.com");

    expect(serverUrlInput.props.value).toBe("https://example.com");
  });

  test("displays error message for invalid server URL", () => {
    const { getByTestId, getByText } = render(<Server />);

    const serverUrlInput = getByTestId("Server URL");
    const continueButton = getByText("Continue");

    fireEvent.changeText(serverUrlInput, "invalid-url");
    fireEvent.press(continueButton);

    const errorMessage = getByText("Please enter valid server url");
    expect(errorMessage).toBeDefined();
  });

  test("navigates to Login screen on successful submit", () => {
    const navigateMock = jest.fn();
    const { getByTestId, getByText } = render(<Server navigation={{ navigate: navigateMock }} />);

    const serverUrlInput = getByTestId("Server URL");
    const continueButton = getByText("Continue");

    fireEvent.changeText(serverUrlInput, "https://example.com");
    fireEvent.press(continueButton);

    expect(navigateMock).toHaveBeenCalledWith("Login");
  });
});
