import { GET_CONTACTS } from '../../graphql/queries/Contact';
import { GET_MESSAGES } from '../../graphql/queries/Chat';

const mockContacts = {
  id: '1',
  name: 'test',
  maskedPhone: '12*****90',
  lastMessageAt: '2021-08-10T12:00:00.000Z',
};

export const NO_SEARCH_CONTACTS_MOCK = [
  {
    request: {
      query: GET_CONTACTS,
      variables: {
        filter: {},
        messageOpts: { limit: 1 },
        contactOpts: { limit: 10 },
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

export const SEARCH_CONTACTS_MOCK = [
  {
    request: {
      query: GET_CONTACTS,
      variables: {
        filter: { term: 'test search' },
        messageOpts: { limit: 1 },
        contactOpts: { limit: 10 },
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
        messageOpts: { limit: 10 },
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
        messageOpts: { limit: 10 },
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
        messageOpts: { limit: 10 },
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
        messageOpts: { limit: 10 },
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
        messageOpts: { limit: 10 },
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
        messageOpts: { limit: 10 },
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
        messageOpts: { limit: 10 },
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
        messageOpts: { limit: 10 },
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
        messageOpts: { limit: 10 },
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
        messageOpts: { limit: 10 },
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
