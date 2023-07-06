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
  ConversationFilter: undefined;
  ContactProfile: { contact: { id: number; name: string } };
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
