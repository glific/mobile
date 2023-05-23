import React from 'react';
import { act, render, fireEvent, waitFor } from '@testing-library/react-native';
import Chat from '../screens/Chat';
import Storage from '../utils/asyncStorage';
import AuthContext from '../config/AuthContext';

describe('Chat screen', () => {
  test('renders correctly', () => {
    const { getByTestId, getByText } = render(
      <AuthContext.Provider value={{ token: 'existing_token', setToken: jest.fn() }}>
        <Chat />
      </AuthContext.Provider>
    );

    const searchInput = getByTestId('Search Input');
    const logoutButton = getByText('Logout');

    expect(searchInput).toBeDefined();
    expect(logoutButton).toBeDefined();
  });

  test('updates search correctly', () => {
    const { getByTestId } = render(
      <AuthContext.Provider value={{ token: 'existing_token', setToken: jest.fn() }}>
        <Chat />
      </AuthContext.Provider>
    );

    const searchInput = getByTestId('Search Input');
    fireEvent.changeText(searchInput, 'test search');

    expect(searchInput.props.value).toBe('test search');
  });

  test('should test when search and filter icon pressed', async () => {
    const mockOnSearchHandler = jest.fn();
    const mockOnFilter = jest.fn();

    const { getByTestId } = render(
      <AuthContext.Provider value={{ token: 'existing_token', setToken: jest.fn() }}>
        <Chat />
      </AuthContext.Provider>
    );
    await waitFor(() => {
      fireEvent.press(getByTestId('search1'));
      fireEvent.press(getByTestId('filter-outline'));
    });

    expect(mockOnSearchHandler).toBeTruthy();
    expect(mockOnFilter).toBeTruthy();
  });

  test('should call on logout, clear session from storage and navigates to Login screen', async () => {
    jest.mock('../utils/asyncStorage', () => ({
      removeData: jest.fn(),
    }));
    const mockRemoveData = jest.spyOn(Storage, 'removeData');
    const navigateMock = jest.fn();

    const { getByText } = render(
      <AuthContext.Provider value={{ token: 'existing_token', setToken: jest.fn() }}>
        <Chat navigation={{ navigate: navigateMock }} />
      </AuthContext.Provider>
    );
    await act(async () => {
      const logoutButton = getByText('Logout');
      fireEvent.press(logoutButton);
    });

    mockRemoveData.mockResolvedValueOnce();

    expect(mockRemoveData).toHaveBeenCalledTimes(1);
    expect(mockRemoveData).toHaveBeenCalledWith('session');
  });
});
