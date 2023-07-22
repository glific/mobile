import React, { RefObject } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import BottomSheet from './ui/BottomSheet';
import { COLORS, SCALE, SIZES } from '../constants';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {
  bsRef: RefObject<unknown>;
  notification: {
    id: number;
    header: string;
    message: string;
    time: string;
    type: string;
  };
};

const NotificationBottomSheet = ({ bsRef, notification }: Props) => {
  return (
    <BottomSheet refs={bsRef} draggable={false} height={SIZES.s400} sheetStyle={styles.bottomSheet}>
      <ScrollView style={styles.mainContainer}>
        <View style={styles.headerContainer}>
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
            <Text style={styles.date}>{notification.time}</Text>
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{notification.message}</Text>
        </View>
      </ScrollView>
    </BottomSheet>
  );
};

export default NotificationBottomSheet;

const styles = StyleSheet.create({
  bottomSheet: {
    borderTopLeftRadius: SIZES.r10,
    borderTopRightRadius: SIZES.r10,
  },
  date: {
    color: COLORS.primary70,
    fontSize: SIZES.f12,
    fontWeight: '500',
  },
  description: {
    color: COLORS.black,
    flex: 1,
    fontSize: SIZES.f14,
    letterSpacing: 0.5,
    lineHeight: SCALE(22),
    opacity: 0.8,
  },
  descriptionContainer: {
    borderColor: COLORS.darkGray,
    borderRadius: SIZES.r4,
    borderWidth: 0.25,
    flex: 1,
    marginBottom: SIZES.m12,
    marginHorizontal: SIZES.m12,
    marginTop: SIZES.m4,
    paddingHorizontal: SIZES.m10,
    paddingVertical: SIZES.m10,
  },
  detailsContainer: {
    flex: 1,
    justifyContents: 'space-between',
  },
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.m12,
    paddingVertical: SIZES.m16,
  },
  icon: {
    fontSize: SIZES.f20,
    includeFontPadding: false,
  },
  iconContainer: {
    marginRight: SIZES.m16,
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
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
