import React from 'react';
import { act, fireEvent, waitFor } from '@testing-library/react-native';
import Chat from '../screens/Chat';
import Storage from '../utils/asyncStorage';
import renderWithAuth from './AuthProvider';

describe('Chat screen', () => {
  test('renders correctly', () => {
    const { getByTestId, getByText } = renderWithAuth(<Chat />);

    const searchInput = getByTestId('searchInput');
    const logoutButton = getByText('Logout');

    expect(searchInput).toBeDefined();
    expect(logoutButton).toBeDefined();
  });

  test('updates search correctly', () => {
    const { getByTestId } = renderWithAuth(<Chat />);

    const searchInput = getByTestId('searchInput');
    fireEvent.changeText(searchInput, 'test search');

    expect(searchInput.props.value).toBe('test search');
  });

  test('should test when search and filter icon pressed', async () => {
    const mockOnSearchHandler = jest.fn();
    const mockOnFilter = jest.fn();

    const { getByTestId } = renderWithAuth(<Chat />);
    await waitFor(() => {
      fireEvent.press(getByTestId('searchIcon'));
      fireEvent.press(getByTestId('filterOutline'));
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

    const { getByText } = renderWithAuth(<Chat navigation={{ navigate: navigateMock }} />);

    await act(async () => {
      const logoutButton = getByText('Logout');
      fireEvent.press(logoutButton);
    });

    mockRemoveData.mockResolvedValueOnce();

    expect(mockRemoveData).toHaveBeenCalledTimes(1);
    expect(mockRemoveData).toHaveBeenCalledWith('session');
  });
});
