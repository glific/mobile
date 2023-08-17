import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';

import { COLORS, SIZES } from '../../../constants';
import { MessageTime, onRight } from './AudioMessage';

interface Props {
  uri: string;
  time: string;
  isLeft: boolean;
}

const StickerMessage = ({ uri, time, isLeft }: Props) => {
  return (
    <Pressable
      testID="stickerMessage"
      style={[styles.stickerContainer, onRight('sticker', isLeft)]}
    >
      <Image source={{ uri: uri }} style={styles.stickerImage} />
      <MessageTime time={time} isLeft={isLeft} style={styles.blackText} />
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
});
