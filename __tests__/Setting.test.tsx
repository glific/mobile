import React from 'react';
import Setting from '../screens/Setting';
import renderWithAuth from './AuthProvider';

describe('Setting Screen', () => {
  test('renders the Setting screen', () => {
    const { getByText } = renderWithAuth(<Setting />);
    const settingText = getByText('Setting');
    expect(settingText).toBeDefined();
  });
});
