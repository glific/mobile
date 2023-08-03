import React, { useEffect, useRef, useState, useContext } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { useQuery } from '@apollo/client';

import { GET_MESSAGES } from '../../graphql/queries/Chat';
import { COLORS, SIZES } from '../../constants';
import LoadingPage from '../ui/Loading';
import Message from './Message';
import {
  MESSAGE_RECEIVED_SUBSCRIPTION,
  MESSAGE_SENT_SUBSCRIPTION,
} from '../../graphql/subscriptions/Chat';
import AuthContext from '../../config/AuthContext';
import { getSubscriptionDetails } from '../../utils/subscriptionDetails';

type MessageListProps = {
  id: number;
  conversationType: string;
};

const updateConversations = (
  cachedConversations: any,
  subscriptionData: any,
  action: string,
  id: any
) => {
  // if there is no message data then return previous conversations
  // or if the chat of sender is not open on the screen
  // then don't update the cache

  if (!subscriptionData.data) {
    return cachedConversations;
  }
  // let's return early incase we don't have cached conversations

  if (!cachedConversations) {
    return null;
  }

  const { newMessage, contactId, collectionId, messageStatusData } = getSubscriptionDetails(
    action,
    subscriptionData
  );

  if (contactId !== id) {
    return null;
  }

  // loop through the cached conversations and find if contact exists
  let conversationIndex = 0;

  if (action === 'COLLECTION') {
    cachedConversations.search.forEach((conversation: any, index: any) => {
      if (conversation.group.id === collectionId) {
        conversationIndex = index;
      }
    });
  } else {
    cachedConversations.search.forEach((conversation: any, index: any) => {
      if (conversation.contact.id === contactId) {
        conversationIndex = index;
      }
    });
  }

  // we need to handle 2 scenarios:
  // 1. Add new message if message is sent or received
  // let's start by parsing existing conversations
  const updatedConversations = JSON.parse(JSON.stringify(cachedConversations));
  let updatedConversation = updatedConversations.search;

  // get the conversation for the contact that needs to be updated
  updatedConversation = updatedConversation.splice(conversationIndex, 1);

  // update contact last message at when receiving a new Message
  if (action === 'RECEIVED') {
    updatedConversation[0].contact.lastMessageAt = newMessage.insertedAt;
  }

  // Add new message and move the conversation to the top
  if (newMessage) {
    updatedConversation[0].messages.unshift(newMessage);
  } else {
    updatedConversation[0].messages.forEach((message: any) => {
      if (messageStatusData && message.id === messageStatusData.id) {
        message.errors = messageStatusData.errors;
      }
    });
  }

  // update the conversations
  updatedConversations.search = [...updatedConversation, ...updatedConversations.search];

  // return the updated object
  const returnConversations = { ...cachedConversations, ...updatedConversations };
  return returnConversations;
};

const MessagesList: React.FC<MessageListProps> = ({ conversationType, id }) => {
  const { user }: any = useContext(AuthContext);
  const scrollView = useRef<ScrollView>(null);
  const [openVideo, setOpenVideo] = useState(false);
  const [openImage, setOpenImage] = useState(false);

  const variables = {
    filter: { id: id, searchGroup: conversationType === 'collection' },
    contactOpts: { limit: 1 },
    messageOpts: { limit: 20 },
  };

  const subscriptionVariables = { organizationId: user?.organization?.id };

  const { loading, error, data, subscribeToMore } = useQuery(GET_MESSAGES, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (subscribeToMore) {
      subscribeToMore({
        document: MESSAGE_RECEIVED_SUBSCRIPTION,
        variables: subscriptionVariables,
        updateQuery: (prev, { subscriptionData }) =>
          updateConversations(prev, subscriptionData, 'RECEIVED', id),
      });

      // message sent subscription
      subscribeToMore({
        document: MESSAGE_SENT_SUBSCRIPTION,
        variables: subscriptionVariables,
        updateQuery: (prev, { subscriptionData }) =>
          updateConversations(prev, subscriptionData, 'SENT', id),
      });
    }
  }, [subscribeToMore]);

  if (error) {
    console.log(error);
  }

  if (loading) {
    return <LoadingPage />;
  }

  let dataArray = [];
  if (data && data.search && data.search[0] && data.search[0].messages) {
    dataArray = [...data.search[0].messages].reverse();
  }
  const handleVideo = () => {
    setOpenVideo(!openVideo);
  };

  const handleImage = () => {
    setOpenImage(!openImage);
  };

  return (
    <ScrollView
      style={styles.container}
      ref={scrollView}
      onContentSizeChange={() => {
        scrollView.current?.scrollToEnd({ animated: true });
      }}
    >
      {dataArray.length ? (
        dataArray.map((message, index) => (
          <Message
            key={index}
            message={message}
            isLeft={conversationType === 'collection' ? false : message?.sender?.id === id}
            handleImage={handleImage}
            handleVideo={handleVideo}
            openImage={openImage}
            openVideo={openVideo}
          />
        ))
      ) : (
        <Text style={styles.emptyText}>No messages</Text>
      )}
    </ScrollView>
  );
};

export default MessagesList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    marginBottom: SIZES.m65,
  },
  emptyText: {
    alignSelf: 'center',
    color: COLORS.darkGray,
    fontSize: SIZES.f14,
    fontWeight: '500',
    marginTop: SIZES.m16,
  },
});
