import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useQuery } from '@apollo/client';

import SearchBar from '../components/ui/SearchBar';
import { COLORS, SCALE, SIZES } from '../constants';
import { SAVED_SEARCH_QUERY } from '../graphql/queries/Search';
import Loading from '../components/ui/Loading';

const SavedSearches = () => {
  const [savedSearch, setSavedSearch] = useState([]);
  const [searchVariable, setSearchVariable] = useState({
    filter: {},
    opts: { limit: 10 },
  });

  const { loading, error, data, refetch } = useQuery(SAVED_SEARCH_QUERY, {
    variables: searchVariable,
  });

  async function onSearchHandler() {
    refetch(searchVariable);
  }

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (data) {
      setSavedSearch(data.savedSearches);
    }
  }, [data, error]);

  return (
    <>
      <FlatList
        data={savedSearch}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name} key={item.id}>
              {item.label}
            </Text>
          </View>
        )}
        ListHeaderComponent={
          <SearchBar setSearchVariable={setSearchVariable} onSearch={onSearchHandler} />
        }
        ListEmptyComponent={() =>
          !loading && <Text style={styles.emptyText}>No Saved Searches</Text>
        }
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll={true}
        style={styles.mainContainer}
      />
      {loading && <Loading />}
    </>
  );
};

export default SavedSearches;

const styles = StyleSheet.create({
  emptyText: {
    alignSelf: 'center',
    color: COLORS.darkGray,
    fontSize: SIZES.f14,
    fontWeight: '500',
    marginTop: SIZES.m16,
  },
  item: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderBottomWidth: SCALE(0.25),
    borderColor: COLORS.darkGray,
    flexDirection: 'row',
    height: SIZES.s70,
    paddingHorizontal: '4%',
    width: '100%',
  },
  name: {
    color: COLORS.black,
    fontSize: SIZES.f16,
    fontWeight: '600',
    marginLeft: SIZES.m16,
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
});
