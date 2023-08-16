import React, { useContext, useState } from 'react';
import { View, TextInput, StyleSheet, Pressable, Text, ScrollView } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useQuery } from '@apollo/client';

import { SAVED_SEARCH_QUERY, SEARCHES_COUNT } from '../../graphql/queries/Search';
import { RootStackParamList } from '../../constants/types';
import { numberToAbbreviation } from '../../utils/helper';
import { COLORS, SIZES, SCALE } from '../../constants';
import AuthContext from '../../config/AuthContext';
import Loading from './Loading';

interface MenuButtonProps {
  label: string;
  count: number;
  onPress: () => void;
  active: boolean;
}

const MenuButton: React.FC<MenuButtonProps> = ({ label, count, onPress, active }) => {
  const countStr = numberToAbbreviation(count);
  const activeStyle = (type: string) => {
    if (!active) return;
    return type === 'button'
      ? { backgroundColor: COLORS.primary400, borderWidth: 0 }
      : { color: COLORS.white };
  };

  return (
    <View style={styles.filterButtonWrapper}>
      <Pressable
        onPress={onPress}
        style={[styles.menu, activeStyle('button')]}
        android_ripple={{ color: COLORS.primary10, borderless: false }}
      >
        <Text style={[styles.menuText, activeStyle('text')]}>{label}</Text>
        <Text style={[styles.menuText, activeStyle('text')]}>({countStr})</Text>
      </Pressable>
    </View>
  );
};

type SearchBarProps = {
  // eslint-disable-next-line no-unused-vars
  setSearchVariable: (variables: object) => void;
  onSearch: () => void;
  showMenu?: boolean;
  collectionTab?: boolean;
  navigation?: NavigationProp<RootStackParamList>;
};

const SearchBar: React.FC<SearchBarProps> = ({
  setSearchVariable,
  onSearch,
  showMenu = false,
  collectionTab = false,
  navigation,
}) => {
  const { user } = useContext(AuthContext);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isAdvancedSearch, setIsAdvancedSearch] = useState<boolean>(false);
  const [fixedSearches, setFixedSearches] = useState([]);
  const [searchesCount, setSearchesCount] = useState({});
  const [selectedSearchId, setSelectedSearchId] = useState('1');

  const queryVariables = {
    filter: { isReserved: true },
    opts: {},
  };
  const { loading: loadingSearches } = useQuery(SAVED_SEARCH_QUERY, {
    skip: !showMenu,
    variables: queryVariables,
    onCompleted: (data) => {
      setFixedSearches(data.savedSearches);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const countVariables = { organizationId: user?.organization?.id };
  const { loading: loadingCounts } = useQuery(SEARCHES_COUNT, {
    skip: !showMenu,
    variables: countVariables,
    onCompleted(data) {
      const collectionStats = JSON.parse(data.collectionStats);
      if (collectionStats[countVariables.organizationId]) {
        setSearchesCount(collectionStats[countVariables.organizationId]);
      }
    },
  });

  const handleStatusSearch = (item: object) => {
    setSelectedSearchId(item.id);
    setSearchValue('');
    setIsAdvancedSearch(false);
    const variables = JSON.parse(item.args);
    setSearchVariable({
      ...variables,
      messageOpts: { limit: 1 },
      contactOpts: { limit: 10, offset: 0 },
    });
    onSearch();
  };

  const handleTermSearch = () => {
    setSelectedSearchId('0');
    setIsAdvancedSearch(false);
    setSearchVariable({
      filter: { term: searchValue, searchGroup: collectionTab },
      messageOpts: { limit: 1 },
      contactOpts: { limit: 10, offset: 0 },
    });
    onSearch();
  };

  const handleAdvanceSearch = (variables: object) => {
    setSearchValue('');
    setSelectedSearchId('0');
    setIsAdvancedSearch(true);
    setSearchVariable(variables);
    onSearch();
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputContainer}>
        <AntDesign
          testID="searchIcon"
          name="search1"
          style={styles.icon}
          onPress={handleTermSearch}
        />
        <TextInput
          testID="searchInput"
          style={styles.input}
          autoCapitalize="none"
          keyboardType="default"
          placeholder="Search"
          onChangeText={setSearchValue}
          value={searchValue}
          cursorColor={COLORS.darkGray}
          selectionColor={COLORS.darkGray}
          underlineColorAndroid="transparent"
          onSubmitEditing={handleTermSearch}
        />
        {showMenu && (
          <View>
            <Ionicons
              testID="filterIcon"
              name="filter-outline"
              style={[styles.icon, isAdvancedSearch && { color: COLORS.primary100 }]}
              onPress={() =>
                navigation.navigate('ConversationFilter', { onGoBack: handleAdvanceSearch })
              }
            />
            {isAdvancedSearch && <View style={styles.advancedSearchActive} />}
          </View>
        )}
      </View>
      {showMenu && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.menuContainer}
          testID="filtersContainer"
        >
          {loadingCounts || loadingSearches ? (
            <Loading size={'small'} color={COLORS.darkGray} />
          ) : (
            <>
              {fixedSearches.map((item) => (
                <MenuButton
                  key={item.id}
                  label={item.shortcode}
                  count={searchesCount[item.shortcode] ? searchesCount[item.shortcode] : 0}
                  onPress={() => handleStatusSearch(item)}
                  active={item.id === selectedSearchId}
                />
              ))}
            </>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  advancedSearchActive: {
    backgroundColor: COLORS.primary100,
    borderColor: COLORS.white,
    borderRadius: SIZES.r10,
    borderWidth: SIZES.m2,
    height: SIZES.m10,
    position: 'absolute',
    right: -SIZES.m2,
    top: 0,
    width: SIZES.m10,
  },
  filterButtonWrapper: {
    borderRadius: SIZES.r20,
    marginRight: SIZES.m4,
    overflow: 'hidden',
  },
  icon: {
    color: COLORS.darkGray,
    fontSize: SIZES.f20,
  },
  input: {
    backgroundColor: COLORS.white,
    flex: 1,
    fontSize: SIZES.f16,
    paddingHorizontal: SIZES.m6,
    paddingVertical: SIZES.m8,
  },
  inputContainer: {
    alignItems: 'center',
    borderColor: COLORS.darkGray,
    borderRadius: SIZES.r10,
    borderWidth: SCALE(0.75),
    flexDirection: 'row',
    minWidth: '80%',
    paddingHorizontal: SIZES.m10,
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    borderBottomWidth: SCALE(0.2),
    borderColor: COLORS.darkGray,
    padding: SIZES.m12,
    width: SIZES.width,
  },
  menu: {
    alignItems: 'center',
    borderColor: COLORS.darkGray,
    borderRadius: SIZES.r20,
    borderWidth: 0.75,
    columnGap: SIZES.m2,
    flexDirection: 'row',
    height: SIZES.s30,
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.m12,
  },
  menuContainer: {
    paddingTop: SIZES.m8,
    width: '100%',
  },
  menuText: {
    color: COLORS.darkGray,
    fontSize: SIZES.f12,
    fontWeight: '500',
    includeFontPadding: false,
  },
});
