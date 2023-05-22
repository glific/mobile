import React from 'react';
import { render } from '@testing-library/react-native';
import Notifications from '../screens/Notifications';

describe('Notifications Screen', () => {
  test('renders the Notifications screen', () => {
    const { getByText } = render(<Notifications />);
    const notificationText = getByText('Notifications');
    expect(notificationText).toBeDefined();
  });
});