import React, { useState, useEffect, useContext } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery } from '@apollo/client';

import { COLORS, SIZES } from '../constants';
import Loading from '../components/ui/Loading';
import AuthContext from '../config/AuthContext';
import SearchBar from '../components/ui/SearchBar';
import ContactCard from '../components/ContactCard';
import { GET_CONTACTS } from '../graphql/queries/Contact';
import { ChatEntry, RootStackParamList } from '../constants/types';
import {
  MESSAGE_RECEIVED_SUBSCRIPTION,
  MESSAGE_SENT_SUBSCRIPTION,
} from '../graphql/subscriptions/Chat';
import LoadMoreFooter from '../components/ui/LoadMoreFooter';
import {
  getSubscriptionDetails,
  recordRequests,
  switchSubscriptionToRefetch,
} from '../utils/subscriptionDetails';

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

type Props = NativeStackScreenProps<RootStackParamList, 'Contacts'>;

const Chat = ({ navigation, route }: Props) => {
  const { user }: any = useContext(AuthContext);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchVariable, setSearchVariable] = useState({
    filter: {},
    messageOpts: { limit: 1 },
    contactOpts: { limit: 10, offset: 0 },
  });
  const [pageNo, setPageNo] = useState(1);
  const [noMoreItems, setNoMoreItems] = useState(false);

  const subscriptionVariables = { organizationId: user?.organization?.id };

  const { data, loading, refetch, fetchMore, subscribeToMore } = useQuery(GET_CONTACTS, {
    fetchPolicy: 'cache-and-network',
    variables: searchVariable,
    onError(error) {
      console.log(error);
    },
  });

  const contacts: ChatEntry[] = data?.search?.map((element: ContactElement) => {
    const messagesLength = element.messages?.length || 0;
    return {
      id: element.contact?.id,
      name: element.contact?.name ? element.contact.name : element.contact?.maskedPhone,
      lastMessageAt: element.contact?.lastMessageAt,
      lastMessage: messagesLength > 0 ? element.messages[messagesLength - 1]?.body : ' ',
      isOrgRead: element.contact?.isOrgRead,
    };
  });

  async function onSearchHandler() {
    refetch(searchVariable);
  }

  let refetchTimer: NodeJS.Timeout | null = null;
  let subscriptionToRefetchSwitchHappened = false;

  const handleSetSearchVariable = (variable: any) => {
    setPageNo(1);
    setNoMoreItems(false);
    setSearchVariable(variable);
  };

  const handleTiggerRefetch = () => {
    handleSetSearchVariable({
      filter: {},
      messageOpts: { limit: 1 },
      contactOpts: { limit: 10, offset: 0 },
    });
    onSearchHandler();
  };

  const updateContactList = (cachedConversations: any, subscriptionData: any, action: string) => {
    if (!subscriptionData.data || subscriptionToRefetchSwitchHappened) {
      return cachedConversations;
    }

    if (!cachedConversations.search) {
      return null;
    }

    // record all the incoming new conversation requests
    recordRequests();
    // determine if we should use subscriptions or refetch the query
    // if within 5 seconds there are more than equal to 15 new subscriptions
    // then instead of updating the conversation, it should directly refetch the top 20 conversations
    if (switchSubscriptionToRefetch() && !subscriptionToRefetchSwitchHappened) {
      // set the switch flag
      subscriptionToRefetchSwitchHappened = true;

      if (refetchTimer) {
        clearTimeout(refetchTimer);
      }

      refetchTimer = setTimeout(() => {
        // reset the switch flag
        subscriptionToRefetchSwitchHappened = false;
        handleTiggerRefetch();
      }, 2000);

      return cachedConversations;
    }

    const { newMessage, contactId, contact } = getSubscriptionDetails(action, subscriptionData);
    let conversationIndex = -1;

    cachedConversations.search.forEach((conversation: any, index: number) => {
      if (conversation.contact.id === contactId) {
        conversationIndex = index;
      }
    });

    const newMessageEntry = {
      id: newMessage.id,
      body: newMessage.body,
    };

    const cachedContacts = JSON.parse(JSON.stringify(cachedConversations));

    if (conversationIndex > -1) {
      // Contact exists, move it to index 0
      const existingConversation = cachedContacts.search[conversationIndex];
      cachedContacts.search.splice(conversationIndex, 1);
      cachedContacts.search.unshift(existingConversation);
      // Update the messages for the moved conversation
      cachedContacts.search[0].messages.push(newMessageEntry);
    } else {
      const newContactEntry = {
        messages: [newMessageEntry],
        contact: contact,
      };
      // Add the entry at position 0
      cachedContacts.search.unshift(newContactEntry);
    }
    return cachedContacts;
  };

  useEffect(() => {
    if (subscribeToMore) {
      subscribeToMore({
        document: MESSAGE_RECEIVED_SUBSCRIPTION,
        variables: subscriptionVariables,
        updateQuery: (prev, { subscriptionData }) =>
          updateContactList(prev, subscriptionData, 'RECEIVED'),
      });
      subscribeToMore({
        document: MESSAGE_SENT_SUBSCRIPTION,
        variables: subscriptionVariables,
        updateQuery: (prev, { subscriptionData }) =>
          updateContactList(prev, subscriptionData, 'SENT'),
      });
    }
  }, [subscribeToMore]);

  useEffect(() => {
    if (route.params && route.params.name === 'savedSearch') {
      handleSetSearchVariable(route.params.variables);
      onSearchHandler();
    }
  }, [route.params]);

  const handleLoadMore = () => {
    if (loading || isLoadingMore || noMoreItems) return;
    setIsLoadingMore(true);
    fetchMore({
      variables: {
        filter: searchVariable.filter,
        messageOpts: searchVariable.messageOpts,
        contactOpts: { ...searchVariable.contactOpts, offset: contacts.length },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult?.search?.length) {
          setNoMoreItems(true);
          return prev;
        } else {
          if (fetchMoreResult.search.length < 10) setNoMoreItems(true);
          setPageNo(pageNo + 1);
          setIsLoadingMore(false);
          return {
            search: [...prev.search, ...fetchMoreResult.search],
          };
        }
      },
    });
  };

  const renderItem = ({ item, index }) => (
    <ContactCard
      key={index}
      id={item.id}
      name={item.name}
      lastMessage={item.lastMessage}
      lastMessageAt={item.lastMessageAt}
      isOrgRead={item.isOrgRead}
      navigation={navigation}
    />
  );

  return (
    <>
      <FlatList
        accessibilityLabel={'notification-list'}
        data={contacts}
        keyExtractor={(item) => item.id + item.name}
        renderItem={renderItem}
        ListHeaderComponent={
          <SearchBar
            setSearchVariable={handleSetSearchVariable}
            onSearch={onSearchHandler}
            showMenu
            navigation={navigation}
          />
        }
        ListEmptyComponent={<>{!loading && <Text style={styles.emptyText}>No contact</Text>}</>}
        ListFooterComponent={<LoadMoreFooter loadingMore={isLoadingMore && !noMoreItems} />}
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll
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
