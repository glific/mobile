import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { COLORS } from '../constants';
import { RootStackParamList } from '../constants/types';
import ChatInput from '../components/messages/ChatInput';
import ChatHeader from '../components/headers/ChatHeader';
import MessagesList from '../components/messages/MessageList';

type Props = NativeStackScreenProps<RootStackParamList, 'ChatScreen'>;

const ChatScreen = ({ navigation, route }: Props) => {
  const info = route.params;

  return (
    <View style={styles.mainContainer}>
      <ChatHeader
        id={info.id}
        displayName={info.displayName}
        lastMessageAt={info.lastMessageAt}
        conversationType={info.conversationType}
        navigation={navigation}
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
