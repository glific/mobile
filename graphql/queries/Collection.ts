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
      isRestricted
    }
  }
`;
