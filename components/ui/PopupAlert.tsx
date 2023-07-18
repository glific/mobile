import React, { useContext, useEffect, useRef } from 'react';
import { Pressable, StyleSheet, Text, View, Animated } from 'react-native';

import { COLORS, SIZES } from '../../constants';
import AuthContext from '../../config/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const PopupAlert = () => {
  const { alert, setAlert } = useContext(AuthContext);
  const animation = useRef(new Animated.Value(0)).current;

  const closeAlert = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      setAlert(null);
    }, 60);
  };

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
    if (alert?.disable) {
      setInterval(() => {
        closeAlert();
      }, 3000);
    }
  }, [alert]);

  return (
    <Pressable disabled={alert?.disable} onPress={closeAlert} style={styles.mainContainer}>
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
        <View style={styles.iconContainer}>
          {alert?.error ? (
            <Ionicons name="close-circle" style={styles.icon} color={COLORS.error100} />
          ) : (
            <Ionicons name="checkmark-circle" style={styles.icon} color={COLORS.primary100} />
          )}
        </View>
        <Text style={styles.title}>{alert.title}</Text>
        <Text style={styles.message}>{alert.message}</Text>
      </Animated.View>
    </Pressable>
  );
};

export default PopupAlert;

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
    fontSize: SIZES.s60,
    includeFontPadding: false,
  },
  iconContainer: {
    alignItems: 'center',
    borderRadius: SIZES.m30,
    justifyContent: 'center',
    marginBottom: SIZES.m12,
    marginTop: -SIZES.m30,
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
