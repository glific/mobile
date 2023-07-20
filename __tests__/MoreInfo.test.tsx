import React from 'react';
import customRender from '../utils/jestRender';

import ContactInfo from '../screens/ContactInfo';

describe('More Information', () => {
  test('renders the more information screen', () => {
    const { getByTestId } = customRender(<ContactInfo />);

    expect(getByTestId('Provider status')).toBeDefined();
    expect(getByTestId('Status')).toBeDefined();
    expect(getByTestId('Role')).toBeDefined();
    expect(getByTestId('Age')).toBeDefined();
    expect(getByTestId('Language')).toBeDefined();
    expect(getByTestId('contactStatus')).toBeDefined();
  });
});
