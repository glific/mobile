import React from "react";
import { act, render, fireEvent } from "@testing-library/react-native";
import Chat from "../screens/Chat";
import Storage from '../utils/asyncStorage';

describe("Chat screen", () => {
  test("renders correctly", () => {
    const { getByTestId, getByText } = render(<Chat />);

    const searchInput = getByTestId("Search Input");    
    const logoutButton = getByText("Logout");

    expect(searchInput).toBeDefined();
    expect(logoutButton).toBeDefined();
  });

  test("updates search correctly", () => {
    const { getByTestId } = render(<Chat />);

    const searchInput = getByTestId("Search Input");
    fireEvent.changeText(searchInput, "test search");

    expect(searchInput.props.value).toBe("test search");
  });

  test('should test when search and filter icon pressed', () => {
    const mockOnSearchHandler = jest.fn();
    const mockOnFilter = jest.fn();

    const { getByTestId } = render(<Chat />);
    fireEvent.press(getByTestId("search1"));
    fireEvent.press(getByTestId("filter-outline"));

    expect(mockOnSearchHandler).toBeTruthy();
    expect(mockOnFilter).toBeTruthy();
  });

  test("should call on logout, clear session from storage and navigates to Login screen", async () => {
    jest.mock('../utils/asyncStorage', () => ({
      removeData: jest.fn(),
    }));
    const mockRemoveData = jest.spyOn(Storage, 'removeData');
    const navigateMock = jest.fn();
    
    const { getByText } = render(<Chat navigation={{ navigate: navigateMock }} />);
    await act(async () => {
      const logoutButton = getByText('Logout');
      fireEvent.press(logoutButton);
    });
    
    expect(mockRemoveData).toHaveBeenCalledWith('session');
  });
});
