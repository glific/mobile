import { MARK_NOTIFICATIONS_AS_READ } from '../../graphql/mutations/Notification';
import { GET_NOTIFICATIONS, GET_NOTIFICATIONS_COUNT } from '../../graphql/queries/Notification';

export const GET_NOTIFICATIONS_COUNT_MOCK = [
  {
    request: {
      query: GET_NOTIFICATIONS_COUNT,
      variables: {
        filter: {
          is_read: false,
        },
      },
    },
    result: {
      data: {
        countNotifications: 10,
      },
    },
  },
];

export const GET_NOTIFICATIONS_MOCK = [
  {
    request: {
      query: MARK_NOTIFICATIONS_AS_READ,
    },
    result: {
      data: {
        markNotificationAsRead: true,
      },
    },
  },
  {
    request: {
      query: GET_NOTIFICATIONS,
      variables: {
        filter: { message: '' },
        opts: { limit: 10, offset: 0, order: 'DESC', orderWith: 'updated_at' },
      },
    },
    result: {
      data: {
        notifications: [
          {
            __typename__: 'Notification',
            entity: '{"name": "John Doe", "phone": "1234567890"}',
            message: 'Sample notification message',
            severity: '"Warning"',
            updatedAt: '2023-06-20T12:34:56Z',
          },
          {
            __typename__: 'Notification',
            entity: '{"name": "Glific 2", "phone": "3674277582"}',
            message: "Sorry the 24 hours window is closed. You can't send message now",
            severity: '"Info"',
            updatedAt: '2023-06-20T11:34:56Z',
          },
          {
            __typename__: 'Notification',
            entity: '{"name": "Glific 3", "phone": "3674277582"}',
            message: "Sorry the 24 hours window is closed. You can't send message now",
            severity: '"Info"',
            updatedAt: '2023-06-20T11:34:56Z',
          },
          {
            __typename__: 'Notification',
            entity: '{"name": "Glific 4", "phone": "3674277582"}',
            message: "Sorry the 24 hours window is closed. You can't send message now",
            severity: '"Info"',
            updatedAt: '2023-06-20T11:34:56Z',
          },
          {
            __typename__: 'Notification',
            entity: '{"name": "Glific 5", "phone": "3674277582"}',
            message: "Sorry the 24 hours window is closed. You can't send message now",
            severity: '"Info"',
            updatedAt: '2023-06-20T11:34:56Z',
          },
          {
            __typename__: 'Notification',
            entity: '{"name": "Glific 6", "phone": "3674277582"}',
            message: "Sorry the 24 hours window is closed. You can't send message now",
            severity: '"Info"',
            updatedAt: '2023-06-20T11:34:56Z',
          },
          {
            __typename__: 'Notification',
            entity: '{"name": "Glific 7", "phone": "3674277582"}',
            message: "Sorry the 24 hours window is closed. You can't send message now",
            severity: '"Info"',
            updatedAt: '2023-06-20T11:34:56Z',
          },
          {
            __typename__: 'Notification',
            entity: '{"name": "Glific 8", "phone": "3674277582"}',
            message: "Sorry the 24 hours window is closed. You can't send message now",
            severity: '"Info"',
            updatedAt: '2023-06-20T11:34:56Z',
          },
          {
            __typename__: 'Notification',
            entity: '{"name": "Glific 9", "phone": "3674277582"}',
            message: "Sorry the 24 hours window is closed. You can't send message now",
            severity: '"Info"',
            updatedAt: '2023-06-20T11:34:56Z',
          },
          {
            __typename__: 'Notification',
            entity: '{"name": "Glific 10", "phone": "3674277533"}',
            message: "Sorry the 24 hours window is closed. You can't send message now",
            severity: '"Info"',
            updatedAt: '2023-06-20T11:34:56Z',
          },
        ],
      },
    },
  },
  {
    request: {
      query: GET_NOTIFICATIONS,
      variables: {
        filter: { message: '' },
        opts: { limit: 10, offset: 10, order: 'DESC', orderWith: 'updated_at' },
      },
    },
    result: {
      data: {
        notifications: [
          {
            __typename__: 'Notification',
            entity: '{"name": "John Doe 11", "phone": "1234567890"}',
            message: 'Sample notification message',
            severity: '"Warning"',
            updatedAt: '2023-06-20T12:34:56Z',
          },
          {
            __typename__: 'Notification',
            entity: '{"name": "Glific 12", "phone": "3674277582"}',
            message: "Sorry the 24 hours window is closed. You can't send message now",
            severity: '"Info"',
            updatedAt: '2023-06-20T11:34:56Z',
          },
        ],
      },
    },
  },
];

export const GET_NOTIFICATIONS_ERROR_MOCK = [
  {
    request: {
      query: GET_NOTIFICATIONS,
      variables: {
        filter: { message: '' },
        opts: { limit: 10, offset: 0, order: 'DESC', orderWith: 'updated_at' },
      },
    },
    error: {
      message: 'Test error',
    },
  },
];
