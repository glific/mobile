import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants';
import { useQuery } from '@apollo/client';
import { GET_NOTIFICATIONS_COUNT } from '../graphql/queries/Notification';
import { log } from 'react-native-reanimated';

const variables = {
  filter: {
    is_read: false,
  },
};

const HomeHeaderRight: React.FC = ({ navigation }: any) => {
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
