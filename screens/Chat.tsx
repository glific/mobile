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
    contactOpts: { limit: 10 },
  });

  const { loading, error, data, refetch } = useQuery(GET_CONTACTS, { variables: searchVariable });

  async function onSearchHandler() {
    refetch(searchVariable);
  }

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (data) {
      const newContacts: ChatEntry[] = data.search.map((element: ContactElement) => {
        const messagesLength = element.messages?.length || 0;
        return {
          id: element.contact?.id,
          name: element.contact?.name || element.contact?.maskedPhone,
          lastMessageAt: element.contact?.lastMessageAt,
          lastMessage: messagesLength > 0 ? element.messages[messagesLength - 1]?.body : ' ',
        };
      });

      setContacts(newContacts);
    }
  }, [data, error]);

  return (
    <FlatList
      data={contacts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ContactCard
          id={item.id}
          name={item.name}
          lastMessage={item.lastMessage}
          lastMessageAt={item.lastMessageAt}
        />
      )}
      ListHeaderComponent={
        <>
          <SearchBar setSearchVariable={setSearchVariable} onSearch={onSearchHandler} showMenu />
          {loading && <Loading />}
        </>
      }
      ListEmptyComponent={() => !loading && <Text style={styles.emptyText}>No contact</Text>}
      stickyHeaderIndices={[0]}
      stickyHeaderHiddenOnScroll={true}
      style={styles.mainContainer}
      contentContainerStyle={styles.contentContainer}
    />
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
