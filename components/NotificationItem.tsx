import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import { COLORS, SCALE, SIZES } from '../constants/theme';

type notificationType = {
  notification: {
    id: number;
    header: string;
    message: string;
    time: string;
    type: string;
  };
};

const NotificationItem: React.FC<{ notification: notificationType }> = ({ notification }) => {
  return (
    <View testID="notificationItem" style={styles.mainContainer}>
      <View style={styles.iconContainer}>
        {notification.type === 'Info' ? (
          <View style={styles.typeInfo}>
            <MaterialCommunityIcons
              name="message-text-outline"
              style={styles.icon}
              color={COLORS.info}
            />
          </View>
        ) : (
          <>
            {notification.type === 'Critical' ? (
              <View style={styles.typeCritical}>
                <AntDesign name="setting" style={styles.icon} color={COLORS.critical} />
              </View>
            ) : (
              <View style={styles.typeWarning}>
                <AntDesign name="warning" style={styles.icon} color={COLORS.warning} />
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
    </View>
  );
};

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
