import { gql } from '@apollo/client';

export const GET_ATTACHMENT_PERMISSION = gql`
  query attachmentsEnabled {
    attachmentsEnabled
  }
`;

export const BSP_BALANCE = gql`
  query bspbalance {
    bspbalance
  }
`;

export const GET_CURRENT_USER = gql`
  query currentUser {
    currentUser {
      user {
        id
        name
        phone
        accessRoles {
          id
          label
        }
        contact {
          id
        }
        groups {
          id
          label
          description
        }
        organization {
          id
          contact {
            phone
          }
        }
        language {
          id
          locale
        }
      }
    }
  }
`;
