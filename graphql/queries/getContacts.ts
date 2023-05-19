import { gql } from "@apollo/client";

export const GET_CONTACTS = gql`
    query GetContacts ($saveSearchInput: SaveSearchInput, $searchFilter: SearchFilter!, $contactOpts: Opts!, $messageOpts: Opts!) {
        search(
          filter: $searchFilter
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
