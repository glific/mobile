import {
  MARK_AS_READ,
  SEND_COLLECTION_MESSAGE,
  SEND_CONTACT_MESSAGE,
} from '../../graphql/mutations/Chat';

export const MARK_AS_READ_MOCK = {
  request: {
    query: MARK_AS_READ,
    variables: {
      contactId: '1',
    },
  },
  result: {
    data: {
      markContactMessagesAsRead: '1',
    },
  },
};

export const SEND_CONTACT_TEMPLATE_MESSAGE_MOCK = {
  request: {
    query: SEND_CONTACT_MESSAGE,
    variables: {
      body: 'test template body',
      flow: 'OUTBOUND',
      type: 'TEXT',
      receiverId: '1',
      mediaId: null,
      isHsm: true,
      templateId: '1',
      params: ['template'],
    },
  },
  result: {},
};

export const SEND_COLLECTION_INTERACTIVE_MESSAGE_MOCK = {
  request: {
    query: SEND_COLLECTION_MESSAGE,
    variables: {
      body: 'test template body',
      flow: 'OUTBOUND',
      type: 'TEXT',
      receiverId: '1',
      mediaId: null,
      isHsm: true,
      templateId: '1',
      params: ['template'],
    },
  },
  result: {},
};
