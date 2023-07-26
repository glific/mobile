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

export const CLEAR_MESSAGES = gql`
  mutation clearMessages($contactId: ID!) {
    clearMessages(contactId: $contactId) {
      success
      errors {
        key
        message
      }
    }
  }
`;

export const CONTACT_FRAGMENT = gql`
  fragment isOrgRead on Contact {
    isOrgRead
  }
`;

export const MARK_AS_READ = gql`
  mutation markContactMessagesAsRead($contactId: Gid!) {
    markContactMessagesAsRead(contactId: $contactId)
  }
`;
