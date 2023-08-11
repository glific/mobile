import React from 'react';
import { Image, Linking, Pressable, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';

import { COLORS, SCALE, SIZES } from '../../../constants';

interface Props {
  location: {
    latitude: number;
    longitude: number;
  };
  time: string;
  isLeft: boolean;
}

const LocationMessage = ({ location, time, isLeft }: Props) => {
  const onRight = (type: string): ViewStyle | TextStyle | undefined => {
    if (!isLeft) {
      switch (type) {
        case 'message':
          return {
            alignSelf: 'flex-end',
            borderTopRightRadius: 0,
            borderTopLeftRadius: SIZES.r10,
            backgroundColor: COLORS.lightGray,
          };
        case 'time':
          return { color: COLORS.darkGray };
      }
    }
  };

  const handleLink = () => {
    Linking.openURL(
      `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`
    );
  };

  return (
    <Pressable
      testID="locationMessage"
      style={[styles.container, onRight('message')]}
      onPress={handleLink}
    >
      <Image source={require('../../../assets/location.png')} style={styles.location} />
      <Text style={[styles.time, onRight('time')]}>{time}</Text>
    </Pressable>
  );
};

export default LocationMessage;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primary400,
    borderRadius: SIZES.r10,
    borderTopLeftRadius: 0,
    margin: SIZES.m10,
    maxWidth: '70%',
    padding: SIZES.m10,
  },
  location: {
    borderRadius: SIZES.r10,
    height: SCALE(108),
    width: SCALE(180),
  },
  time: {
    alignSelf: 'flex-end',
    bottom: -SIZES.m6,
    color: COLORS.lightGray,
    fontSize: SIZES.f10,
    position: 'relative',
  },
});
