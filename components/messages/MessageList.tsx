import React, { useState, useRef } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { FakeMessage } from './Fakemessages';
import Message from './Message';

const MessagesList = ({ onSwipeToReply }: any) => {
  const [messages, setMessages] = useState(FakeMessage);

  const user = useRef(0);
  const scrollView = useRef();

  return (
    <ScrollView
      style={styles.container}
      ref={(ref) => (scrollView.current = ref)}
      onContentChange={() => {
        scrollView.current.scrollToEnd({ animated: true });
      }}
    >
      {messages.map((message, index) => (
        <Message
          key={index}
          time={message.time}
          isLeft={message.user !== user.current}
          message={message.content}
          onSwipe={onSwipeToReply}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
});

export default MessagesList;
