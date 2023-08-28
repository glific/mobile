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
          phone
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

export const COUNT_COLLECTION_CONTACTS = gql`
  query countContacts($filter: ContactFilter!) {
    countContacts(filter: $filter)
  }
`;

export const GET_COLLECTION_INFO = gql`
  query getGroup($id: ID!) {
    group(id: $id) {
      group {
        id
        label
        roles {
          id
          label
        }
        description
        users {
          id
          name
        }
      }
    }
  }
`;

export const GET_COLLECTION_MESSAGES_INFO = gql`
  query groupInfo($id: ID!) {
    groupInfo(id: $id)
  }
`;
