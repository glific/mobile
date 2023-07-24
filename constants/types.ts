export type ChatEntry = {
  id: string;
  name: string;
  lastMessageAt: string;
  lastMessage: string | undefined;
  isOrgRead: boolean;
};

export type RootStackParamList = {
  Contacts: undefined;
  Collections: undefined;
  SavedSearches: undefined;
  // eslint-disable-next-line no-unused-vars
  ConversationFilter: { onGoBack: (data: object) => void };
  ContactProfile: {
    contact: {
      id: number;
      conversationType: string;
      name: string;
      lastMessageAt: string;
    };
  };
  ChatScreen: { id: string; displayName: string; conversationType: string };
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
