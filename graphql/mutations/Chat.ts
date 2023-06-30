import { gql } from '@apollo/client';

export const SEND_CONTACT_MESSAGE = gql`
  mutation createAndSendMessage($input: MessageInput!) {
    createAndSendMessage(input: $input) {
      message {
        id
        body
        receiver {
          id
        }
        sender {
          id
        }
        media {
          url
          caption
        }
      }
      errors {
        key
        message
      }
    }
  }
`;

export const SEND_COLLECTION_MESSAGE = gql`
  mutation createAndSendMessageToGroup($groupId: ID!, $input: MessageInput!) {
    createAndSendMessageToGroup(groupId: $groupId, input: $input) {
      success
    }
  }
`;
