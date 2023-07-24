import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import customRender from '../utils/jestRender';

import Notifications from '../screens/Notifications';
import NotificationHeader from '../components/headers/NotificationHeader';
import { GET_NOTIFICATIONS_MOCK } from '../__mocks__/queries/notification';

const searchVal = '';
const handleSearchMock = jest.fn();

describe('Notifications Screen', () => {
  test('renders the Notifications screen', async () => {
    const { getAllByText } = customRender(
      <Notifications searchValue={searchVal} />,
      GET_NOTIFICATIONS_MOCK
    );

    await waitFor(() => getAllByText('John Doe'));
    const notificationText = getAllByText('John Doe');
    expect(notificationText).toBeDefined();

    const infoTab = getAllByText('Info');
    fireEvent.press(infoTab[0]);

    const infoNotification1 = getAllByText('Glific Simulated User');
    expect(infoNotification1).toBeDefined();
  });

  test('renders the Notification header search', async () => {
    const { getByTestId } = customRender(
      <NotificationHeader searchValue={searchVal} handleSearch={handleSearchMock} />
    );

    const searchIcon = getByTestId('searchIcon');
    expect(searchIcon).toBeDefined();
    fireEvent.press(searchIcon);

    await waitFor(() => {
      const searchInput = getByTestId('searchInput');
      const searchClose = getByTestId('searchClose');
      fireEvent.changeText(searchInput, 'test search');

      expect(handleSearchMock).toHaveBeenCalledWith('test search');
      fireEvent.press(searchClose);
    });
  });
});
