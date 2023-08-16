import React, { useState } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery } from '@apollo/client';

import { RootStackParamList } from '../constants/types';
import { COLORS, SIZES } from '../constants';
import Loading from '../components/ui/Loading';
import SearchBar from '../components/ui/SearchBar';
import CollectionCard from '../components/CollectionCard';
import { GET_COLLECTIONS } from '../graphql/queries/Collection';

type Props = NativeStackScreenProps<RootStackParamList, 'Collections'>;

const Collections = ({ navigation }: Props) => {
  const [searchVariable, setSearchVariable] = useState({
    filter: { searchGroup: true },
    messageOpts: { limit: 1 },
    contactOpts: { limit: 10, offset: 0 },
  });
  const [pageNo, setPageNo] = useState(1);
  const [noMoreItems, setNoMoreItems] = useState(false);

  const {
    loading,
    refetch,
    fetchMore,
    data: collectionsData,
  } = useQuery(GET_COLLECTIONS, {
    variables: searchVariable,
    onError(error) {
      console.log(error);
    },
  });

  async function onSearchHandler() {
    refetch(searchVariable);
  }

  const handleSetSearchVariable = (variable) => {
    setPageNo(1);
    setNoMoreItems(false);
    setSearchVariable(variable);
  };

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

  const renderItem = ({ item }) => {
    return (
      <CollectionCard
        key={item.group.id}
        id={item.group.id}
        name={item.group.label ? item.group.label : 'Unknown Name'}
        navigation={navigation}
      />
    );
  };

  return (
    <>
      <FlatList
        extraData={pageNo}
        keyExtractor={(item) => item.group.id}
        accessibilityLabel={'notification-list'}
        data={collectionsData?.search}
        renderItem={renderItem}
        ListHeaderComponent={
          <SearchBar
            setSearchVariable={handleSetSearchVariable}
            onSearch={onSearchHandler}
            collectionTab
            navigation={navigation}
          />
        }
        ListEmptyComponent={!loading && <Text style={styles.emptyText}>No collection</Text>}
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll
        style={styles.mainContainer}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
      />
      {loading && <Loading />}
    </>
  );
};

export default Collections;

const styles = StyleSheet.create({
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
  },
});
