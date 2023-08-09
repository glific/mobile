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
      input: {
        body: 'test {{1}} body',
        flow: 'OUTBOUND',
        type: 'TEXT',
        receiverId: 1,
        mediaId: null,
        isHsm: true,
        templateId: 1,
        params: ['template'],
      },
    },
  },
  result: {
    data: {
      createAndSendMessage: {
        message: {
          id: 1,
          body: 'test template body',
          media: null,
          sender: {
            id: 1,
          },
          receiver: {
            id: 1,
          },
        },
        errors: null,
      },
    },
  },
};

export const SEND_COLLECTION_INTERACTIVE_MESSAGE_MOCK = {
  request: {
    query: SEND_COLLECTION_MESSAGE,
    variables: {
      groupId: 1,
      input: {
        body: '',
        flow: 'OUTBOUND',
        type: 'QUICK_REPLY',
        receiverId: 1,
        mediaId: null,
        interactiveTemplateId: 1,
      },
    },
  },
  result: {
    data: {
      createAndSendMessageToGroup: {
        success: true,
      },
    },
  },
};
