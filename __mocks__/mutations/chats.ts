import {
  CREATE_MEDIA_MESSAGE,
  MARK_AS_READ,
  SEND_COLLECTION_MESSAGE,
  SEND_CONTACT_MESSAGE,
  UPLOAD_MEDIA,
  UPLOAD_MEDIA_BLOB,
} from '../../graphql/mutations/Chat';

export const CREATE_MEDIA_MESSAGE_MOCK = {
  request: {
    query: CREATE_MEDIA_MESSAGE,
    variables: {
      input: {
        caption: 'test image message',
        sourceUrl: 'https://dummy-image-jpg.url',
        url: 'https://dummy-image-jpg.url',
      },
    },
  },
  result: {
    data: {
      createMessageMedia: {
        messageMedia: { id: '123' },
      },
    },
  },
};

export const UPLOAD_MEDIA_BLOB_MOCK = {
  request: {
    query: UPLOAD_MEDIA_BLOB,
    variables: {
      contactId: '1',
    },
  },
  result: {
    data: {
      uploadBlob: 'test-blob.url',
    },
  },
};

export const UPLOAD_MEDIA_MOCK = {
  request: {
    query: UPLOAD_MEDIA,
    variables: {
      media: '1',
      extension: 'jpg',
    },
  },
  result: {
    data: {
      uploadMediab: 'test-media.url',
    },
  },
};

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

export const SEND_CONTACT_IMAGE_MESSAGE_MOCK = {
  request: {
    query: SEND_CONTACT_MESSAGE,
    variables: {
      input: {
        body: 'test image message',
        flow: 'OUTBOUND',
        type: 'IMAGE',
        receiverId: 1,
        mediaId: '123',
      },
    },
  },
  result: {
    data: {
      createAndSendMessage: {
        message: {
          id: 1,
          body: 'test image message',
          media: {
            id: '123',
            url: 'http://example.com',
            caption: 'test image message',
          },
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
