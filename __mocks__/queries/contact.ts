import { GET_CONTACTS } from '../../graphql/queries/Contact';

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
        filter: { term: '' },
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
        filter: { term: 'test mock' },
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
