import React from 'react';
import { Pressable, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';

import { COLORS, SIZES } from '../../../constants';
import AudioPlayer from '../AudioPlayer';

interface Props {
  uri: string;
  time: string;
  isLeft: boolean;
}

const AudioMessage = ({ uri, time, isLeft }: Props) => {
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
    <Pressable testID="audioMessage" style={[styles.audioContainer, onRight('message')]}>
      <AudioPlayer audioUri={uri} isLeft={isLeft} />
      <Text style={[styles.time, onRight('time')]}>{time}</Text>
    </Pressable>
  );
};

export default AudioMessage;

const styles = StyleSheet.create({
  audioContainer: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primary400,
    borderRadius: SIZES.r10,
    borderTopLeftRadius: 0,
    margin: SIZES.m10,
    padding: SIZES.m10,
    width: '70%',
  },
  time: {
    alignSelf: 'flex-end',
    bottom: -SIZES.m6,
    color: COLORS.lightGray,
    fontSize: SIZES.f10,
    position: 'relative',
  },
});
