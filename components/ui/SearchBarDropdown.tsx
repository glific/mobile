import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Text,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { COLORS, SIZES, SCALE } from '../../constants';
import Loading from './Loading';

type SearchBarDropdownProps = {
  // eslint-disable-next-line no-unused-vars
  setSearchVariable: (search: object) => void;
  savedSearches: object[];
  searchValue: string;
  setSearchValue: (value: string) => void;
  selectedSearchId: string;
};

const SearchBarDropdown: React.FC<SearchBarDropdownProps> = ({
  setSearchVariable,
  savedSearches,
  searchValue,
  setSearchValue,
  selectedSearchId,
}) => {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => {
    setMenuVisible(false);
  };

  const handleSearch = (item) => {
    setSearchVariable(item);
    closeMenu();
  };

  const handleClear = () => {
    setSearchValue('');
    openMenu();
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputContainer}>
        <AntDesign testID="searchIcon" name="search1" style={styles.icon} />
        <TextInput
          testID="searchInput"
          style={styles.input}
          autoCapitalize="none"
          keyboardType="default"
          placeholder="Search"
          onChangeText={setSearchValue}
          onFocus={() => openMenu()}
          onBlur={() => closeMenu()}
          value={searchValue}
          cursorColor={COLORS.darkGray}
          selectionColor={COLORS.darkGray}
          underlineColorAndroid="transparent"
        />
        {searchValue !== '' && (
          <Pressable
            style={styles.iconButton}
            onPress={handleClear}
            android_ripple={{ color: COLORS.black005, borderless: true }}
          >
            <AntDesign testID="close" name="close" style={styles.clearIcon} />
          </Pressable>
        )}
      </View>
      {menuVisible && (
        <FlatList
          testID="menuCard"
          style={styles.menuContainer}
          data={savedSearches.filter((item) => item.label.includes(searchValue))}
          renderItem={({ item }) => (
            <Pressable
              key={item.id}
              onPress={() => handleSearch(item)}
              style={[styles.menu, item.id === selectedSearchId && styles.activeMenu]}
              android_ripple={{ color: COLORS.black005 }}
            >
              <Text style={styles.menuText}>{item.label}</Text>
            </Pressable>
          )}
          ListEmptyComponent={
            <View style={styles.menu}>
              <Text style={styles.menuText}>{'No option available'}</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

export default SearchBarDropdown;

const styles = StyleSheet.create({
  activeMenu: {
    backgroundColor: COLORS.primary10,
  },
  clearIcon: {
    color: COLORS.darkGray,
    fontSize: SIZES.f16,
    includeFontPadding: false,
    marginRight: SIZES.m10,
  },
  icon: {
    color: COLORS.darkGray,
    fontSize: SIZES.f20,
  },
  iconButton: {
    alignItems: 'center',
    borderRadius: SIZES.r20,
    height: SIZES.s24,
    justifyContent: 'center',
    marginRight: -SIZES.m8,
    width: SIZES.s24,
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
    backgroundColor: COLORS.white,
    borderColor: COLORS.darkGray,
    borderTopWidth: SCALE(0.2),
    height: SIZES.s40,
    justifyContent: 'center',
    paddingHorizontal: SIZES.m12,
  },
  menuContainer: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.r4,
    elevation: SIZES.r4,
    marginHorizontal: SIZES.m12,
    maxHeight: SCALE(250),
    overflow: 'hidden',
    position: 'absolute',
    shadowColor: COLORS.black,
    shadowOffset: { height: SIZES.r4, width: 0 },
    shadowRadius: SIZES.r4,
    top: SCALE(60),
    width: '100%',
    zIndex: 10,
  },
  menuText: {
    color: COLORS.black,
    fontSize: SIZES.f14,
  },
  modalBackground: {
    // height: SIZES.height,
    // position: 'absolute',
    // width: SIZES.width,
  },
});
