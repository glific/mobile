import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { useQuery } from '@apollo/client';

import { GET_CONTACT_MESSAGES } from '../../graphql/queries/Contact';
import LoadingPage from '../ui/Loading';
import Message from './Message';

const MessagesList = ({ onSwipeToReply, userData }: any) => {
  const [messages, setMessages] = useState([]);

  const variables = {
    filter: { id: userData.id },
    contactOpts: { limit: 1 },
    messageOpts: { limit: 10, offset: 1 },
  };
  const { loading, error, data } = useQuery(GET_CONTACT_MESSAGES, { variables });
  


  useEffect(() => {
    if (error) {
      console.log(error);
    } else if (data) {
      setMessages(data.search[0].messages)
    }
  }, [error, data])
  

  const user = useRef(0);
  const scrollView = useRef();

  return (
      loading ? <LoadingPage /> :
        <ScrollView
          style={styles.container}
          ref={(ref) => (scrollView.current = ref)}
          onContentChange={() => {
            scrollView.current.scrollToEnd({ animated: true });
          }}
        >
          {messages.length? 
            messages.map((message, index) => (
              <Message
                key={index}
                time={message.insertedAt}
                isLeft={message.id !== userData.id}
                message={message.body}
                onSwipe={onSwipeToReply}
              />
            ))
          :
          <Text>No messages</Text>
          }
        </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default MessagesList;
