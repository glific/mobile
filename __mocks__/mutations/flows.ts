import { TERMINATE_FLOW } from "../../graphql/mutations/Flows";

export const TERMINATE_FLOW_MOCK = [
    {
      request: {
        query: TERMINATE_FLOW,
        variables: { contactId: '123' },
      },
      result: {
        data: {
          terminateContactFlows: {
            success: true,
            errors: null,
          },
        },
      },
    },
  ];