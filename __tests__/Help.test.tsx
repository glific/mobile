import React from 'react';
import customRender from '../utils/jestRender';

import Help from '../screens/Help';

describe('Help Screen', () => {
  test('renders the Help screen', () => {
    const { getByText } = customRender(<Help />);
    const helpText = getByText('Help');
    expect(helpText).toBeDefined();
  });
});
