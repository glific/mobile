import React from 'react';
import { render } from '@testing-library/react-native';
import SavedSearches from '../screens/SavedSearches';

describe('SavedSearches Screen', () => {
  test('renders the SavedSearches screen', () => {
    const { getByText } = render(<SavedSearches />);
    const savedSearchesText = getByText('SavedSearches');
    expect(savedSearchesText).toBeDefined();
  });
});