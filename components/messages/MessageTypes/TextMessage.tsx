import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS, SIZES } from '../../../constants';
import { MessageTime, onRight } from './AudioMessage';

interface Props {
  body: string;
  time: string;
  isLeft: boolean;
}

const TextMessage = ({ body, time, isLeft }: Props) => {
  return (
    <View testID="textMessage" style={[styles.container, onRight('message', isLeft)]}>
      <Text style={[styles.text, onRight('text', isLeft)]}>{body}</Text>
      <MessageTime time={time} isLeft={isLeft} />
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
});
