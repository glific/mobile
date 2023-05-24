import React from 'react';
import Collections from '../screens/Collections';
import renderWithAuth from '../utils/authProvider';

describe('Collections Screen', () => {
  test('renders the Collections screen', () => {
    const { getByTestId } = renderWithAuth(<Collections />);
    const loadingIndicator = getByTestId('loadingIndicator');
    expect(loadingIndicator).toBeTruthy();
  });
});
