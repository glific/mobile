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
      messages {
        id
        body
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

export const GET_CONTACTS_DETAILS = gql`
  query getContact($id: ID!) {
    contact(id: $id) {
      contact {
        activeProfile {
          id
          __typename
        }
        phone
        maskedPhone
        status
        lastMessageAt
        groups {
          id
          label
          users {
            name
            __typename
          }
          __typename
        }
        fields
        optinTime
        optoutTime
        optinMethod
        optoutMethod
        settings
        __typename
      }
      __typename
    }
  }
`;
