import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import ChatHeader from '../components/messages/ChatHeader';
import MessagesList from '../components/messages/MessageList';
import ChatInput from '../components/messages/ChatInput';
import { COLORS, SIZES } from '../constants';

const getSessionTimeLeft = (time) => {
  const currentTime = new Date();
  const lastMessageTime = new Date(time);
  const timeDifference = lastMessageTime.getTime() + 24 * 60 * 60 * 1000 - currentTime.getTime();
  let hours = Math.max(Math.ceil(timeDifference / (1000 * 60 * 60)), 0);
  hours = Math.min(hours, 24);
  return hours;
};

type RootStackParamList = {
  Chat: undefined;
  ChatScreen: {
    contact: {
      id: number;
      name: string;
      lastMessageAt: string;
    };
  };
};

type Props = NativeStackScreenProps<RootStackParamList, 'ChatScreen'>;

const ChatScreen = ({ route }: Props) => {
  const { contact } = route.params;

  return (
    <>
      <ChatHeader contact={contact} />
      <View style={styles.mainContainer}>
        <View style={styles.item}>
          <Text style={styles.time}>Time left: {getSessionTimeLeft(contact.lastMessageAt)}</Text>
        </View>
        <MessagesList contact={contact} />
        <ChatInput contact={contact} />
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
