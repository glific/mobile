import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import SearchBar from '../components/ui/SearchBar';
import ContactCard from '../components/ui/ContactCard';
import { GET_CONTACTS } from '../graphql/queries/Contact';
import { COLORS } from '../constants';
import Loading from '../components/ui/Loading';

interface ContactData {
  id: string;
  name: string;
  lastMessageAt: string;
  lastMessage: string | undefined;
}

type RootStackParamList = {
  Contacts: undefined;
  Collections: undefined;
  SavedSearches: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Contacts'>;

const Chat = ({ navigation }: Props) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [contacts, setContacts] = useState<ContactData[]>([]);

  const variables = {
    filter: { term: searchValue },
    messageOpts: { limit: 1 },
    contactOpts: { limit: 10 },
  };
  const { loading, error, data } = useQuery(GET_CONTACTS, { variables });

  async function onSearchHandler() {
    try {
      if (searchValue == '') return;

      // TODO:
      console.log(searchValue);
    } catch (error: any) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (data) {
      const newContacts: ContactData[] = data.search.map((element: any) => {
        const messagesLength = element.messages?.length;
        return {
          id: element.contact?.id,
          name: element.contact?.name || element.contact?.maskedPhone,
          lastMessageAt: element.contact?.lastMessageAt,
          lastMessage: messagesLength > 0 && element.messages[messagesLength - 1]?.body,
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
