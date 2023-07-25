import React, { useEffect, useContext, useState } from 'react';
import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
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
  return (
    <Pressable
      onPress={onPress}
      style={[styles.menu, active && styles.activeMenu]}
      android_ripple={{ color: COLORS.primary10 }}
    >
      <Text style={styles.menuText}>{label}</Text>
      <Text style={styles.menuText}>{countStr}</Text>
    </Pressable>
  );
};

type SearchBarProps = {
  // eslint-disable-next-line no-unused-vars
  setSearchVariable: (variables: object) => void;
  onSearch: () => void;
  showMenu?: boolean;
  collectionTab?: boolean;
};

const SearchBar: React.FC<SearchBarProps> = ({
  setSearchVariable,
  onSearch,
  showMenu = false,
  collectionTab = false,
}) => {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [searchValue, setSearchValue] = useState<string>('');
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [isAdvancedSearch, setIsAdvancedSearch] = useState<boolean>(false);
  const [fixedSearches, setFixedSearches] = useState([]);
  const [searchesCount, setSearchesCount] = useState({});
  const [selectedSearchId, setSelectedSearchId] = useState('1');

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const queryVariables = {
    filter: { isReserved: true },
    opts: {},
  };
  const { loading: menuLoading } = useQuery(SAVED_SEARCH_QUERY, {
    variables: queryVariables,
    onCompleted: (data) => {
      setFixedSearches(data.savedSearches);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const countVariables = { organizationId: user?.organization?.id };
  const { data: countData } = useQuery(SEARCHES_COUNT, { variables: countVariables });

  useEffect(() => {
    if (countData) {
      const collectionStats = JSON.parse(countData.collectionStats);
      if (collectionStats[countVariables.organizationId]) {
        setSearchesCount(collectionStats[countVariables.organizationId]);
      }
    }
  }, [countData]);

  const handleStatusSearch = (item: object) => {
    setSearchValue('');
    setIsAdvancedSearch(false);
    setSelectedSearchId(item.id);
    const variables = JSON.parse(item.args);
    setSearchVariable({
      ...variables,
      messageOpts: { limit: 1 },
      contactOpts: { limit: 10, offset: 0 },
    });
    closeMenu();
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
    closeMenu();
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
        <Pressable testID="menuIcon" onPress={openMenu} style={styles.menuIconContainer}>
          <Entypo name="dots-three-vertical" style={styles.menuIcon} />
        </Pressable>
      )}
      {menuVisible && (
        <>
          <Pressable onPress={closeMenu} style={styles.menuBackground} />
          <View style={styles.menuContainer} testID="menuCard">
            {menuLoading ? (
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
          </View>
        </>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  activeMenu: {
    backgroundColor: COLORS.primary10,
    borderRadius: SIZES.r4,
  },
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
    flex: 1,
    flexDirection: 'row',
    minWidth: '80%',
    paddingHorizontal: SIZES.m10,
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    borderBottomWidth: SCALE(0.2),
    borderColor: COLORS.darkGray,
    flexDirection: 'row',
    paddingHorizontal: SIZES.m12,
    paddingVertical: SIZES.m12,
    width: SIZES.width,
  },
  menu: {
    alignItems: 'center',
    flexDirection: 'row',
    height: SIZES.s40,
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.m12,
  },
  menuBackground: {
    height: SIZES.height,
    position: 'absolute',
    right: -0,
    top: -0,
    width: SIZES.width,
    zIndex: 10,
  },
  menuContainer: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.r4,
    elevation: SIZES.r4,
    paddingHorizontal: SIZES.m2,
    paddingVertical: SIZES.m8,
    position: 'absolute',
    right: SIZES.m16,
    shadowColor: COLORS.black,
    shadowOffset: { height: SIZES.r4, width: 0 },
    shadowRadius: SIZES.r4,
    top: SIZES.s60,
    width: SCALE(180),
    zIndex: 10,
  },
  menuIcon: {
    color: COLORS.darkGray,
    fontSize: SIZES.f16,
  },
  menuIconContainer: {
    alignItems: 'center',
    borderColor: COLORS.darkGray,
    borderRadius: SIZES.r10,
    borderWidth: SCALE(0.75),
    height: SCALE(45),
    justifyContent: 'center',
    marginLeft: SIZES.m6,
    width: SCALE(45),
  },
  menuText: {
    color: COLORS.black,
    fontSize: SIZES.f14,
  },
});
