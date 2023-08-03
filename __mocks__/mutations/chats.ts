import { MARK_AS_READ } from '../../graphql/mutations/Chat';

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
