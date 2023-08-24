export type ChatEntry = {
  id: string;
  name: string;
  lastMessageAt: string;
  lastMessage: string | undefined;
  isOrgRead: boolean;
};

export type RootStackParamList = {
  Contacts:
    | {
        name: string;
        variables: object;
      }
    | undefined;
  Collections: undefined;
  SavedSearches: undefined;
  // eslint-disable-next-line no-unused-vars
  ConversationFilter: { onGoBack: (data: object) => void };
  ContactProfile: {
    contact: {
      id: string;
      conversationType: string;
      name: string;
      lastMessageAt?: string;
    };
  };
  CollectionProfile: {
    collection: {
      id: string;
      name: string;
    };
  };
  CollectionContacts: {
    id: string;
  };
  ChatScreen: {
    id: string;
    displayName: string;
    lastMessageAt?: string;
    conversationType: string;
  };
};

export type MessageObjectType = {
  set: React.Dispatch<React.SetStateAction<string>>;
  value: string | null;
};

export type CursorType = {
  set: React.Dispatch<React.SetStateAction<number>>;
  value: number;
};

export type EmojiProps = {
  emoji: string;
  messageObj: MessageObjectType;
  cursor: CursorType;
};
