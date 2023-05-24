import React from 'react';
import Collections from '../screens/Collections';
import renderWithAuth from '../config/AuthProvider';

describe('Collections Screen', () => {
  test('renders the Collections screen', () => {
    const { getByText } = renderWithAuth(<Collections />);
    const collectionsText = getByText('Collections');
    expect(collectionsText).toBeDefined();
  });
});
