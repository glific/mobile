import { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';
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
  mainContainer: {
    paddingVertical: 12,
    backgroundColor: 'white',
    borderTopWidth: 0.2,
    borderBottomWidth: 0.2,
    borderColor: COLORS.darkGray,
  },
  inputContainer: {
    width: '95%',
    flexDirection: 'row',
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0.75,
    borderColor: COLORS.darkGray,
    paddingHorizontal: 10,
  },
  icon: {
    color: COLORS.darkGray,
    marginHorizontal: 2,
  },
  input: {
    width: '85%',
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: 'white',
    fontSize: 16,
  },
});
