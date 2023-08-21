import { gql } from '@apollo/client';

export const GET_COLLECTIONS = gql`
  query search($filter: SearchFilter!, $contactOpts: Opts!, $messageOpts: Opts!) {
    search(filter: $filter, contactOpts: $contactOpts, messageOpts: $messageOpts) {
      group {
        id
        label
      }
      messages {
        id
        body
      }
    }
  }
`;

export const GET_COLLECTIONS_LIST = gql`
  query groups($filter: GroupFilter, $opts: Opts) {
    groups(filter: $filter, opts: $opts) {
      id
      label
    }
  }
`;

export const GET_COLLECTION_CONTACTS = gql`
  query group($id: ID!) {
    group(id: $id) {
      group {
        contacts {
          id
          name
        }
      }
    }
  }
`;

export const GET_CONTACT_COLLECTIONS = gql`
  query contact($id: ID!) {
    contact(id: $id) {
      contact {
        groups {
          id
          label
        }
      }
    }
  }
`;
