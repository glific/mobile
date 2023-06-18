import { gql } from '@apollo/client';

export const GET_NOTIFICATIONS_COUNT = gql`
  query countNotifications($filter: NotificationFilter) {
    countNotifications(filter: $filter)
  }
`;

export const GET_NOTIFICATIONS = gql`
  query notifications($filter: NotificationFilter) {
    notifications(filter: $filter) {
      entity
      message
      severity
      updatedAt
    }
  }
`;
