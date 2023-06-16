import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import SearchBar from '../components/ui/SearchBar';
import { GET_COLLECTIONS } from '../graphql/queries/Collection';
import CollectionCard from '../components/CollectionCard';
import { COLORS } from '../constants';

interface CollectionData {
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

type Props = NativeStackScreenProps<RootStackParamList, 'Collections'>;

const Collections = ({ navigation }: Props) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [collections, setCollections] = useState<CollectionData[]>([]);

  const variables = {
    filter: { term: searchValue, searchGroup: true },
    messageOpts: { limit: 1 },
    contactOpts: { limit: 10 },
  };
  const { loading, error, data } = useQuery(GET_COLLECTIONS, { variables });

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
      const newCollections: CollectionData[] = data.search.map((element: any) => {
        return {
          id: element.group?.id,
          name: element.group?.label || 'Unknown Name',
        };
      });

      setCollections(newCollections);
    }
  }, [data, error]);

  return (
    <FlatList
      data={collections}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <CollectionCard id={item.id} name={item.name} />}
      ListHeaderComponent={
        <SearchBar
          value={searchValue}
          setSearchValue={(value) => setSearchValue(value)}
          onSearch={onSearchHandler}
        />
      }
      stickyHeaderIndices={[0]}
      stickyHeaderHiddenOnScroll={true}
      style={styles.mainContainer}
    />
  );
};

export default Collections;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
});
