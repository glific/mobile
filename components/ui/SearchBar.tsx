import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native';
import { COLORS, SIZES, SCALE } from '../../constants';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface MenuButtonProps {
  label: string;
  count: number;
}
const MenuButton: React.FC<MenuButtonProps> = ({ label, count }) => {
  return (
    <Pressable
      onPress={() => console.log('')}
      style={styles.menu}
      android_ripple={{ color: COLORS.primary10 }}
    >
      <Text style={styles.menuText}>{label}</Text>
      <Text style={styles.menuText}>{`(${count})`}</Text>
    </Pressable>
  );
};

type SearchBarProps = {
  value: string;
  setSearchValue: (value: string) => void;
  onSearch: () => void;
  showMenu?: boolean;
};

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  setSearchValue,
  onSearch,
  showMenu = false,
}) => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputContainer}>
        <AntDesign
          testID="searchIcon"
          name="search1"
          size={20}
          style={styles.icon}
          onPress={onSearch}
        />
        <TextInput
          testID="searchInput"
          style={styles.input}
          autoCapitalize="none"
          keyboardType="default"
          placeholder="Search"
          onChangeText={setSearchValue}
          value={value}
          cursorColor={COLORS.darkGray}
          selectionColor={COLORS.darkGray}
          underlineColorAndroid="transparent"
        />
        <Ionicons
          testID="filterOutline"
          name="filter-outline"
          size={20}
          style={styles.icon}
          onPress={() => navigation.navigate('ConversationFilter')}
        />
      </View>
      {showMenu && (
        <Pressable onPress={openMenu} testID="menuButton" style={styles.menuIconContainer}>
          <Entypo name="dots-three-vertical" style={styles.menuIcon} />
        </Pressable>
      )}
      {menuVisible && (
        <>
          <Pressable onPress={closeMenu} style={styles.menuBackground} />
          <View style={styles.menuContainer} testID="menuId">
            <MenuButton label="All" count={1} />
            <MenuButton label="Unread" count={4} />
            <MenuButton label="Not responded" count={35} />
            <MenuButton label="Opt in" count={0} />
            <MenuButton label="Opt out" count={10} />
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
    borderWidth: 0.75,
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
    width: SCALE(180),
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
    bottom: -SCALE(210),
    elevation: SIZES.r4,
    paddingVertical: SIZES.m12,
    position: 'absolute',
    right: SIZES.m16,
    shadowColor: COLORS.black,
    shadowOffset: { height: SIZES.r4, width: 0 },
    shadowRadius: SIZES.r4,
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
    borderWidth: 0.75,
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
