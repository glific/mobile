import React from 'react';
import customRender from '../utils/jestRender';

import Setting from '../screens/Setting';

describe('Setting Screen', () => {
  test('renders the Setting screen', () => {
    const { getByText } = customRender(<Setting />);
    const settingText = getByText('Setting');
    expect(settingText).toBeDefined();
  });
});
