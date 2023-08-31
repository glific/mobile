import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/client';

import formatCount from '../../utils/formatCount';
import { COLORS, SIZES, Icon } from '../../constants';
import { GET_NOTIFICATIONS_COUNT } from '../../graphql/queries/Notification';

const variables = {
  filter: {
    is_read: false,
  },
};

const HomeHeaderRight = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const navigation = useNavigation();

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
        <Icon testID="notificationIcon" name="notification" style={styles.icon} />
        {notificationCount.toString() !== '0' && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{formatCount(notificationCount)}</Text>
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
    borderRadius: SIZES.r20,
    justifyContent: 'center',
    minHeight: SIZES.s18,
    minWidth: SIZES.s18,
    padding: SIZES.m2,
    position: 'absolute',
    right: -SIZES.m4,
    top: -SIZES.m6,
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
