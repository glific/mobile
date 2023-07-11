import { GET_ALL_FLOWS } from "../../graphql/queries/Flows";

const mockFlows = [
    {id: 1, name: "Flow 1",},
    {id: 2, name: "Flow 2",},
    {id: 3, name: "Flow 3",},
]

export const  GET_ALL_FLOWS_MOCK = [
    {
        request: {
            query: GET_ALL_FLOWS,
            variables: {
                filter: {
                  status: 'published',
                  isActive: true,
                },
                opts: {
                  limit: null,
                  offset: 0,
                  order: 'ASC',
                },
              },
            },
        result: {
            data: {
                flows: mockFlows,
            }
        }
    }
]