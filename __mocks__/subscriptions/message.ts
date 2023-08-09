import {
  MESSAGE_RECEIVED_SUBSCRIPTION,
  MESSAGE_SENT_SUBSCRIPTION,
} from '../../graphql/subscriptions/Chat';

export const messageReceivedSubscription = {
  request: {
    query: MESSAGE_RECEIVED_SUBSCRIPTION,
    variables: { organizationId: '1' },
  },
  result: {
    data: {
      receivedMessage: {
        groupId: null,
        contact: {
          id: '1',
          name: 'Glific user',
          maskedPhone: '917**4811114',
          lastMessageAt: '',
          isOrgRead: true,
        },
        body: 'hello',
        flow: 'INBOUND',
        id: '21',
        messageNumber: 0,
        insertedAt: '2020-07-11T14:03:28Z',
        receiver: {
          id: '1',
          phone: '917834811114',
        },
        sender: {
          id: '2',
          phone: '919090709009',
        },
        type: 'TEXT',
        fields: '{}',
        media: {
          caption: null,
          url: 'https://filemanager.gupshup.io/fm/wamedia/demobot1/36623b99-5844-4195-b872-61ef34c9ce11',
        },
        location: null,
        errors: '{}',
        contextMessage: {
          body: 'All good',
          contextId: 1,
          messageNumber: 10,
          errors: '{}',
          media: null,
          type: 'TEXT',
          insertedAt: '2021-04-26T06:13:03.832721Z',
          location: null,
          receiver: {
            id: '1',
          },
          sender: {
            id: '2',
            name: 'User',
          },
        },
        interactiveContent: '{}',
        sendBy: 'test',
        flowLabel: null,
      },
    },
  },
};

const messageSubscriptionData = {
  sentMessage: {
    body: 'How can we help?',
    flow: 'OUTBOUND',
    id: '22',
    groupId: null,
    contact: {
      id: '1',
      name: 'Glific user',
      maskedPhone: '917**4811114',
      lastMessageAt: '',
      isOrgRead: true,
    },
    messageNumber: 0,
    insertedAt: '2020-07-11T14:03:28Z',
    receiver: {
      id: '2',
      phone: '919090909009',
    },
    sender: {
      id: '1',
      phone: '917834811114',
    },
    type: 'TEXT',
    fields: '{}',
    media: {
      caption: null,
      url: 'https://filemanager.gupshup.io/fm/wamedia/demobot1/36623b99-5844-4195-b872-61ef34c9ce11',
    },
    location: null,
    errors: '{}',
    contextMessage: {
      body: 'All good',
      contextId: 1,
      messageNumber: 10,
      errors: '{}',
      media: null,
      type: 'TEXT',
      insertedAt: '2021-04-26T06:13:03.832721Z',
      location: null,
      receiver: {
        id: '1',
      },
      sender: {
        id: '2',
        name: 'User',
      },
    },
    interactiveContent: '{}',
    sendBy: 'test',
    flowLabel: null,
  },
};

export const messageSendSubscription = {
  request: {
    query: MESSAGE_SENT_SUBSCRIPTION,
    variables: { organizationId: '1' },
  },
  result: {
    data: messageSubscriptionData,
  },
};

export const subscriptionMocks = [messageSendSubscription, messageReceivedSubscription];
