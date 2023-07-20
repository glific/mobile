import React from 'react';
import customRender from '../utils/jestRender';

import MyAccount from '../screens/MyAccount';

describe('MyAccount Screen', () => {
  test('renders the MyAccount screen', () => {
    const { getByText } = customRender(<MyAccount />);
    expect(getByText('Under Construction')).toBeDefined();
  });
});
