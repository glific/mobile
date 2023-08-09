import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import customRender from '../utils/jestRender';

import Notifications from '../screens/Notifications';
import NotificationHeader from '../components/headers/NotificationHeader';
import {
  GET_NOTIFICATIONS_ERROR_MOCK,
  GET_NOTIFICATIONS_MOCK,
} from '../__mocks__/queries/notification';

const searchVal = '';
const handleSearchMock = jest.fn();

describe('Notifications Screen', () => {
  test('renders the Notifications screen', async () => {
    const { getByText, getByLabelText } = customRender(<Notifications searchValue={searchVal} />, [
      ...GET_NOTIFICATIONS_MOCK,
      ...GET_NOTIFICATIONS_MOCK,
    ]);

    await waitFor(() => {
      const notificationText = getByText('John Doe');
      const infoNotification1 = getByText('Glific 2');

      expect(notificationText).toBeDefined();
      expect(infoNotification1).toBeDefined();
    });

    const flatList = getByLabelText('notification-list');

    // Todo: need to see how to get the next set of items in flatlist. The below expectations is not correct
    await waitFor(() => {
      expect(getByText('Glific 10')).toBeDefined();
    });

    await waitFor(() => {});
  });

  test('should change notification tab', async () => {
    const { getByText } = customRender(
      <Notifications searchValue={searchVal} />,
      GET_NOTIFICATIONS_MOCK
    );
    await waitFor(() => {
      const infoTab = getByText('Info');
      fireEvent.press(infoTab);
    });

    await waitFor(() => {
      const infoNotification1 = getByText('Glific 2');
      expect(infoNotification1).toBeDefined();
    });
  });

  test('error while fetching notifications', async () => {
    const logSpy = jest.spyOn(global.console, 'log');
    const { getByText } = customRender(
      <Notifications searchValue={searchVal} />,
      GET_NOTIFICATIONS_ERROR_MOCK
    );

    await waitFor(async () => {
      expect(getByText('No notification')).toBeDefined();
      expect(logSpy).toHaveBeenCalledWith('Test error');
    });
    logSpy.mockRestore();
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
