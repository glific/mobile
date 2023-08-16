import React from 'react';
import { Pressable, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';

import { COLORS, SIZES } from '../../../constants';
import AudioPlayer from '../AudioPlayer';

export const onRight = (type: string, isLeft: boolean): ViewStyle | TextStyle | undefined => {
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
      case 'text':
        return { color: COLORS.black };
      case 'icon':
        return { color: COLORS.primary400 };
      case 'innerBackground':
        return { backgroundColor: COLORS.primary10 };
      case 'option':
        return { alignSelf: 'flex-end' };
    }
  }
};

export const MessageTime = ({
  time,
  isLeft,
  style,
}: {
  time: string;
  isLeft: boolean;
  style?: object;
}) => {
  return <Text style={[styles.time, style, onRight('time', isLeft)]}>{time}</Text>;
};

interface Props {
  uri: string;
  time: string;
  isLeft: boolean;
}

const AudioMessage = ({ uri, time, isLeft }: Props) => {
  return (
    <Pressable testID="audioMessage" style={[styles.audioContainer, onRight('message', isLeft)]}>
      <AudioPlayer audioUri={uri} isLeft={isLeft} />
      <MessageTime time={time} isLeft={isLeft} />
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
