import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { useQuery } from '@apollo/client';

import SearchBar from '../components/ui/SearchBar';
import ContactCard from '../components/ContactCard';
import { GET_CONTACTS } from '../graphql/queries/Contact';
import { COLORS, SIZES } from '../constants';
import { ChatEntry } from '../constants/types';
import Loading from '../components/ui/Loading';

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
  const [contacts, setContacts] = useState<ChatEntry[]>([]);
  const [searchVariable, setSearchVariable] = useState({
    filter: {},
    messageOpts: { limit: 1 },
    contactOpts: { limit: 10, offset: 0 },
  });
  const [pageNo, setPageNo] = useState(1);
  const [noMoreItems, setNoMoreItems] = useState(false);

  const { loading, error, data, refetch, fetchMore } = useQuery(GET_CONTACTS, {
    fetchPolicy: 'network-only',
    variables: searchVariable,
  });

  async function onSearchHandler() {
    refetch(searchVariable);
  }

  const handleSetSearchVariable = (variable) => {
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
        ListEmptyComponent={<>{!loading && <Text style={styles.emptyText}>No contact</Text>}</>}
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
