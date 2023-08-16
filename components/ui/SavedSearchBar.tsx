import React from 'react';
import { View, TextInput, StyleSheet, Pressable } from 'react-native';

import { COLORS, SIZES, SCALE, Icon } from '../../constants';

type SavedSearchBarProps = {
  searchValue: string;
  // eslint-disable-next-line no-unused-vars
  setSearchValue: (value: string) => void;
};

const SavedSearchBar: React.FC<SavedSearchBarProps> = ({ searchValue, setSearchValue }) => {
  const handleClear = () => setSearchValue('');
  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputContainer}>
        <Icon testID="searchIcon" name="search" style={styles.icon} />
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
        />
        {searchValue !== '' && (
          <Pressable
            style={styles.iconButton}
            onPress={handleClear}
            android_ripple={{ color: COLORS.black005, borderless: true }}
          >
            <Icon testID="close" name="cross" style={styles.clearIcon} />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default SavedSearchBar;

const styles = StyleSheet.create({
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
});
