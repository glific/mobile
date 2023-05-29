import React, { useRef } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { useQuery } from '@apollo/client';

import { GET_CONTACT_MESSAGES } from '../../graphql/queries/Contact';
import { COLORS } from '../../constants';
import LoadingPage from '../ui/Loading';
import Message from './Message';

type MessageListProps = {
  contact: {
    id: number;
    name: string;
  };
};

const MessagesList: React.FC<MessageListProps> = ({ contact }) => {
  const scrollView = useRef();

  const variables = {
    filter: { id: contact.id },
    contactOpts: { limit: 1 },
    messageOpts: { limit: 10, offset: 1 },
  };
  const { loading, error, data } = useQuery(GET_CONTACT_MESSAGES, { variables });

  if (error) {
    console.log(error);
  }

  return loading ? (
    <LoadingPage />
  ) : (
    <ScrollView
      style={styles.container}
      ref={(ref) => (scrollView.current = ref)}
      onContentChange={() => {
        scrollView.current.scrollToEnd({ animated: true });
      }}
    >
      {data?.search[0]?.messages.length ? (
        data.search[0].messages.map((message, index) => (
          <Message key={index} message={message} isLeft={message?.sender?.id === contact.id} />
        ))
      ) : (
        <Text>No messages</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
});

export default MessagesList;
