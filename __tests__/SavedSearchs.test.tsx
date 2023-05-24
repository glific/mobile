import React from 'react';
import SavedSearches from '../screens/SavedSearches';
import renderWithAuth from '../utils/authProvider';

describe('SavedSearches Screen', () => {
  test('renders the SavedSearches screen', () => {
    const { getByText } = renderWithAuth(<SavedSearches />);
    const savedSearchesText = getByText('SavedSearches');
    expect(savedSearchesText).toBeDefined();
  });
});
