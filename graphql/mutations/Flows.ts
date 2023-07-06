import { gql } from '@apollo/client';

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

export const START_COLLECTION_FLOW = gql`
  mutation startGroupFlow($flowId: ID!, $groupId: ID!) {
    startGroupFlow(flowId: $flowId, groupId: $groupId) {
      success
      errors {
        key
        message
      }
    }
  }
`;
