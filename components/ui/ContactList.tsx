import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';

import Contact from './Contact';
import Loading from './Loading';
import { GET_CONTACTS } from '../../graphql/queries/Contact';

interface ContactListProps {
  navigation: any;
  messagesLength: number;
  info: string;
}

const ContactList: React.FC<ContactListProps> = ({ info }) => {
  const variables = {
    filter: { term: info },
    messageOpts: { limit: 3, offset: 0 },
    contactOpts: { limit: 10, offset: 0 },
  };
  const { loading, error, data } = useQuery(GET_CONTACTS, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  if (error) {
    console.log(error);
  }

  let contacts = [];
  if (data) {
    contacts = data.search.map((element: any) => {
      const messagesLength = element.messages?.length;
      return {
        id: element.contact?.id,
        name: element.contact?.name || element.contact?.maskedPhone,
        lastMessageAt: element.contact?.lastMessageAt,
        lastMessage: messagesLength > 0 && element.messages[messagesLength - 1]?.body,
      };
    });
  }

  return (
    <View style={styles.contactList}>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Contact {...item} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contactList: {
    flex: 1,
    marginBottom: 20,
  },
});

export default ContactList;
