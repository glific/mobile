/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useContext } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { useQuery } from '@apollo/client';

import SearchBar from '../components/ui/SearchBar';
import ContactCard from '../components/ContactCard';
import { GET_CONTACTS } from '../graphql/queries/Contact';
import { COLORS, SIZES } from '../constants';
import { ChatEntry } from '../constants/types';
import Loading from '../components/ui/Loading';
import AuthContext from '../config/AuthContext';
import { MESSAGE_RECEIVED_SUBSCRIPTION, MESSAGE_SENT_SUBSCRIPTION } from '../graphql/subscriptions/Chat';

const updateContactList = (cachedConversations: any, subscriptionData: any, action: string) => {
  if (!subscriptionData.data) {
    return cachedConversations;
  }

  if (!cachedConversations) {
    return null;
  }

  let contactId:string;
  let id:string;
  let body;
  let contact;
  switch (action) {
    case 'RECEIVED':
      contactId = subscriptionData.data.receivedMessage.contact.id;
      id = subscriptionData.data.receivedMessage.id;
      body = subscriptionData.data.receivedMessage.body;
      contact = subscriptionData.data.receivedMessage.contact;
      break;
    case 'SENT':
      contactId = subscriptionData.data.sentMessage.contact.id;
      id = subscriptionData.data.sentMessage.id;
      body = subscriptionData.data.sentMessage.body;
      contact = subscriptionData.data.sentMessage.contact;
      break;
    default:
      return null;
  }

  let conversationIndex = -1;

  cachedConversations.search.forEach((conversation: any, index: any) => {
    if (conversation.contact.id === contactId) {
      conversationIndex = index;
    }
  });

  const newMessage = {
    id: id,
    body: body,
  };
  const newContactEntry = {
    messages: [newMessage],
    contact: contact,
  };
  const cache = JSON.parse(JSON.stringify(cachedConversations));

  if (conversationIndex > -1) {
    // Contact exists, move it to index 0
    const existingConversation = cache.search[conversationIndex];
    cache.search.splice(conversationIndex, 1);
    cache.search.unshift(existingConversation);
    // Update the messages for the moved conversation
    cache.search[0].messages.push(newMessage);
  } else {
    // Add the entry at position 0
    cache.search.unshift(newContactEntry);
  }
  return cache;
};

interface Contact {
  id: string;
  lastMessageAt: string | null;
  name: string | null;
  maskedPhone: string | null;
  isOrgRead: boolean;
}
interface Message {
  id: string;
  body: string;
}
interface ContactElement {
  contact?: Contact;
  messages: Message[];
}

const Chat = () => {
  const { user }: any = useContext(AuthContext);
  const [contacts, setContacts] = useState<ChatEntry[]>([]);
  const [searchVariable, setSearchVariable] = useState({
    filter: {},
    messageOpts: { limit: 1 },
    contactOpts: { limit: 10, offset: 0 },
  });
  const [pageNo, setPageNo] = useState(1);
  const [noMoreItems, setNoMoreItems] = useState(false);

  const subscriptionVariables = { organizationId: user?.organization?.id };

  const { loading, error, data, refetch, fetchMore, subscribeToMore } = useQuery(GET_CONTACTS, {
    fetchPolicy: 'cache-and-network',
    variables: searchVariable,
  });

  async function onSearchHandler() {
    refetch(searchVariable);
  }

  useEffect(() => {
    if (subscribeToMore) {
      subscribeToMore({
        document: MESSAGE_RECEIVED_SUBSCRIPTION,
        variables: subscriptionVariables,
        updateQuery: (prev, { subscriptionData }) => updateContactList(prev, subscriptionData, 'RECEIVED'),
      });
      subscribeToMore({
        document: MESSAGE_SENT_SUBSCRIPTION,
        variables: subscriptionVariables,
        updateQuery: (prev, { subscriptionData }) => updateContactList(prev, subscriptionData, 'SENT'),
      });
    }
  }, [subscribeToMore]);

  const handleSetSearchVariable = (variable:any) => {
    setPageNo(1);
    setNoMoreItems(false);
    setSearchVariable(variable);
  };

  useEffect(() => {
    if (error) console.log(error);

    if (!loading && data) {
      const newContacts: ChatEntry[] = data.search.map((element: ContactElement) => {
        const messagesLength = element.messages?.length || 0;
        return {
          id: element.contact?.id,
          name: element.contact?.name ? element.contact.name : element.contact?.maskedPhone,
          lastMessageAt: element.contact?.lastMessageAt,
          lastMessage: messagesLength > 0 ? element.messages[messagesLength - 1]?.body : ' ',
          isOrgRead: element.contact?.isOrgRead,
        };
      });

      setContacts(newContacts);
    }
  }, [data, error]);

  const handleLoadMore = () => {
    if (loading || noMoreItems) return;

    fetchMore({
      variables: {
        filter: searchVariable.filter,
        messageOpts: searchVariable.messageOpts,
        contactOpts: { ...searchVariable.contactOpts, offset: pageNo * 10 },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult?.search?.length) {
          setNoMoreItems(true);
          return prev;
        } else {
          if (fetchMoreResult.search.length < 10) setNoMoreItems(true);
          setPageNo(pageNo + 1);
          return {
            search: [...prev.search, ...fetchMoreResult.search],
          };
        }
      },
    });
  };

  return (
    <>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id + item.name}
        renderItem={({ item, index }) => (
          <ContactCard
            key={index}
            id={item.id}
            name={item.name}
            lastMessage={item.lastMessage}
            lastMessageAt={item.lastMessageAt}
            isOrgRead={item.isOrgRead}
          />
        )}
        ListHeaderComponent={
          <SearchBar
            setSearchVariable={handleSetSearchVariable}
            onSearch={onSearchHandler}
            showMenu
          />
        }
        ListEmptyComponent={() => !loading && <Text style={styles.emptyText}>No contact</Text>}
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll={true}
        style={styles.mainContainer}
        contentContainerStyle={styles.contentContainer}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
      />
      {loading && <Loading />}
    </>
  );
};

export default Chat;

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },
  emptyText: {
    alignSelf: 'center',
    color: COLORS.darkGray,
    fontSize: SIZES.f14,
    fontWeight: '500',
    marginTop: SIZES.m16,
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    overflow: 'visible',
  },
});
