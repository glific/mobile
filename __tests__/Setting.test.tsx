import React from 'react';
import { render } from '@testing-library/react-native';
import Setting from '../screens/Setting';

describe('Setting Screen', () => {
  test('renders the Setting screen', () => {
    const { getByText } = render(<Setting />);
    const settingText = getByText('Setting');
    expect(settingText).toBeDefined();
  });
});