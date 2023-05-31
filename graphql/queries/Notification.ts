import { gql } from '@apollo/client';

export const GET_NOTIFICATIONS_COUNT = gql`
  query countNotifications($filter: NotificationFilter) {
    countNotifications(filter: $filter)
  }
`;
