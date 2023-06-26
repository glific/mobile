import { StyleSheet, TextInput, View } from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { COLORS, SCALE, SIZES } from '../../constants';

type SearchInputBSProps = {
  value: string;
  handleValue: () => void;
  handleBack: () => void;
};

const SearchInputBS: React.FC<SearchInputBSProps> = ({ value, handleValue, handleBack }) => {
  return (
    <View style={styles.searchContainer}>
      <Entypo
        testID="bsBackIcon"
        name="chevron-left"
        style={styles.backIcon}
        onPress={handleBack}
      />
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

export default SearchInputBS;

const styles = StyleSheet.create({
  backIcon: {
    color: COLORS.black,
    fontSize: SIZES.f18,
    padding: SIZES.m4,
  },
  input: {
    color: COLORS.black,
    fontSize: SIZES.f16,
  },
  searchContainer: {
    alignItems: 'center',
    borderBottomWidth: SCALE(0.5),
    borderColor: COLORS.lightGray,
    flexDirection: 'row',
    height: SIZES.s60,
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.m10,
  },
  searchInput: {
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.r20,
    flex: 1,
    paddingHorizontal: SIZES.m10,
    paddingVertical: SIZES.m8,
  },
});
