import React from 'react';
import customRender from '../utils/jestRender';

import ContactHistory from '../screens/ContactHistory';

describe('Contact History', () => {
  test('renders the contact history screen', () => {
    const { getByText } = customRender(<ContactHistory />);

    expect(getByText('Flow Started: Registration Workflow')).toBeDefined();
    // expect(getByText('19/07/2023, 08:52:11')).toBeDefined();

    expect(getByText('Load More')).toBeDefined();
  });
});
