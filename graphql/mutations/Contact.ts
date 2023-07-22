import { gql } from '@apollo/client';

export const BLOCK_CONTACT = gql`
  mutation updateContact($id: ID!, $input: ContactInput!) {
    updateContact(id: $id, input: $input) {
      contact {
        id
        name
        phone
        language {
          id
          label
        }
      }
    }
  }
`;
