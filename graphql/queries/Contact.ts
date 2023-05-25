import { gql } from '@apollo/client';

export const GET_CONTACTS = gql`
  query search($filter: SearchFilter!, $contactOpts: Opts!, $messageOpts: Opts!) {
    search(filter: $filter, contactOpts: $contactOpts, messageOpts: $messageOpts) {
      contact {
        id
        name
        maskedPhone
      }
    }
  }
`;

export const GET_CONTACT = gql`
  query search($filter: SearchFilter!, $contactOpts: Opts!, $messageOpts: Opts!) {
    search(filter: $filter, contactOpts: $contactOpts, messageOpts: $messageOpts) {
      contact {
        name
        maskedPhone
      }
    }
  }
`;

export const GET_CONTACT_MESSAGES = gql`
  query search($filter: SearchFilter!, $contactOpts: Opts!, $messageOpts: Opts!) {
    search(filter: $filter, contactOpts: $contactOpts, messageOpts: $messageOpts) {
      contact {
        name
        maskedPhone
      }
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
