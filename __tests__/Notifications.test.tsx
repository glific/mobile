import React from 'react';
import Notifications from '../screens/Notifications';
import renderWithAuth from '../config/AuthProvider';

describe('Notifications Screen', () => {
  test('renders the Notifications screen', () => {
    const { getByText } = renderWithAuth(<Notifications />);
    const notificationText = getByText('Notifications');
    expect(notificationText).toBeDefined();
  });
});
