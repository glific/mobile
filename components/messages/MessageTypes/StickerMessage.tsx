import React from 'react';
import { Image, Pressable, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';

import { COLORS, SIZES } from '../../../constants';

interface Props {
  uri: string;
  time: string;
  isLeft: boolean;
}

const StickerMessage = ({ uri, time, isLeft }: Props) => {
  const onRight = (type: string): ViewStyle | TextStyle | undefined => {
    if (!isLeft) {
      switch (type) {
        case 'sticker':
          return {
            alignSelf: 'flex-end',
            borderTopRightRadius: 0,
            borderTopLeftRadius: SIZES.r10,
          };
        case 'time':
          return { color: COLORS.darkGray };
      }
    }
  };

  return (
    <Pressable testID="stickerMessage" style={[styles.stickerContainer, onRight('sticker')]}>
      <Image source={{ uri: uri }} style={styles.stickerImage} />
      <Text style={[styles.time, styles.blackText, onRight('time')]}>{time}</Text>
    </Pressable>
  );
};

export default StickerMessage;

const styles = StyleSheet.create({
  blackText: {
    color: COLORS.black,
  },
  stickerContainer: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.black005,
    borderRadius: SIZES.r10,
    borderTopLeftRadius: 0,
    margin: SIZES.m10,
    maxWidth: '70%',
    padding: SIZES.m10,
  },
  stickerImage: {
    aspectRatio: 1,
    borderRadius: SIZES.r10,
    maxWidth: '100%',
    width: '100%',
  },
  time: {
    alignSelf: 'flex-end',
    bottom: -SIZES.m6,
    color: COLORS.lightGray,
    fontSize: SIZES.f10,
    position: 'relative',
  },
});
