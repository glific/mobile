import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';

import { COLORS, SIZES } from '../../../constants';
import { MessageType } from '../Message';
import ImageViewer from '../ImageViewer';
import { MessageTime, onRight } from './AudioMessage';

interface Props {
  message: MessageType;
  handleImage: () => void;
  openImage: boolean;
  time: string;
  isLeft: boolean;
}

const ImageMessage = ({ message, openImage, handleImage, time, isLeft }: Props) => {
  return (
    <Pressable
      testID="imageMessage"
      style={[styles.container, onRight('message', isLeft)]}
      onPress={handleImage}
    >
      <ImageViewer message={message} handleImage={handleImage} openImage={openImage} />
      <Image source={{ uri: message.media.url }} style={styles.image} />
      <MessageTime time={time} isLeft={isLeft} />
    </Pressable>
  );
};

export default ImageMessage;

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
  image: {
    aspectRatio: 1,
    borderRadius: SIZES.r10,
    maxWidth: '100%',
    width: '100%',
  },
});
