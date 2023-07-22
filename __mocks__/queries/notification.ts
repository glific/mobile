import { GET_NOTIFICATIONS_COUNT } from '../../graphql/queries/Notification';

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
