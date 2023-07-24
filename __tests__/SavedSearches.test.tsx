import React from 'react';
import customRender from '../utils/jestRender';

import SavedSearches from '../screens/SavedSearches';
import { NO_SAVED_SEARCH_MOCK, SAVED_SEARCH_MOCK } from '../__mocks__/queries/search';
import { waitFor } from '@testing-library/react-native';

describe('Saved Searches Screen', () => {
  test('renders the no saved searches screen', async () => {
    const { getByTestId, getByText } = customRender(<SavedSearches />, NO_SAVED_SEARCH_MOCK);

    const searchInput = getByTestId('searchInput');
    expect(searchInput).toBeDefined();

    await waitFor(() => {
      const savedSearchText = getByText('No Saved Searches');
      expect(savedSearchText).toBeDefined();
    });
  }, 5000);

  test('renders the saved searches screen', async () => {
    const { getByTestId, getByText } = customRender(<SavedSearches />, SAVED_SEARCH_MOCK);

    expect(getByTestId('searchInput')).toBeDefined();
    expect(getByTestId('loadingIndicator')).toBeDefined();

    await waitFor(async () => {
      const savedSearches = await getByText('test search');
      expect(savedSearches).toBeDefined();
    });
  }, 5000);
});
