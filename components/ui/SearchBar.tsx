import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import { AntDesign, Ionicons } from '@expo/vector-icons';

type SearchBarProps = {
  setSearchValue: () => void;
  width: string;
};

const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
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
      props.setSearchValue();
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
          style={[styles.input, { width: props.width }]}
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
    marginHorizontal: 2,
  },
  input: {
    backgroundColor: COLORS.white,
    fontSize: 16,
    paddingHorizontal: 6,
    paddingVertical: 8,
  },
  inputContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    borderColor: COLORS.darkGray,
    borderRadius: 10,
    borderWidth: 0.75,
    flexDirection: 'row',
    marginLeft: SIZES.s16,
    paddingHorizontal: 12,
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
