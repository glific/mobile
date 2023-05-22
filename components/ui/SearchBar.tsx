import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Colors } from '../../constants/styles';
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
    <View style={styles.inputContainer}>
      <AntDesign
        testID="search1"
        name="search1"
        size={20}
        style={styles.icon}
        onPress={onSearchHandler}
      />
      <TextInput
        testID="Search Input"
        style={styles.input}
        autoCapitalize="none"
        keyboardType="default"
        placeholder="Search"
        onChangeText={onSearch}
        value={searchValue}
        cursorColor={Colors.darkGray}
        selectionColor={Colors.darkGray}
        underlineColorAndroid="transparent"
      />
      <Ionicons
        testID="filter-outline"
        name="filter-outline"
        size={20}
        style={styles.icon}
        onPress={onFilter}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  inputContainer: {
    width: '95%',
    marginVertical: 8,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0.75,
    borderColor: Colors.darkGray,
    paddingHorizontal: 10,
  },
  icon: {
    color: Colors.darkGray,
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
