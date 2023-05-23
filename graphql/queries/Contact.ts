import { gql } from '@apollo/client';

export const GET_CONTACTS = gql`
  query GetContacts(
    $saveSearchInput: SaveSearchInput
    $filter: SearchFilter!
    $contactOpts: Opts!
    $messageOpts: Opts!
  ) {
    search(
      filter: $filter
      saveSearchInput: $saveSearchInput
      contactOpts: $contactOpts
      messageOpts: $messageOpts
    ) {
      contact {
        name
      }
    }
  }
`;
