import { gql } from '@apollo/client';

export const GET_CONTACTS = gql`
  query search($filter: SearchFilter!, $contactOpts: Opts!, $messageOpts: Opts!) {
    search(filter: $filter, contactOpts: $contactOpts, messageOpts: $messageOpts) {
      contact {
        id
        name
        maskedPhone
        lastMessageAt
        isOrgRead
      }
      messages {
        id
        body
      }
    }
  }
`;

export const GET_CONTACT_HISTORY = gql`
  query ContactHistory($filter: ContactsHistoryFilter, $opts: Opts) {
    contactHistory(filter: $filter, opts: $opts) {
      eventDatetime
      eventLabel
      eventMeta
      eventType
      id
      insertedAt
      updatedAt
    }
  }
`;
