import { StyleSheet, TextInput, View } from 'react-native';
import React from 'react';

import { COLORS, SCALE, SIZES, Icon } from '../../constants';

type SearchInputProps = {
  value: string;
  // eslint-disable-next-line no-unused-vars
  handleValue: (value: string) => void;
  handleBack: () => void;
};

const SearchInput: React.FC<SearchInputProps> = ({ value, handleValue, handleBack }) => {
  return (
    <View style={styles.searchContainer}>
      <Icon testID="bsBackIcon" name="left-arrow" style={styles.backIcon} onPress={handleBack} />
      <View style={styles.searchInput}>
        <TextInput
          testID="bsSearch"
          style={styles.input}
          autoCapitalize="none"
          keyboardType="default"
          onChangeText={handleValue}
          value={value}
          placeholder="Search"
          cursorColor={COLORS.darkGray}
          selectionColor={COLORS.darkGray}
          underlineColorAndroid="transparent"
        />
      </View>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  backIcon: {
    color: COLORS.black,
    fontSize: SIZES.f20,
    padding: SIZES.m4,
  },
  input: {
    color: COLORS.black,
    fontSize: SIZES.f16,
  },
  searchContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderBottomWidth: SCALE(0.5),
    borderColor: COLORS.lightGray,
    flexDirection: 'row',
    height: SIZES.s60,
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.m8,
  },
  searchInput: {
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.r20,
    flex: 1,
    paddingHorizontal: SIZES.m10,
    paddingVertical: SIZES.m8,
  },
});
