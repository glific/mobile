import React, { useEffect, useState, useContext } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { useQuery } from '@apollo/client';

import { GET_MESSAGES } from '../../graphql/queries/Chat';
import { COLORS, SIZES } from '../../constants';
import Loading from '../ui/Loading';
import Message, { MessageType } from './Message';
import {
  MESSAGE_SENT_SUBSCRIPTION,
  MESSAGE_RECEIVED_SUBSCRIPTION,
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
    cachedConversations.search.forEach((conversation: any, index: number) => {
      if (conversation.group.id === collectionId) {
        conversationIndex = index;
      }
    });
  } else {
    cachedConversations.search.forEach((conversation: any, index: number) => {
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
    updatedConversation[0].messages.forEach((message: MessageType) => {
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
  const { user } = useContext(AuthContext);
  const [openVideo, setOpenVideo] = useState(false);
  const [openImage, setOpenImage] = useState(false);

  const [pageNo, setPageNo] = useState(1);
  const [noMoreItems, setNoMoreItems] = useState(false);

  const variables = {
    filter: { id: id, searchGroup: conversationType === 'collection' },
    contactOpts: { limit: 1 },
    messageOpts: { limit: 20, offset: 0 },
  };

  const subscriptionVariables = { organizationId: user?.organization?.id };

  const { loading, subscribeToMore, fetchMore, data } = useQuery(GET_MESSAGES, {
    variables,
    fetchPolicy: 'cache-and-network',
    onError(error) {
      console.log(error);
    },
  });

  useEffect(() => {
    if (subscribeToMore) {
      subscribeToMore({
        document: MESSAGE_RECEIVED_SUBSCRIPTION,
        variables: subscriptionVariables,
        updateQuery: (prev, { subscriptionData }) =>
          updateConversations(prev, subscriptionData, 'RECEIVED', id),
      });

      subscribeToMore({
        document: MESSAGE_SENT_SUBSCRIPTION,
        variables: subscriptionVariables,
        updateQuery: (prev, { subscriptionData }) =>
          updateConversations(prev, subscriptionData, 'SENT', id),
      });
    }
  }, [subscribeToMore]);

  if (loading) {
    return <Loading />;
  }

  const handleVideo = () => {
    setOpenVideo(!openVideo);
  };

  const handleImage = () => {
    setOpenImage(!openImage);
  };

  const handleLoadMore = () => {
    if (loading || noMoreItems) return;

    fetchMore({
      variables: {
        filter: variables.filter,
        contactOpts: variables.contactOpts,
        messageOpts: { limit: 20, offset: pageNo * 20 },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult?.search[0]?.messages?.length) {
          setNoMoreItems(true);
          return prev;
        } else {
          if (fetchMoreResult.search[0].messages.length < 20) setNoMoreItems(true);
          setPageNo(pageNo + 1);
          return {
            search: [
              {
                ...prev.search[0],
                messages: [...prev.search[0].messages, ...fetchMoreResult.search[0].messages],
              },
            ],
          };
        }
      },
    });
  };

  const renderItem = ({ item }) => (
    <Message
      key={`${item.messageNumber}${item.id}`}
      message={item}
      isLeft={conversationType === 'collection' ? false : item?.sender?.id === id}
      handleImage={handleImage}
      handleVideo={handleVideo}
      openImage={openImage}
      openVideo={openVideo}
    />
  );

  return (
    <FlatList
      style={styles.container}
      data={data?.search[0] ? data?.search[0]?.messages : []}
      renderItem={renderItem}
      initialNumToRender={10}
      ListEmptyComponent={!loading && <Text style={styles.emptyText}>No messages</Text>}
      inverted
      maxToRenderPerBatch={20}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.1}
    />
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
