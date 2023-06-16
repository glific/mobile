import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import Notifications from '../screens/Notifications';
import renderWithAuth from '../utils/authProvider';

describe('Notifications', () => {
  const navigationMock = { setOptions: jest.fn() };

  test('renders the notification list with the correct number of items', () => {
    const { getAllByTestId } = renderWithAuth(<Notifications navigation={navigationMock} />);
    const notificationItems = getAllByTestId('notificationItem');
    expect(notificationItems.length).toBeGreaterThan(0);
  });

  test('changes the active tab and updates the notification array when a tab is pressed', () => {
    const { getByTestId, getAllByTestId } = renderWithAuth(
      <Notifications navigation={navigationMock} />
    );

    const allTab = getByTestId('All');
    const criticalTab = getByTestId('Critical');
    const warningTab = getByTestId('Warning');
    const infoTab = getByTestId('Info');

    // Critical tab
    fireEvent.press(criticalTab);
    const notificationItemsCritical = getAllByTestId('notificationItem');
    expect(notificationItemsCritical.length).toBeGreaterThan(0);

    // Warning tab
    fireEvent.press(warningTab);
    const notificationItemsWarning = getAllByTestId('notificationItem');
    expect(notificationItemsWarning.length).toBeGreaterThan(0);

    // Info tab
    fireEvent.press(infoTab);
    const notificationItemsInfo = getAllByTestId('notificationItem');
    expect(notificationItemsInfo.length).toBeGreaterThan(0);

    // All tab
    fireEvent.press(allTab);
    const notificationItemsAll = getAllByTestId('notificationItem');
    expect(notificationItemsAll.length).toBeGreaterThan(0);
  });
});
