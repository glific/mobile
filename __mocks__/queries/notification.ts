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
      query: GET_NOTIFICATIONS,
      variables: {
        opts: { limit: 20, offset: 0, order: 'DESC', orderWith: 'updated_at' },
        filter: { message: '' },
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
            entity: '{"name": "Glific Simulated User", "phone": "3674277582"}',
            message: "Sorry the 24 hours window is closed. You can't send message now",
            severity: '"Info"',
            updatedAt: '2023-06-20T11:34:56Z',
          },
        ],
      },
    },
  },
];
