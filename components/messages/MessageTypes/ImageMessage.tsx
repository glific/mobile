import React from 'react';
import { Image, Pressable, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';

import { COLORS, SIZES } from '../../../constants';
import { MessageType } from '../Message';
import ImageViewer from '../ImageViewer';

interface Props {
  message: MessageType;
  handleImage: () => void;
  openImage: boolean;
  time: string;
  isLeft: boolean;
}

const ImageMessage = ({ message, openImage, handleImage, time, isLeft }: Props) => {
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

  return (
    <Pressable
      testID="imageMessage"
      style={[styles.container, onRight('message')]}
      onPress={handleImage}
    >
      <ImageViewer message={message} handleImage={handleImage} openImage={openImage} />
      <Image source={{ uri: message.media.url }} style={styles.image} />
      <Text style={[styles.time, onRight('time')]}>{time}</Text>
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
  time: {
    alignSelf: 'flex-end',
    bottom: -SIZES.m6,
    color: COLORS.lightGray,
    fontSize: SIZES.f10,
    position: 'relative',
  },
});
