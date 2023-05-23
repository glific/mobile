import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/styles';

const HomeHeaderRight: React.FC = ({ navigation }: any) => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const FilterButton: React.FC = ({ label, count }: { string; number }) => {
    return (
      <Pressable
        onPress={() => console.log('')}
        style={styles.filter}
        android_ripple={{ color: Colors.primary10 }}
      >
        <Text style={styles.filterText}>{label}</Text>
        <Text style={styles.filterText}>{`(${count})`}</Text>
      </Pressable>
    );
  };
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
    padding: 10,
  },
  iconContainer: {
    paddingHorizontal: 6,
  },
  icon: {
    fontSize: 20,
    color: '#fff',
  },
  filterBackground: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 500,
    height: 800,
  },
  filtersContainer: {
    width: 200,
    height: 230,
    position: 'absolute',
    backgroundColor: 'white',
    right: 16,
    bottom: -230,
    borderRadius: 4,
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: { height: 4, width: 0 },
    shadowRadius: 4,
    paddingVertical: 14,
  },
  filter: {
    width: 200,
    height: 40,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterText: {
    fontSize: 14,
    color: Colors.black,
  },
});
