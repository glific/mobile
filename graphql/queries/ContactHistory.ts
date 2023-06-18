import { gql } from "@apollo/client";

export const GET_CONTACT_HISTORY =gql`query ContactHistory($filter: ContactsHistoryFilter, $opts: Opts) {
    contactHistory(filter: $filter, opts: $opts) {
      eventDatetime
      eventLabel
      eventMeta
      eventType
      id
      insertedAt
      updatedAt
      __typename
    }
  }`