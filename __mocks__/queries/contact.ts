import { GET_CONTACTS, GET_CONTACT_INFO } from '../../graphql/queries/Contact';
import { GET_MESSAGES } from '../../graphql/queries/Chat';
import {
  START_COLLECTION_FLOW,
  START_CONTACT_FLOW,
  TERMINATE_FLOW,
} from '../../graphql/mutations/Flows';
import { CLEAR_MESSAGES } from '../../graphql/mutations/Chat';
import { BLOCK_CONTACT } from '../../graphql/mutations/Contact';
import { GET_ALL_FLOWS, GET_ALL_FLOW_LABELS } from '../../graphql/queries/Flows';
import { GET_COLLECTIONS_LIST } from '../../graphql/queries/Collection';
import { GET_USERS } from '../../graphql/queries/User';
import { SAVED_SEARCH_QUERY, SEARCHES_COUNT } from '../../graphql/queries/Search';

const mockContacts = {
  id: '1',
  name: 'test',
  maskedPhone: '12*****90',
  lastMessageAt: '2021-08-10T12:00:00.000Z',
  isOrgRead: true,
};

export const NO_SEARCH_CONTACTS_MOCK = [
  {
    request: {
      query: GET_CONTACTS,
      variables: {
        filter: {},
        messageOpts: { limit: 1 },
        contactOpts: { limit: 10, offset: 0 },
      },
    },
    result: {
      data: {
        search: [
          {
            contact: mockContacts,
            messages: [
              {
                id: '1',
                body: 'test message',
              },
            ],
          },
        ],
      },
    },
  },
  {
    request: {
      query: SAVED_SEARCH_QUERY,
      variables: {
        filter: { isReserved: true },
        opts: {},
      },
    },
    result: {
      data: {
        search: [
          {
            savedSearches: [
              {
                id: '1',
                args: '{}',
                shortcode: 'ts',
                label: 'test search',
                isReserved: true,
              },
            ],
          },
        ],
      },
    },
  },
  {
    request: {
      query: SEARCHES_COUNT,
      variables: { organizationId: 1 },
    },
    result: {
      data: '{collectionStats: {"1": {ts: 10}}}',
    },
  },
];

export const SEARCH_CONTACTS_MOCK = [
  {
    request: {
      query: GET_CONTACTS,
      variables: {
        filter: { term: 'test search' },
        messageOpts: { limit: 1 },
        contactOpts: { limit: 20 },
      },
    },
    result: {
      data: {
        search: [
          {
            contact: mockContacts,
            messages: [
              {
                id: '1',
                body: 'test message',
              },
            ],
          },
        ],
      },
    },
  },
];

export const GET_CONTACT_NO_MESSAGE_MOCK = [
  {
    request: {
      query: GET_MESSAGES,
      variables: {
        filter: { id: 1, searchGroup: false },
        contactOpts: { limit: 1 },
        messageOpts: { limit: 20 },
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

export const GET_CONTACT_MESSAGES_MOCK = [
  {
    request: {
      query: GET_MESSAGES,
      variables: {
        filter: { id: 1, searchGroup: false },
        contactOpts: { limit: 1 },
        messageOpts: { limit: 20 },
      },
    },
    result: {
      data: {
        search: [
          {
            messages: [
              {
                __typename: 'Message',
                body: 'hello',
                contextMessage: null,
                errors: '{}',
                flowLabel: null,
                id: '601',
                insertedAt: '2023-06-21T06:41:25.029490Z',
                interactiveContent: '{}',
                location: null,
                media: null,
                messageNumber: 36,
                receiver: { __typename: 'Contact', id: '21' },
                sendBy: 'NGO Main Account',
                sender: { __typename: 'Contact', id: '17' },
                type: 'TEXT',
              },
            ],
          },
        ],
      },
    },
  },
];

export const GET_CONTACT_TEXT_MESSAGE_MOCK = [
  {
    request: {
      query: GET_MESSAGES,
      variables: {
        filter: { id: 1, searchGroup: false },
        contactOpts: { limit: 1 },
        messageOpts: { limit: 20 },
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

export const GET_CONTACT_IMAGE_MESSAGE_MOCK = [
  {
    request: {
      query: GET_MESSAGES,
      variables: {
        filter: { id: 1, searchGroup: false },
        contactOpts: { limit: 1 },
        messageOpts: { limit: 20 },
      },
    },
    result: {
      data: {
        search: [
          {
            messages: [
              {
                __typename: 'Message',
                body: null,
                contextMessage: null,
                errors: '{}',
                flowLabel: null,
                id: '569',
                insertedAt: '2023-06-20T07:28:41.628145Z',
                interactiveContent: '{}',
                location: null,
                media: {
                  __typename: 'MessageMedia',
                  caption: null,
                  url: 'https://www.buildquickbots.com/whatsapp/media/sample/jpg/sample01.jpg',
                },
                messageNumber: 30,
                receiver: { __typename: 'Contact', id: '17' },
                sendBy: '',
                sender: { __typename: 'Contact', id: '21' },
                type: 'IMAGE',
              },
            ],
          },
        ],
      },
    },
  },
];

export const GET_CONTACT_VIDEO_MESSAGE_MOCK = [
  {
    request: {
      query: GET_MESSAGES,
      variables: {
        filter: { id: 1, searchGroup: false },
        contactOpts: { limit: 1 },
        messageOpts: { limit: 20 },
      },
    },
    result: {
      data: {
        search: [
          {
            messages: [
              {
                __typename: 'Message',
                body: null,
                contextMessage: null,
                errors: '{}',
                flowLabel: null,
                id: '571',
                insertedAt: '2023-06-20T07:29:01.174036Z',
                interactiveContent: '{}',
                location: null,
                media: {
                  __typename: 'MessageMedia',
                  caption: null,
                  url: 'https://www.buildquickbots.com/whatsapp/media/sample/video/sample01.mp4',
                },
                messageNumber: 32,
                receiver: { __typename: 'Contact', id: '17' },
                sendBy: '',
                sender: { __typename: 'Contact', id: '21' },
                type: 'VIDEO',
              },
            ],
          },
        ],
      },
    },
  },
];

export const GET_CONTACT_AUDIO_MESSAGE_MOCK = [
  {
    request: {
      query: GET_MESSAGES,
      variables: {
        filter: { id: 1, searchGroup: false },
        contactOpts: { limit: 1 },
        messageOpts: { limit: 20 },
      },
    },
    result: {
      data: {
        search: [
          {
            messages: [
              {
                __typename: 'Message',
                body: null,
                contextMessage: null,
                errors: '{}',
                flowLabel: null,
                id: '570',
                insertedAt: '2023-06-20T07:28:50.592222Z',
                interactiveContent: '{}',
                location: null,
                media: {
                  __typename: 'MessageMedia',
                  caption: null,
                  url: 'https://www.buildquickbots.com/whatsapp/media/sample/audio/sample01.mp3',
                },
                messageNumber: 31,
                receiver: { __typename: 'Contact', id: '17' },
                sendBy: '',
                sender: { __typename: 'Contact', id: '21' },
                type: 'AUDIO',
              },
            ],
          },
        ],
      },
    },
  },
];

export const GET_CONTACT_DOCUMENT_MESSAGE_MOCK = [
  {
    request: {
      query: GET_MESSAGES,
      variables: {
        filter: { id: 1, searchGroup: false },
        contactOpts: { limit: 1 },
        messageOpts: { limit: 20 },
      },
    },
    result: {
      data: {
        search: [
          {
            messages: [
              {
                __typename: 'Message',
                body: null,
                contextMessage: null,
                errors: '{}',
                flowLabel: null,
                id: '572',
                insertedAt: '2023-06-20T07:29:12.350136Z',
                interactiveContent: '{}',
                location: null,
                media: {
                  __typename: 'MessageMedia',
                  caption: 'sample pdf',
                  url: 'https://www.buildquickbots.com/whatsapp/media/sample/pdf/sample01.pdf',
                },
                messageNumber: 33,
                receiver: { __typename: 'Contact', id: '17' },
                sendBy: '',
                sender: { __typename: 'Contact', id: '21' },
                type: 'DOCUMENT',
              },
            ],
          },
        ],
      },
    },
  },
];

export const GET_CONTACT_STICKER_MESSAGE_MOCK = [
  {
    request: {
      query: GET_MESSAGES,
      variables: {
        filter: { id: 1, searchGroup: false },
        contactOpts: { limit: 1 },
        messageOpts: { limit: 20 },
      },
    },
    result: {
      data: {
        search: [
          {
            messages: [
              {
                __typename: 'Message',
                body: null,
                contextMessage: null,
                errors: '{}',
                flowLabel: null,
                id: '573',
                insertedAt: '2023-06-20T07:29:18.650398Z',
                interactiveContent: '{}',
                location: null,
                media: {
                  __typename: 'MessageMedia',
                  caption: null,
                  url: 'http://www.buildquickbots.com/whatsapp/stickers/SampleSticker01.webp',
                },
                messageNumber: 34,
                receiver: { __typename: 'Contact', id: '17' },
                sendBy: '',
                sender: { __typename: 'Contact', id: '21' },
                type: 'STICKER',
              },
            ],
          },
        ],
      },
    },
  },
];

export const GET_CONTACT_LOCATION_MESSAGE_MOCK = [
  {
    request: {
      query: GET_MESSAGES,
      variables: {
        filter: { id: 1, searchGroup: false },
        contactOpts: { limit: 1 },
        messageOpts: { limit: 20 },
      },
    },
    result: {
      data: {
        search: [
          {
            messages: [
              {
                __typename: 'Message',
                body: null,
                contextMessage: null,
                errors: '{}',
                flowLabel: null,
                id: '574',
                insertedAt: '2023-06-20T07:29:23.917470Z',
                interactiveContent: '{}',
                location: { __typename: 'Locations', latitude: 41.725556, longitude: -49.946944 },
                media: null,
                messageNumber: 35,
                receiver: { __typename: 'Contact', id: '17' },
                sendBy: '',
                sender: { __typename: 'Contact', id: '21' },
                type: 'LOCATION',
              },
            ],
          },
        ],
      },
    },
  },
];

export const GET_CONTACT_QUCIK_REPLY_MESSAGE_MOCK = [
  {
    request: {
      query: GET_MESSAGES,
      variables: {
        filter: { id: 1, searchGroup: false },
        contactOpts: { limit: 1 },
        messageOpts: { limit: 20 },
      },
    },
    result: {
      data: {
        search: [
          {
            messages: [
              {
                __typename: 'Message',
                body: `test quick reply message`,
                contextMessage: null,
                errors: '{}',
                flowLabel: null,
                id: '635',
                insertedAt: '2023-06-25T10:55:41.454724Z',
                interactiveContent:
                  '{"type":"quick_reply","options":[{"type":"text","title":"option1"},{"type":"text","title":"option2"}],"content":{"type":"text","text":"test quick reply message","header":"Details Confirmation","caption":""}}',
                location: null,
                media: null,
                messageNumber: 102,
                receiver: { __typename: 'Contact', id: '22' },
                sendBy: 'NGO Main Account',
                sender: { __typename: 'Contact', id: '17' },
                type: 'QUICK_REPLY',
              },
            ],
          },
        ],
      },
    },
  },
];

export const GET_CONTACT_MESSAGES_POPUPS_MOCK = [
  {
    request: {
      query: GET_MESSAGES,
      variables: {
        filter: { id: 1, searchGroup: false },
        contactOpts: { limit: 1 },
        messageOpts: { limit: 20 },
      },
    },
    result: {
      data: {
        search: [
          {
            messages: [
              {
                __typename: 'Message',
                body: 'hello',
                contextMessage: null,
                errors: '{}',
                flowLabel: null,
                id: '601',
                insertedAt: '2023-06-21T06:41:25.029490Z',
                interactiveContent: '{}',
                location: null,
                media: null,
                messageNumber: 36,
                receiver: { __typename: 'Contact', id: '21' },
                sendBy: 'NGO Main Account',
                sender: { __typename: 'Contact', id: '17' },
                type: 'TEXT',
              },
            ],
          },
        ],
      },
    },
  },
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
  {
    request: {
      query: CLEAR_MESSAGES,
      variables: { contactId: '123' },
    },
    result: {
      data: {
        clearMessages: {
          success: true,
          errors: null,
        },
      },
    },
  },
  {
    request: {
      query: BLOCK_CONTACT,
      variables: { contactId: '123', input: { status: 'BLOCKED' } },
    },
    result: {
      data: {
        updateContact: {
          contact: {
            id: '123',
            name: 'John',
            phone: '123456789',
            language: {
              id: '1',
              label: 'English',
            },
          },
        },
      },
    },
  },
];

export const GET_CONTACT_MESSAGES_FLOW_MOCK = [
  {
    request: {
      query: GET_MESSAGES,
      variables: {
        filter: { id: 1, searchGroup: false },
        contactOpts: { limit: 1 },
        messageOpts: { limit: 20 },
      },
    },
    result: {
      data: {
        search: [
          {
            messages: [
              {
                __typename: 'Message',
                body: 'hello',
                contextMessage: null,
                errors: '{}',
                flowLabel: null,
                id: '601',
                insertedAt: '2023-06-21T06:41:25.029490Z',
                interactiveContent: '{}',
                location: null,
                media: null,
                messageNumber: 36,
                receiver: { __typename: 'Contact', id: '21' },
                sendBy: 'NGO Main Account',
                sender: { __typename: 'Contact', id: '17' },
                type: 'TEXT',
              },
            ],
          },
        ],
      },
    },
  },
  {
    request: {
      query: START_COLLECTION_FLOW,
      variables: { flowId: '1', groupId: '123' },
    },
    result: {
      data: {
        startGroupFlow: {
          success: true,
          errors: null,
        },
      },
    },
  },
  {
    request: {
      query: START_CONTACT_FLOW,
      variables: { flowId: '1', contactId: '123' },
    },
    result: {
      data: {
        startContactFlow: {
          success: true,
          errors: null,
        },
      },
    },
  },
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
        flows: [
          {
            id: '1',
            name: 'flow_1',
          },
          {
            id: '2',
            name: 'flow_2',
          },
        ],
      },
    },
  },
];

export const GET_OPTIONS_MOCK = [
  {
    request: {
      query: GET_COLLECTIONS_LIST,
      variables: {
        filter: {},
        opts: {
          limit: null,
          offset: 0,
          order: 'ASC',
        },
      },
    },
    result: {
      data: {
        groups: [
          { id: 1, label: 'Group 1', isRestricted: false },
          { id: 2, label: 'Group 2', isRestricted: false },
          { id: 3, label: 'Group 3', isRestricted: false },
        ],
      },
    },
  },
  {
    request: {
      query: GET_ALL_FLOW_LABELS,
      variables: {
        filter: {},
        opts: {
          limit: null,
          offset: 0,
          order: 'ASC',
        },
      },
    },
    result: {
      data: {
        flowLabels: [
          { id: 1, name: 'Flow 1' },
          { id: 2, name: 'Flow 2' },
          { id: 3, name: 'Flow 3' },
        ],
      },
    },
  },
  {
    request: {
      query: GET_USERS,
      variables: {
        filter: {},
        opts: {
          limit: null,
          offset: 0,
          order: 'ASC',
        },
      },
    },
    result: {
      data: {
        users: [
          { id: 1, label: 'User 1' },
          { id: 2, label: 'User 2' },
          { id: 3, label: 'User 3' },
        ],
      },
    },
  },
];

export const CONTACT_INFO_MOCK = [
  {
    request: {
      query: GET_CONTACT_INFO,
      variables: { id: '12' },
    },
    result: {
      data: {
        contact: {
          contact: {
            id: '1',
            name: 'John Doe',
            phone: '1234567890',
            status: 'VALID',
            language: {
              label: 'English',
            },
            fields:
              '{"name":{"value":"John","label":"Name"},"age_group":{"value":"15 to 18","label":"Age"}}',
            groups: [
              {
                label: 'Group 1',
                users: [
                  {
                    name: 'User 1',
                  },
                  {
                    name: 'User 2',
                  },
                ],
              },
              {
                label: 'Group 2',
                users: [
                  {
                    name: 'User 3',
                  },
                ],
              },
            ],
          },
        },
      },
    },
  },
];
