import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { useQuery } from '@apollo/client';

import { COLORS, SCALE, SIZES } from '../constants';
import { RootStackParamList } from '../constants/types';
import { SAVED_SEARCH_QUERY } from '../graphql/queries/Search';
import SavedSearchBar from '../components/ui/SavedSearchBar';
import Loading from '../components/ui/Loading';

type Props = NativeStackScreenProps<RootStackParamList, 'SavedSearches'>;

const SavedSearches = ({ navigation }: Props) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const { loading, data: savedSearchData } = useQuery(SAVED_SEARCH_QUERY, {
    variables: {
      filter: { isReserved: false },
      opts: { limit: 20 },
    },
    onError(error) {
      console.log(error);
    },
  });

  const handleSelect = (search) => {
    navigation.navigate('Contacts', {
      name: 'savedSearch',
      variables: JSON.parse(search.args),
    });
  };

  const renderItem = ({ item, index }) => (
    <Pressable
      key={index}
      style={styles.item}
      onPress={() => handleSelect(item)}
      android_ripple={{ color: COLORS.primary10 }}
    >
      <MaterialIcons name="touch-app" size={24} color={COLORS.primary100} />
      <Text style={styles.name} key={item.id}>
        {item.label}
      </Text>
    </Pressable>
  );

  return (
    <>
      <FlatList
        data={savedSearchData?.savedSearches.filter((search) => search.label.includes(searchValue))}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={
          <SavedSearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
        }
        ListEmptyComponent={!loading && <Text style={styles.emptyText}>No Saved Searches</Text>}
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll={true}
        contentContainerStyle={styles.contentContainer}
        style={styles.mainContainer}
      />
      {loading && <Loading />}
    </>
  );
};

export default SavedSearches;

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
    textAlign: 'center',
  },
  item: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderBottomWidth: SCALE(0.25),
    borderColor: COLORS.darkGray,
    flexDirection: 'row',
    height: SIZES.s70,
    paddingHorizontal: SIZES.m20,
    width: '100%',
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    overflow: 'visible',
  },
  name: {
    color: COLORS.black,
    fontSize: SIZES.f16,
    marginLeft: SIZES.m16,
  },
});
