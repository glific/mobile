import React from 'react';
import { render } from '@testing-library/react-native';
import MyAccount from '../screens/MyAccount';

describe('MyAccount Screen', () => {
  test('renders the MyAccount screen', () => {
    const { getByText } = render(<MyAccount />);
    const myAccountText = getByText('MyAccount');
    expect(myAccountText).toBeDefined();
  });
});
