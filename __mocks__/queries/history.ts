import { GET_CONTACT_HISTORY } from '../../graphql/queries/Contact';

const mockHistory = {
  contactHistory: [
    {
      eventDatetime: '2023-08-05T10:00:00.000Z',
      eventLabel: 'Flow Started',
      eventMeta: '{"flow":{"name":"FlowName1"}}',
      eventType: 'SomeEventType',
      id: '1',
      insertedAt: '2023-08-05T10:00:00.000Z',
      updatedAt: '2023-08-05T10:00:00.000Z',
    },
    {
      eventDatetime: '2023-07-24T17:14:52Z',
      eventLabel: 'Last Active flow is killed as new flow has started',
      eventMeta: '{"status":"published","source":"init_context","flow_id":14}',
      eventType: 'SomeOtherEventType',
      id: '2',
      insertedAt: '2023-07-24T17:14:52.000000Z',
      updatedAt: '2023-07-24T17:14:52.000000Z',
    },
  ],
};
// Function to generate a new item with similar properties
const createSimilarItem = (id: string) => ({
  eventDatetime: '2023-08-05T10:00:00.000Z',
  eventLabel: 'Flow Started',
  eventMeta: '{"flow":{"name":"FlowName' + id + '"}}',
  eventType: 'SomeEventType',
  id: id,
  insertedAt: '2023-08-05T10:00:00.000Z',
  updatedAt: '2023-08-05T10:00:00.000Z',
});

// Populate the mockHistory.contactHistory array with 10 more items
for (let i = 3; i <= 10; i++) {
  mockHistory.contactHistory.push(createSimilarItem(i.toString()));
}

export const GET_CONTACT_HISTORY_MOCK = [
  {
    request: {
      query: GET_CONTACT_HISTORY,
      variables: { opts: { order: 'ASC', limit: 10, offset: 0 }, filter: { contactId: '2' } },
    },
    result: {
      data: mockHistory,
    },
  },
  {
    request: {
      query: GET_CONTACT_HISTORY,
      variables: { opts: { order: 'ASC', limit: 10, offset: 11 }, filter: { contactId: '2' } },
    },
    result: {
      data: {
        contactHistory: [
          {
            eventDatetime: '2023-08-05T10:00:00.000Z',
            eventLabel: 'Flow Started',
            eventMeta: '{"flow":{"name":"FlowName11"}}',
            eventType: 'SomeEventType',
            id: '11',
            insertedAt: '2023-08-05T10:00:00.000Z',
            updatedAt: '2023-08-05T10:00:00.000Z',
          },
          {
            eventDatetime: '2023-07-24T17:14:52Z',
            eventLabel: 'Last Active flow is killed as new flow has started',
            eventMeta: '{"status":"published","source":"init_context","flow_id":14}',
            eventType: 'SomeOtherEventType',
            id: '12',
            insertedAt: '2023-07-24T17:14:52.000000Z',
            updatedAt: '2023-07-24T17:14:52.000000Z',
          },
        ],
      },
    },
  },
];

export const GET_EMPTY_HISTORY_MOCK = [
  {
    request: {
      query: GET_CONTACT_HISTORY,
      variables: { opts: { order: 'ASC', limit: 10, offset: 0 }, filter: { contactId: '2' } },
    },
    result: {
      data: { contactHistory: [] },
    },
  },
];
