import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import { AntDesign, Ionicons } from '@expo/vector-icons';

type SearchBarProps = {
  setSearchValue: () => void;
};

const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
interface SearchBarProps {
  onSearch: () => void;
  onFilter: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onFilter }) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [filter, setFilter] = useState<string[]>([]);
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);

  function handleSearch(enteredValue: string) {
    setSearchValue(enteredValue);
  }

  async function handleSearchAction() {
    try {
      if (searchValue === '') {
        return;
      }
      // TODO:
      props.setSearchValue();
    } catch (error: any) {
      // perform action when error
    }
  }

  function toggleFilterVisibility() {
    setIsFilterVisible(!isFilterVisible);
  }

  function handleFilter() {
    onFilter();
  }

  function onFilterHandler(newFilter: string) {
    setFilter((prev) => [...prev, newFilter]);
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputContainer}>
        <View testID="searchIcon">
          <AntDesign
            name="search1"
            size={20}
            style={styles.icon}
            onPress={handleSearchAction}
          />
        </View>
        <TextInput
          testID="searchInput"
          style={styles.input}
          autoCapitalize="none"
          keyboardType="default"
          placeholder="Search"
          onChangeText={handleSearch}
          value={searchValue}
          cursorColor={COLORS.darkGray}
          selectionColor={COLORS.darkGray}
          underlineColorAndroid="transparent"
        />
        <View testID="filterOutline">
          <Ionicons
            name="filter-outline"
            size={20}
            style={styles.icon}
            onPress={handleFilter}
          />
        </View>
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  icon: {
    color: COLORS.darkGray,
    marginHorizontal: SIZES.m2,
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
    paddingHorizontal: 10,
    width: '95%',
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 0.2,
    borderColor: COLORS.darkGray,
    borderTopWidth: 0.2,
    paddingVertical: 12,
  },
});
