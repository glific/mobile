import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { COLORS, SCALE, SIZES } from '../../constants';

type NotificationHeaderProps = {
  searchValue: string;
  // eslint-disable-next-line no-unused-vars
  handleSearch: (value: string) => void;
  // onSearch: () => void;
};

const NotificationHeader: React.FC<NotificationHeaderProps> = ({ searchValue, handleSearch }) => {
  const [searchVisible, setSearchVisible] = useState(false);

  const handleCloseSearch = () => {
    handleSearch('');
    setSearchVisible(false);
  };

  return (
    <View style={styles.mainContainer}>
      {!searchVisible ? (
        <AntDesign
          testID="searchIcon"
          name="search1"
          style={styles.rightIcon}
          onPress={() => setSearchVisible(true)}
        />
      ) : (
        <View style={styles.searchInputContainer}>
          <View style={styles.searchInput}>
            <AntDesign testID="searchIcon" name="search1" style={styles.searchIcon} />
            <TextInput
              testID="searchInput"
              style={styles.input}
              value={searchValue}
              onChangeText={handleSearch}
              autoFocus
              placeholder="Search"
              cursorColor={COLORS.darkGray}
              selectionColor={COLORS.darkGray}
              underlineColorAndroid="transparent"
            />
          </View>
          <MaterialIcons name="close" style={styles.rightIcon} onPress={handleCloseSearch} />
        </View>
      )}
    </View>
  );
};

export default NotificationHeader;

const styles = StyleSheet.create({
  input: {
    color: COLORS.black,
    fontSize: SIZES.f16,
    width: SCALE(210),
  },
  mainContainer: {
    flexDirection: 'row',
    marginLeft: -SCALE(120),
    marginRight: SIZES.m16,
  },
  rightIcon: {
    color: COLORS.white,
    fontSize: SIZES.f20,
  },
  searchIcon: {
    color: COLORS.black,
    fontSize: SIZES.f20,
    marginRight: SIZES.m10,
  },
  searchInput: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.r4,
    flexDirection: 'row',
    marginRight: SIZES.m16,
    paddingHorizontal: SIZES.m6,
    paddingVertical: SIZES.m4,
  },
  searchInputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
