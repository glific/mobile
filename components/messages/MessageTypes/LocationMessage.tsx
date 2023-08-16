import React from 'react';
import { Image, Linking, Pressable, StyleSheet } from 'react-native';

import { COLORS, SCALE, SIZES } from '../../../constants';
import { MessageTime, onRight } from './AudioMessage';

interface Props {
  location: {
    latitude: number;
    longitude: number;
  };
  time: string;
  isLeft: boolean;
}

const LocationMessage = ({ location, time, isLeft }: Props) => {
  const handleLink = () => {
    Linking.openURL(
      `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`
    );
  };

  return (
    <Pressable
      testID="locationMessage"
      style={[styles.container, onRight('message', isLeft)]}
      onPress={handleLink}
    >
      <Image source={require('../../../assets/location.png')} style={styles.location} />
      <MessageTime time={time} isLeft={isLeft} />
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
});
