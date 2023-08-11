import React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

import { COLORS, SIZES } from '../../../constants';

interface Props {
  body: string;
  time: string;
  isLeft: boolean;
}

const TextMessage = ({ body, time, isLeft }: Props) => {
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
        case 'text':
          return { color: COLORS.black };
        case 'time':
          return { color: COLORS.darkGray };
      }
    }
  };
  return (
    <View testID="textMessage" style={[styles.container, onRight('message')]}>
      <Text style={[styles.text, onRight('text')]}>{body}</Text>
      <Text style={[styles.time, onRight('time')]}>{time}</Text>
    </View>
  );
};

export default TextMessage;

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
  text: {
    color: COLORS.white,
    fontSize: SIZES.f14,
    includeFontPadding: false,
    letterSpacing: 0.2,
  },
  time: {
    alignSelf: 'flex-end',
    bottom: -SIZES.m6,
    color: COLORS.lightGray,
    fontSize: SIZES.f10,
    position: 'relative',
  },
});
