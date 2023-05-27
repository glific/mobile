import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { COLORS, SCALE, SIZES } from '../constants';

interface FilterButtonProps {
  label: string;
  count: number;
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, count }) => {
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

const HomeHeaderRight: React.FC = ({ navigation }: any) => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  return (
    <View style={styles.mainContainer}>
      <Pressable
        onPress={() => navigation.navigate('Notifications')}
        style={styles.iconContainer}
        android_ripple={{ borderless: true }}
      >
        <Ionicons name="notifications-outline" style={styles.icon} />
      </Pressable>
      <Pressable
        onPress={() => setIsFilterVisible(true)}
        style={styles.iconContainer}
        android_ripple={{ borderless: true }}
      >
        <Entypo name="dots-three-vertical" style={styles.icon} />
      </Pressable>
      {isFilterVisible && (
        <>
          <Pressable onPress={() => setIsFilterVisible(false)} style={styles.filterBackground} />
          <View style={styles.filtersContainer}>
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

export default HomeHeaderRight;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    padding: SIZES.m10,
    backgroundColor: COLORS.primary400,
  },
  iconContainer: {
    width: SIZES.s30,
    height: SIZES.s30,
    borderRadius: SIZES.m20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SIZES.m4,
  },
  icon: {
    fontSize: SIZES.f20,
    color: COLORS.white,
  },
  filterBackground: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: SIZES.width,
    height: SIZES.height,
  },
  filtersContainer: {
    width: SIZES.s200,
    position: 'absolute',
    backgroundColor: 'white',
    right: SIZES.m16,
    bottom: -SCALE(220),
    borderRadius: SIZES.r4,
    elevation: SIZES.r4,
    shadowColor: COLORS.black,
    shadowOffset: { height: SIZES.r4, width: 0 },
    shadowRadius: SIZES.r4,
    paddingVertical: SIZES.m12,
  },
  filter: {
    width: SIZES.s200,
    height: SIZES.s40,
    paddingHorizontal: SIZES.m12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterText: {
    fontSize: SIZES.f16,
    color: COLORS.black,
  },
});
