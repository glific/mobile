import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import ChatHeader from '../components/headers/ChatHeader';
import MessagesList from '../components/messages/MessageList';
import ChatInput from '../components/messages/ChatInput';
import { COLORS } from '../constants';

type RootStackParamList = {
  Chat: undefined;
  ChatScreen: {
    id: number;
    displayName: string;
    lastMessageAt?: string;
    conversationType: string;
  };
};

type Props = NativeStackScreenProps<RootStackParamList, 'ChatScreen'>;

const ChatScreen = ({ route }: Props) => {
  const info = route.params;

  return (
    <View style={styles.mainContainer}>
      <ChatHeader
        id={info.id}
        displayName={info.displayName}
        lastMessageAt={info.lastMessageAt}
        conversationType={info.conversationType}
      />
      <MessagesList conversationType={info.conversationType} id={info.id} />
      <ChatInput conversationType={info.conversationType} id={info.id} />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
});
