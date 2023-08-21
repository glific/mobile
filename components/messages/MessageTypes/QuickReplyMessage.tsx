import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS, SCALE, SIZES } from '../../../constants';
import { MessageType } from '../Message';
import { MessageTime, onRight } from './AudioMessage';

interface Props {
  message: MessageType;
  time: string;
  isLeft: boolean;
}

const QuickReplyMessage = ({ message, time, isLeft }: Props) => {
  const options = JSON.parse(message.interactiveContent)?.options;
  return (
    <View style={[styles.quickContainer, onRight('option', isLeft)]}>
      <Pressable
        testID="quickReplyMessage"
        style={[styles.quickMessageContainer, onRight('message', isLeft)]}
      >
        <Text style={[styles.text, onRight('text', isLeft)]}>{message.body}</Text>
        <MessageTime time={time} isLeft={isLeft} />
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
});
