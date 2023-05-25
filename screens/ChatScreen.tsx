import { StyleSheet, Text, View } from 'react-native';
import { useLayoutEffect, useState, useEffect } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery } from '@apollo/client';

import ChatHeader from '../components/messages/ChatHeader';
import MessagesList from '../components/messages/MessageList';
import ChatInput from '../components/messages/ChatInput';
import { GET_CONTACTS } from '../graphql/queries/Contact';
import LoadingPage from '../components/ui/Loading';

type RootStackParamList = {
  Chat: undefined;
  ChatScreen: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'ChatScreen'>;

const ChatScreen = ({ navigation }: Props) => {
  const [userData, setUserData] = useState({ name: '', online: true });
  const [reply, setReply] = useState('');
  const [isLeft, setIsLeft] = useState(false);

  const variables = {
    filter: { id: '21' },
    contactOpts: { limit: 1 },
    messageOpts: { limit: 20, offset: 1 },
  };

  const { loading, error, data } = useQuery(GET_CONTACTS, { variables });

  useEffect(() => {
    if (error) {
      console.log(error);
    } else if (data) {
      setUserData((prev) => ({ ...prev, name: data?.search[0].contact.name }));
    }
  }, [data, error]);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <ChatHeader userData={userData} />,
    });
  }, [navigation, userData]);

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
        <MessagesList onSwipeToReply={swipeToReply} />
        <ChatInput reply={reply} isLeft={isLeft} closeReply={closeReply} username="username" />
      </View>
      {loading && <LoadingPage />}
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
