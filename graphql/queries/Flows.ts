import { gql } from '@apollo/client';

export const GET_ALL_FLOWS = gql`
  query flows($filter: FlowFilter, $opts: Opts) {
    flows(filter: $filter, opts: $opts) {
      id
      name
    }
  }
`;
