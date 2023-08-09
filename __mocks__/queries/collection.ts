import { GET_MESSAGES } from '../../graphql/queries/Chat';
import { GET_COLLECTIONS } from '../../graphql/queries/Collection';

const mockMessages = {
  id: '1',
  body: 'test message',
};

export const GET_COLLECTIONS_MOCK = [
  {
    request: {
      query: GET_COLLECTIONS,
      variables: {
        filter: { searchGroup: true },
        messageOpts: { limit: 1 },
        contactOpts: { limit: 10, offset: 0 },
      },
    },
    result: {
      data: {
        search: [
          {
            group: {
              id: '1',
              label: 'test group1',
            },
            messages: mockMessages,
          },
          {
            group: {
              id: '2',
              label: 'test group2',
            },
            messages: mockMessages,
          },
          {
            group: {
              id: '3',
              label: 'test group3',
            },
            messages: mockMessages,
          },
          {
            group: {
              id: '4',
              label: 'test group4',
            },
            messages: mockMessages,
          },
          {
            group: {
              id: '5',
              label: 'test group5',
            },
            messages: mockMessages,
          },
          {
            group: {
              id: '6',
              label: 'test group6',
            },
            messages: mockMessages,
          },
          {
            group: {
              id: '7',
              label: 'test group7',
            },
            messages: mockMessages,
          },
          {
            group: {
              id: '8',
              label: 'test group8',
            },
            messages: mockMessages,
          },
          {
            group: {
              id: '9',
              label: 'test group9',
            },
            messages: mockMessages,
          },
          {
            group: {
              id: '10',
              label: 'test group10',
            },
            messages: mockMessages,
          },
        ],
      },
    },
  },
  {
    request: {
      query: GET_COLLECTIONS,
      variables: {
        filter: { searchGroup: true },
        messageOpts: { limit: 1 },
        contactOpts: { limit: 10, offset: 10 },
      },
    },
    result: {
      data: {
        search: [
          {
            group: {
              id: '11',
              label: 'test group11',
            },
            messages: mockMessages,
          },
          {
            group: {
              id: '12',
              label: 'test group12',
            },
            messages: mockMessages,
          },
        ],
      },
    },
  },
];

export const GET_COLLECTION_NO_MESSAGE_MOCK = [
  {
    request: {
      query: GET_MESSAGES,
      variables: {
        filter: { id: 1, searchGroup: true },
        contactOpts: { limit: 1 },
        messageOpts: { limit: 20, offset: 0 },
      },
    },
    result: {
      data: {
        search: [
          {
            messages: [],
          },
        ],
      },
    },
  },
];

export const GET_COLLECTION_TEXT_MESSAGE_MOCK = [
  {
    request: {
      query: GET_MESSAGES,
      variables: {
        filter: { id: 1, searchGroup: true },
        contactOpts: { limit: 1 },
        messageOpts: { limit: 20, offset: 0 },
      },
    },
    result: {
      data: {
        search: [
          {
            messages: [
              {
                __typename: 'Message',
                body: 'text message',
                contextMessage: null,
                errors: '{}',
                flowLabel: null,
                id: '568',
                insertedAt: '2023-06-20T07:27:26.164270Z',
                interactiveContent: '{}',
                location: null,
                media: null,
                messageNumber: 29,
                receiver: { __typename: 'Contact', id: '17' },
                sendBy: '',
                sender: { __typename: 'Contact', id: '21' },
                type: 'TEXT',
              },
            ],
          },
        ],
      },
    },
  },
];
