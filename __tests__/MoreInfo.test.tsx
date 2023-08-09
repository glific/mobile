import React from 'react';
import customRender from '../utils/jestRender';

import ContactInfo from '../screens/ContactInfo';

// Mock the navigation and route objects
const mockNavigation = { navigate: jest.fn() };
const mockFields = {
  field1: 'value1',
  field2: 'value2',
};

describe('More Information', () => {
  test('renders the fields', () => {
    const { getByText } = customRender(
      <ContactInfo navigation={mockNavigation} route={{ params: { fields: mockFields } }} />
    );
    expect(getByText('field1')).toBeDefined();
    expect(getByText('value1')).toBeDefined();
    expect(getByText('field2')).toBeDefined();
    expect(getByText('value2')).toBeDefined();
  });

  test('renders with no fields available', () => {
    const { getByText } = customRender(
      <ContactInfo navigation={mockNavigation} route={{ params: { fields: {} } }} />
    );
    expect(getByText('No Fields Available')).toBeDefined();
  });
});
