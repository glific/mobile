import { gql } from '@apollo/client';

export const GET_COLLECTIONS = gql`
  query search($filter: SearchFilter!, $contactOpts: Opts!, $messageOpts: Opts!) {
    search(filter: $filter, contactOpts: $contactOpts, messageOpts: $messageOpts) {
      group {
        label
      }
    }
  }
`;
