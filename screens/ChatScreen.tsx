import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import ChatHeader from '../components/messages/ChatHeader';
import MessagesList from '../components/messages/MessageList';
import ChatInput from '../components/messages/ChatInput';
import { COLORS, SIZES } from '../constants';

type RootStackParamList = {
  Chat: undefined;
  ChatScreen: {
    contact: {
      id: number;
      name: string;
    };
  };
};

type Props = NativeStackScreenProps<RootStackParamList, 'ChatScreen'>;

const ChatScreen = ({ navigation, route }: Props) => {
  const { contact } = route.params;
  const [reply, setReply] = useState(null);

  const swipeToReply = (message: any) => {
    setReply(message);
  };

  const closeReply = () => {
    setReply(null);
  };

  return (
    <>
      <ChatHeader contact={contact} />
      <View style={styles.mainContainer}>
        <View style={styles.item}>
          <Text style={styles.time}>Time left: 24</Text>
        </View>
        <MessagesList contact={contact} onSwipeToReply={swipeToReply} />
        <ChatInput reply={reply} closeReply={closeReply} />
      </View>

      <MessagesList onSwipeToReply={swipeToReply} />
      <View>
      <ChatInput reply={reply} isLeft={isLeft} closeReply={closeReply} username="username" />
      </View>
    </View>
    </>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: SIZES.m6,
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  time: {
    fontSize: SIZES.f14,
  },
});
