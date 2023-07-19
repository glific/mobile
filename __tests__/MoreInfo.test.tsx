import React from 'react';
import customRender from '../utils/jestRender';

import MoreInfo from '../screens/MoreInfo';

describe('More Information', () => {
  test('renders the more information screen', () => {
    const { getByTestId } = customRender(<MoreInfo />);

    expect(getByTestId('Provider status')).toBeDefined();
    expect(getByTestId('Status')).toBeDefined();
    expect(getByTestId('Role')).toBeDefined();
    expect(getByTestId('Age')).toBeDefined();
    expect(getByTestId('Language')).toBeDefined();
    expect(getByTestId('contactStatus')).toBeDefined();
  });
});
