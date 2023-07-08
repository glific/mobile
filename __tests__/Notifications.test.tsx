import React from 'react';
import Notifications from '../screens/Notifications';
import customRender from '../utils/jestRender';
import { GET_NOTIFICATIONS } from '../graphql/queries/Notification';
import { fireEvent, waitFor } from '@testing-library/react-native';

describe('Notifications Screen', () => {
  const mockNotifications = [
    {
      __typename__: 'Notification',
      entity: '{"name": "John Doe", "phone": "1234567890"}',
      message: 'Sample notification message',
      severity: '"Warning"',
      updatedAt: '2023-06-20T12:34:56Z',
    },
    {
      __typename__: 'Notification',
      entity: '{"name": "Glific Simulated User", "phone": "3674277582"}',
      message: "Sorry the 24 hours window is closed. You can't send message now",
      severity: '"Info"',
      updatedAt: '2023-06-20T11:34:56Z',
    },
  ];
  const mocks = [
    {
      request: {
        query: GET_NOTIFICATIONS,
        variables: { opts: { limit: 20, offset: 0, order: 'DESC', orderWith: 'updated_at' } },
      },
      result: {
        data: {
          notifications: mockNotifications,
        },
      },
    },
  ];

  test('renders the Notifications screen', async () => {
    const { getAllByText } = customRender(<Notifications navigation={undefined} />, mocks);

    // search for element with John Doe
    await waitFor(() => getAllByText('John Doe'));
    const notificationText = getAllByText('John Doe');
    expect(notificationText).toBeDefined();

    // Navigate to Info tab
    const infoTab = getAllByText('Info');
    fireEvent.press(infoTab[0]);
    // search fr element with Glific Simulated User
    const infoNotification1 = getAllByText('Glific Simulated User');
    expect(infoNotification1).toBeDefined();
  });
});
