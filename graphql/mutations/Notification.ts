import { gql } from '@apollo/client';

export const MARK_NOTIFICATIONS_AS_READ = gql`
  mutation markNotificationAsRead {
    markNotificationAsRead
  }
`;
