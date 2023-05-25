import { StyleSheet, Text, View } from 'react-native';
import { useLayoutEffect, useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import ChatHeader from '../components/messages/ChatHeader';
import MessagesList from '../components/messages/MessageList';
import ChatInput from '../components/messages/ChatInput';

type RootStackParamList = {
  Chat: undefined;
  ChatScreen: {
    contact: {
      id: number;
      contactName: string;
    };
  };
};

type Props = NativeStackScreenProps<RootStackParamList, 'ChatScreen'>;

const ChatScreen = ({ navigation, route }: Props) => {
  const { contact } = route.params;
  const [reply, setReply] = useState('');
  const [isLeft, setIsLeft] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <ChatHeader userData={contact} />,
    });
  }, [navigation]);

  const swipeToReply = (message: string, isLeft: boolean) => {
    setReply(message.length > 50 ? message.slice(0, 50) + '...' : message);
    setIsLeft(isLeft);
  };

  const closeReply = () => {
    setReply('');
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <View style={styles.item}>
          <Text style={styles.time}>Time left: 24</Text>
        </View>
        <MessagesList onSwipeToReply={swipeToReply} userData={contact} />
        <ChatInput reply={reply} isLeft={isLeft} closeReply={closeReply} username="username" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#F2F2F2',
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ChatScreen;
