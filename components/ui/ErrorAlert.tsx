import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SCALE, SIZES } from '../../constants';

type ErrorAlertProps = {
  message: string;
};

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
  return (
    <View style={styles.errorContainer}>
      <MaterialCommunityIcons name="close" style={styles.errorIcon} />
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
};

export default ErrorAlert;

const styles = StyleSheet.create({
  errorContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.r4,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    maxWidth: SIZES.s328,
    paddingHorizontal: SIZES.m16,
    paddingVertical: SIZES.m6,
    position: 'absolute',
    shadowColor: COLORS.darkGray,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    top: -SCALE(44),
  },
  errorIcon: {
    color: COLORS.error100,
    fontSize: SIZES.f14,
    marginRight: SIZES.m10,
  },
  errorText: {
    color: COLORS.error100,
    fontSize: SIZES.f14,
    maxWidth: SIZES.s328,
  },
});
