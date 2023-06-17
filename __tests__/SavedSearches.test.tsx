import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import customRender from '../utils/jestRender';

import SavedSearches from '../screens/SavedSearches';

describe('Saved Searches Screen', () => {
  test('renders the saved searches screen', () => {
    const { getByTestId, getByText } = customRender(<SavedSearches />);

    const searchInput = getByTestId('searchInput');
    const savedSearchesText = getByText('No Saved Searches');

    expect(searchInput).toBeDefined();
    expect(savedSearchesText).toBeDefined();
  });

  test('should search when searchValue not empty', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const { getByTestId } = customRender(<SavedSearches />);

    const searchInput = getByTestId('searchInput');
    const searchButton = getByTestId('searchIcon');

    fireEvent.changeText(searchInput, 'example search');
    fireEvent.press(searchButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('example search');
    });
    consoleSpy.mockRestore();
  });

  test('should not search when searchValue empty', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const { getByTestId } = customRender(<SavedSearches />);

    const searchInput = getByTestId('searchInput');
    const searchButton = getByTestId('searchIcon');

    fireEvent.changeText(searchInput, '');
    fireEvent.press(searchButton);

    await waitFor(() => {
      expect(consoleSpy).not.toHaveBeenCalled();
    });
    consoleSpy.mockRestore();
  });

  // test('should check when saved searches', async () => {})
});
