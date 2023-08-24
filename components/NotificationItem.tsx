import React, { useRef } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import moment from 'moment';

import { Icon, COLORS, SCALE, SIZES } from '../constants';
import NotificationBottomSheet from './NotificationBottomSheet';

type notificationType = {
  entity: string;
  message: string;
  updatedAt: string;
  severity: string;
};

const NotificationItem: React.FC<notificationType> = React.memo((item) => {
  const notificationRef = useRef(null);
  const { name, phone } = JSON.parse(item.entity);
  const notification = {
    header: name || phone,
    message: item.message,
    time: moment.utc(item.updatedAt).fromNow(),
    type: item.severity.replace(/"/g, ''),
  };
  return (
    <>
      <Pressable
        testID="notificationItem"
        style={styles.mainContainer}
        android_ripple={{ color: COLORS.black005 }}
        onPress={() => notificationRef.current.show()}
      >
        <View style={styles.iconContainer}>
          {notification.type === 'Info' ? (
            <View style={styles.typeInfo}>
              <Icon name="chat-1" style={styles.icon} color={COLORS.info} />
            </View>
          ) : (
            <>
              {notification.type === 'Critical' ? (
                <View style={styles.typeCritical}>
                  <Icon name="settings" style={styles.icon} color={COLORS.critical} />
                </View>
              ) : (
                <View style={styles.typeWarning}>
                  <Icon name="exclamation-mark" style={styles.icon} color={COLORS.warning} />
                </View>
              )}
            </>
          )}
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{notification.header}</Text>
          <Text numberOfLines={3} style={styles.description}>
            {notification.message}
          </Text>
          <Text style={styles.date}>{notification.time}</Text>
        </View>
      </Pressable>
      <NotificationBottomSheet bsRef={notificationRef} notification={notification} />
    </>
  );
});

NotificationItem.displayName = 'NotificationItem';
export default NotificationItem;

const styles = StyleSheet.create({
  date: {
    color: COLORS.primary70,
    fontSize: SIZES.f12,
    fontWeight: '500',
  },
  description: {
    color: COLORS.black,
    fontSize: SIZES.f14,
    marginBottom: SIZES.m10,
    opacity: 0.8,
  },
  detailsContainer: {
    flex: 1,
  },
  icon: {
    fontSize: SIZES.f20,
    includeFontPadding: false,
  },
  iconContainer: {
    marginRight: SIZES.m16,
  },
  mainContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderBottomColor: COLORS.darkGray,
    borderBottomWidth: SCALE(0.2),
    flexDirection: 'row',
    height: SCALE(110),
    paddingHorizontal: SIZES.m16,
  },
  title: {
    color: COLORS.black,
    fontSize: SIZES.f16,
    fontWeight: '500',
    marginBottom: SCALE(2),
  },
  typeCritical: {
    alignItems: 'center',
    backgroundColor: COLORS.criticalBackground,
    borderColor: COLORS.critical,
    borderRadius: SIZES.m30,
    borderWidth: SCALE(1),
    height: SIZES.s48,
    justifyContent: 'center',
    width: SIZES.s48,
  },
  typeInfo: {
    alignItems: 'center',
    backgroundColor: COLORS.infoBackground,
    borderColor: COLORS.info,
    borderRadius: SIZES.m30,
    borderWidth: SCALE(1),
    height: SIZES.s48,
    justifyContent: 'center',
    width: SIZES.s48,
  },
  typeWarning: {
    alignItems: 'center',
    backgroundColor: COLORS.warningBackground,
    borderColor: COLORS.warning,
    borderRadius: SIZES.m30,
    borderWidth: SCALE(1),
    height: SIZES.s48,
    justifyContent: 'center',
    width: SIZES.s48,
  },
});
