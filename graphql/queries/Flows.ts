import { gql } from '@apollo/client';

export const GET_ALL_FLOWS = gql`
  query flows($filter: FlowFilter, $opts: Opts) {
    flows(filter: $filter, opts: $opts) {
      id
      name
    }
  }
`;

export const START_CONTACT_FLOW = gql`
  mutation startContactFlow($flowId: ID!, $contactId: ID!) {
    startContactFlow(flowId: $flowId, contactId: $contactId) {
      success
      errors {
        key
        message
      }
    }
  }
`;
