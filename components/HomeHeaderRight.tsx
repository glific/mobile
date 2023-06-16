import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SCALE, SIZES } from '../constants';
import { useQuery } from '@apollo/client';
import { GET_NOTIFICATIONS_COUNT } from '../graphql/queries/Notification';
const variables = {
  filter: {
    is_read: false,
  },
};

interface HomeHeaderProps {
  navigation: {
    navigate: (text: string) => void;
  };
}

const HomeHeaderRight: React.FC<HomeHeaderProps> = ({ navigation }) => {
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
        {notificationCount.toString() !== '0' && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{notificationCount}</Text>
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default HomeHeaderRight;

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    backgroundColor: COLORS.error100,
    borderRadius: SIZES.r10,
    height: SIZES.s18,
    justifyContent: 'center',
    position: 'absolute',
    right: -SCALE(3),
    top: -SCALE(3),
    width: SIZES.s18,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: SIZES.f12,
    fontWeight: '500',
    includeFontPadding: false,
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
    marginLeft: SIZES.m10,
    width: SIZES.s30,
  },
  mainContainer: {
    backgroundColor: COLORS.primary400,
    flexDirection: 'row',
    padding: SIZES.m10,
  },
});
