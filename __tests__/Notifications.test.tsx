import React from 'react';
import Notifications from '../screens/Notifications';
import renderWithAuth from '../utils/authProvider';

describe('Notifications Screen', () => {
  test('renders the Notifications screen', () => {
    const { getAllByText } = renderWithAuth(<Notifications />);
    const notificationText = getAllByText('Glific stimulator four');
    expect(notificationText).toHaveLength(5);
  });
});
