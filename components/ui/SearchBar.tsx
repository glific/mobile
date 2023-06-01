import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import { AntDesign, Ionicons } from '@expo/vector-icons';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [filter, setFilter] = useState<string[]>([]);
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);

  function onSearch(enteredValue: string) {
    setSearchValue(enteredValue);
  }

  async function onSearchHandler() {
    try {
      if (searchValue == '') {
        return;
      }
      // TODO:
      // perform the search query
      console.log(searchValue);
    } catch (error: any) {
      // perform action when error
    }
  }

  function onFilter() {
    setIsFilterVisible(!isFilterVisible);
  }

  function onFilterHandler(newFilter: string) {
    setFilter((prev) => [...prev, newFilter]);
  }

  //Virtical 3 dots

  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputContainer}>
        <AntDesign
          testID="searchIcon"
          name="search1"
          size={20}
          style={styles.icon}
          onPress={onSearchHandler}
        />
        <TextInput
          testID="searchInput"
          style={styles.input}
          autoCapitalize="none"
          keyboardType="default"
          placeholder="Search"
          onChangeText={onSearch}
          value={searchValue}
          cursorColor={COLORS.darkGray}
          selectionColor={COLORS.darkGray}
          underlineColorAndroid="transparent"
        />
        <Ionicons
          testID="filterOutline"
          name="filter-outline"
          size={20}
          style={styles.icon}
          onPress={onFilter}
        />
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  icon: {
    color: COLORS.darkGray,
    fontSize: SIZES.f20,
  },
  input: {
    backgroundColor: COLORS.white,
    fontSize: 16,
    paddingHorizontal: 6,
    paddingVertical: 8,
    width: '85%',
  },
  inputContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    borderColor: COLORS.darkGray,
    borderRadius: 10,
    borderWidth: 0.75,
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginLeft: SIZES.s16,
    width: '85%',
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 0.2,
    borderColor: COLORS.darkGray,
    borderTopWidth: 0.2,
    flexDirection: 'row',
    paddingVertical: 12,
  },
});
