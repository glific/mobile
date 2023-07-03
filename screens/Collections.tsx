import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';

import SearchBar from '../components/ui/SearchBar';
import { GET_COLLECTIONS } from '../graphql/queries/Collection';
import CollectionCard from '../components/CollectionCard';
import { COLORS } from '../constants';
import { ChatEntry } from '../constants/types';

const Collections = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [collections, setCollections] = useState<ChatEntry[]>([]);

  const variables = {
    filter: { term: searchValue, searchGroup: true },
    messageOpts: { limit: 1 },
    contactOpts: { limit: 10 },
  };
  const { error, data } = useQuery(GET_COLLECTIONS, { variables });

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
      const newCollections: ChatEntry[] = data.search.map((element: any) => {
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
