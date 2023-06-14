import { gql } from "@apollo/client";

export const GET_SAVED_SEARCH =gql`query savedSearches($filter: SavedSearchFilter!, $opts: Opts) {
    savedSearches(filter: $filter, opts: $opts) {
      id
      shortcode
      label
      isReserved
      args
      __typename
    }
  }`