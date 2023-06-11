import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useQuery } from '@apollo/client';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import SearchBar from '../components/ui/SearchBar';
import Contact from '../components/ui/Contact';
import { GET_CONTACTS } from '../graphql/queries/Contact';

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
        <Contact
          id={item.id}
          name={item.name}
          lastMessage={item.lastMessage}
          lastMessageAt={item.lastMessageAt}
        />
      )}
      ListHeaderComponent={<SearchBar setSearchValue={(value) => setSearchValue(value)} />}
      stickyHeaderIndices={[0]}
      stickyHeaderHiddenOnScroll={true}
    />
  );
};

export default Chat;

const styles = StyleSheet.create({});
