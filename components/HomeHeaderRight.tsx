import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { COLORS, SCALE, SIZES } from '../constants';
import { useQuery } from '@apollo/client';
import { GET_NOTIFICATIONS_COUNT } from '../graphql/queries/Notification';

interface FilterButtonProps {
  label: string;
  count: number;
}

const variables = {
  filter: {
    is_read: false,
  },
};

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
  const [notificationCount, setNotificationCount] = useState(0);

  useQuery(GET_NOTIFICATIONS_COUNT, {
    variables,
    onCompleted: (data) => {
      setNotificationCount(data.countNotifications);
    },
  });

  return (
    <View style={styles.mainContainer}>
      <Pressable
        onPress={() => navigation.navigate('Notifications')}
        style={styles.iconContainer}
        android_ripple={{ borderless: true }}
      >
        <Ionicons name="notifications-outline" style={styles.icon} />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{notificationCount}</Text>
        </View>
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
  badge: {
    alignItems: 'center',
    backgroundColor: COLORS.red,
    borderRadius: 10,
    height: 20,
    justifyContent: 'center',
    position: 'absolute',
    right: -3,
    top: -3,
    width: 20,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  filter: {
    alignItems: 'center',
    flexDirection: 'row',
    height: SIZES.s40,
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.m12,
    width: SIZES.s200,
  },
  filterBackground: {
    height: SIZES.height,
    position: 'absolute',
    right: 0,
    top: 0,
    width: SIZES.width,
  },
  filterText: {
    color: COLORS.black,
    fontSize: SIZES.f16,
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
    shadowRadius: SIZES.r4,
    width: SIZES.s200,
  },
  icon: {
    color: COLORS.white,
    fontSize: SIZES.f20,
  },
  iconContainer: {
    alignItems: 'center',
    borderRadius: SIZES.m20,
    height: SIZES.s30,
    justifyContent: 'center',
    marginLeft: SIZES.m4,
    width: SIZES.s30,
  },
  mainContainer: {
    backgroundColor: COLORS.primary400,
    flexDirection: 'row',
    padding: SIZES.m10,
  },
});
