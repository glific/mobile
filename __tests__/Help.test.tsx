import React from 'react';
import { render } from '@testing-library/react-native';
import Help from '../screens/Help';

describe('Help Screen', () => {
  test('renders the Help screen', () => {
    const { getByText } = render(<Help />);
    const helpText = getByText('Help');
    expect(helpText).toBeDefined();
  });
});
