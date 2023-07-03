import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';

import SearchBar from '../components/ui/SearchBar';
import ContactCard from '../components/ContactCard';
import { GET_CONTACTS } from '../graphql/queries/Contact';
import { COLORS } from '../constants';
import { ChatEntry } from '../constants/types';

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
  const [searchValue, setSearchValue] = useState<string>('');
  const [contacts, setContacts] = useState<ChatEntry[]>([]);

  const variables = {
    filter: { term: searchValue },
    messageOpts: { limit: 1 },
    contactOpts: { limit: 10 },
  };
  const { error, data } = useQuery(GET_CONTACTS, { variables });

  async function onSearchHandler() {
    try {
      if (searchValue == '') return;

      // TODO:
      console.log(searchValue);
    } catch (error) {
      console.log(error);
    }
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
        <SearchBar
          value={searchValue}
          setSearchValue={(value) => setSearchValue(value)}
          onSearch={onSearchHandler}
          showMenu
        />
      }
      stickyHeaderIndices={[0]}
      stickyHeaderHiddenOnScroll={true}
      style={styles.mainContainer}
    />
  );
};

export default Chat;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
});
