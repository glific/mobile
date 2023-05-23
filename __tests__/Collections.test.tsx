import React from 'react';
import { render } from '@testing-library/react-native';
import Collections from '../screens/Collections';

describe('Collections Screen', () => {
  test('renders the Collections screen', () => {
    const { getByText } = render(<Collections />);
    const collectionsText = getByText('Collections');
    expect(collectionsText).toBeDefined();
  });
});
