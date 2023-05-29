import { gql } from '@apollo/client';

export const GET_CONTACTS = gql`
  query search($filter: SearchFilter!, $contactOpts: Opts!, $messageOpts: Opts!) {
    search(filter: $filter, contactOpts: $contactOpts, messageOpts: $messageOpts) {
      contact {
        id
        name
        maskedPhone
        lastMessageAt
      }
    }
  }
`;

export const GET_CONTACT_MESSAGES = gql`
  query search($filter: SearchFilter!, $contactOpts: Opts!, $messageOpts: Opts!) {
    search(filter: $filter, contactOpts: $contactOpts, messageOpts: $messageOpts) {
      messages {
        id
        body
        insertedAt
        sender {
          id
        }
      }
    }
  }
`;

export const SEND_CONTACT_MESSAGE = gql`
  mutation createAndSendMessage($input: MessageInput!) {
    createAndSendMessage(input: $input) {
      message {
        id
        body
        receiver {
          id
          name
        }
        sender {
          id
          name
        }
      }
      errors {
        key
        message
      }
    }
  }
`;
