import React, { useContext, useEffect, useRef, memo } from 'react';
import { Pressable, StyleSheet, Text, View, Animated } from 'react-native';

import { COLORS, SIZES } from '../../constants';
import AuthContext from '../../config/AuthContext';
import { Feather, Ionicons } from '@expo/vector-icons';

const PopupAlert = () => {
  const { alert, setAlert } = useContext(AuthContext);
  const animation = useRef(new Animated.Value(0)).current;

  const closeAlert = () => {
    setAlert(null);

    Animated.timing(animation, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
    if (alert?.disable) {
      setTimeout(() => {
        closeAlert();
      }, 2000);
    }
  }, [alert]);

  return (
    <Pressable disabled={alert.disable} onPress={closeAlert} style={styles.mainContainer}>
      <Animated.View
        style={[
          styles.alertContainer,
          {
            transform: [
              {
                scale: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.7, 1],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}
      >
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: alert.error ? COLORS.error100 : COLORS.primary100 },
          ]}
        >
          {alert.error ? (
            <Ionicons name="close" style={styles.icon} />
          ) : (
            <Feather name="check" style={styles.icon} />
          )}
        </View>
        <Text style={styles.title}>{alert.title}</Text>
        <Text style={styles.message}>{alert.message}</Text>
      </Animated.View>
    </Pressable>
  );
};

export default memo(PopupAlert);

const styles = StyleSheet.create({
  alertContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.r10,
    paddingBottom: SIZES.m65,
    paddingHorizontal: SIZES.m20,
    width: SIZES.s328,
  },
  icon: {
    color: COLORS.white,
    fontSize: SIZES.s44,
    includeFontPadding: false,
  },
  iconContainer: {
    alignItems: 'center',
    borderRadius: SIZES.s30,
    height: SIZES.s60,
    justifyContent: 'center',
    marginBottom: SIZES.m12,
    marginTop: -SIZES.m30,
    width: SIZES.s60,
  },
  mainContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.black02,
    height: SIZES.height,
    justifyContent: 'center',
    paddingHorizontal: SIZES.m40,
    position: 'absolute',
    width: SIZES.width,
  },
  message: {
    color: COLORS.black,
    fontSize: SIZES.f16,
    lineHeight: SIZES.f20,
    textAlign: 'center',
  },
  title: {
    color: COLORS.black,
    fontSize: SIZES.f18,
    fontWeight: '500',
    includeFontPadding: false,
    marginBottom: SIZES.m12,
    textAlign: 'center',
  },
});
