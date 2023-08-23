import { gql } from '@apollo/client';

export const ADD_COLLECTIONS_TO_CONTACT = gql`
  mutation updateContactGroups($input: ContactGroupsInput!) {
    updateContactGroups(input: $input) {
      contactGroups {
        id
        group {
          label
        }
        contact {
          name
        }
      }
      numberDeleted
    }
  }
`;

export const ADD_CONTACTS_TO_COLLECTION = gql`
  mutation updateGroupContacts($input: GroupContactsInput!) {
    updateGroupContacts(input: $input) {
      groupContacts {
        id
        group {
          label
        }
        contact {
          name
        }
      }
      numberDeleted
    }
  }
`;
