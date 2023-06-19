import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Pressable, Text, Dimensions } from 'react-native';
import { COLORS, SCALE, SIZES } from '../../constants';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';

type SearchBarProps = {
  setSearchValue: () => void;
  width: string;
  showMenu: Boolean;
};

const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [filter, setFilter] = useState<string[]>([]);
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

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

  // function onFilterHandler(newFilter: string) {
  //   setFilter((prev) => [...prev, newFilter]);
  // }
  interface FilterButtonProps {
    label: string;
    count: number;
  }

  const FilterButton: React.FC<FilterButtonProps> = ({ label, count }) => {
    const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
    return (
      <Pressable
        onPress={() => console.log('')}
        style={styles.filter}
        android_ripple={{ color: COLORS.primary10 }}
      >
        <Text style={styles.filterText}>{label}</Text>
        <Text style={styles.filterText}>{`(${count})`}</Text>
      </Pressable>
    );
  };

  const menuPress = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

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
      {props.showMenu && (
        <Pressable
          onPress={menuPress}
          testID="menuButton"
          style={styles.iconContainer}
          android_ripple={{ borderless: true }}
        >
          <Entypo name="dots-three-vertical" style={styles.icon} />
        </Pressable>
      )}
      {menuVisible && (
        <>
          <Pressable onPress={closeMenu} style={styles.filterBackground} />
          <View style={styles.filtersContainer} testID="menuId">
            <FilterButton label="All" count={1} />
            <FilterButton label="Unread" count={4} />
            <FilterButton label="Not responded" count={35} />
            <FilterButton label="Opt in" count={0} />
            <FilterButton label="Opt out" count={10} />
          </View>
        </>
      )}
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
  filterText: {
    color: COLORS.black,
    fontSize: SIZES.f16,
  },
  inputContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
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
    paddingRight: 20,
  },
  filterBackground: {
    height: SIZES.height + 100,
    position: 'absolute',
    right: -10,
    top: -40,
    width: Dimensions.get('window').width + 20,
    zIndex: -50,
  },
  iconContainer: {
    alignItems: 'center',
    borderRadius: SIZES.m12,
    height: SIZES.s40,
    justifyContent: 'center',
    borderColor: COLORS.darkGray,
    marginLeft: SIZES.m6,
    width: SIZES.s36,
    borderWidth: 1,
  },
  filter: {
    alignItems: 'center',
    flexDirection: 'row',
    height: SIZES.s40,
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.m12,
    width: SIZES.s200,
  },
  filtersContainer: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.r4,
    bottom: -SCALE(220),
    elevation: SIZES.r4,
    paddingVertical: SIZES.m12,
    position: 'absolute',
    right: SIZES.m16,
    shadowColor: COLORS.black,
    shadowOffset: { height: SIZES.r4, width: 0 },
    zIndex: -50,
    shadowRadius: SIZES.r4,
    width: SIZES.s200,
  },
});
