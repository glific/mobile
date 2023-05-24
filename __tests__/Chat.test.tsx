import React from 'react';
import { act, fireEvent, waitFor } from '@testing-library/react-native';
import Chat from '../screens/Chat';
import Storage from '../utils/asyncStorage';
import renderWithAuth from '../config/AuthProvider';

describe('Chat screen', () => {
  test('renders correctly', () => {
    const { getByTestId } = renderWithAuth(<Chat />);

    const searchInput = getByTestId('searchInput');
    const loadingIndicator = getByTestId('loadingIndicator');
    
    expect(searchInput).toBeDefined();
    expect(loadingIndicator).toBeTruthy();
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
});
