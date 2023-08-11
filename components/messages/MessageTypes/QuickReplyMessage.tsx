import React from 'react';
import { Pressable, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

import { COLORS, SCALE, SIZES } from '../../../constants';
import { MessageType } from '../Message';

interface Props {
  message: MessageType;
  time: string;
  isLeft: boolean;
}

const QuickReplyMessage = ({ message, time, isLeft }: Props) => {
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
        case 'option':
          return { alignSelf: 'flex-end' };
      }
    }
  };

  const options = JSON.parse(message.interactiveContent)?.options;
  return (
    <View style={[styles.quickContainer, onRight('option')]}>
      <Pressable
        testID="quickReplyMessage"
        style={[styles.quickMessageContainer, onRight('message')]}
      >
        <Text style={[styles.text, onRight('text')]}>{message.body}</Text>
        <Text style={[styles.time, onRight('time')]}>{time}</Text>
      </Pressable>
      <View style={styles.optionsContainer}>
        {options?.map((option, index) => (
          <Pressable key={index} testID={`quickOption${index}`} style={styles.optionButton}>
            <Text style={styles.optionText}>{option.title}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default QuickReplyMessage;

const styles = StyleSheet.create({
  optionButton: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primary10,
    borderRadius: SIZES.r10,
    justifyContent: 'center',
    marginVertical: SCALE(2),
    padding: SIZES.m10,
    width: '100%',
  },
  optionText: {
    color: COLORS.primary400,
    fontSize: SIZES.f14,
    fontWeight: '500',
    includeFontPadding: false,
  },
  optionsContainer: {
    marginTop: SIZES.m4,
  },
  quickContainer: {
    alignSelf: 'flex-start',
    margin: SIZES.m10,
    maxWidth: '70%',
  },
  quickMessageContainer: {
    backgroundColor: COLORS.primary400,
    borderRadius: SIZES.r10,
    borderTopLeftRadius: 0,
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
