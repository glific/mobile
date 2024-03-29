import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useQuery } from '@apollo/client';

import Loading from '../components/ui/Loading';
import { COLORS, SIZES } from '../constants';
import { GET_COLLECTION_CONTACTS } from '../graphql/queries/Collection';

interface Props {
  route: {
    params: {
      id: string;
    };
  };
}
interface ContactProp {
  id: string;
  name: string;
  phone: string;
}

const CollectionContacts = ({ route }: Props) => {
  const { id: collectionId } = route.params;

  const { data, loading } = useQuery(GET_COLLECTION_CONTACTS, {
    variables: { id: collectionId },
    onError: (error) => {
      console.log(error);
    },
  });

  const ContactItem: React.FC<{ item: ContactProp }> = ({ item }) => {
    return (
      <View key={item.id} style={styles.contactContainer}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactPhone}>{item.phone}</Text>
      </View>
    );
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          accessibilityLabel={'contact-list'}
          style={styles.mainContainer}
          data={data.group.group.contacts}
          ListEmptyComponent={
            <>{!loading && <Text style={styles.placeholder}>No Contacts in this Colletion</Text>}</>
          }
          renderItem={({ item }) => <ContactItem item={item} />}
        />
      )}
    </>
  );
};

export default CollectionContacts;

const styles = StyleSheet.create({
  contactContainer: {
    borderBottomWidth: 1,
    borderColor: COLORS.darkGray,
    paddingHorizontal: SIZES.m12,
    paddingVertical: 10,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactPhone: {
    color: COLORS.darkGray,
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  placeholder: {
    color: COLORS.darkGray,
    fontSize: SIZES.f14,
    paddingVertical: SIZES.m24,
    textAlign: 'center',
  },
});
