import React from 'react';
import { Text, View, StyleSheet, ViewStyle } from 'react-native';

import { COLORS, SIZES } from '../../constants';

type MessageProps = {
  isLeft: boolean;
  message: {
    id: number;
    body: string;
    insertedAt: string;
    sender: {
      id: number;
    };
  };
};

const Message: React.FC<MessageProps> = ({ isLeft, message }) => {
  const dateObj = new Date(message.insertedAt);
  const formattedTime = dateObj.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const getMessageContainerStyles = (): ViewStyle => {
    if (isLeft) {
      return {
        alignSelf: 'flex-start',
      };
    } else {
      return {
        alignSelf: 'flex-end',
        borderTopRightRadius: 0,
        borderTopLeftRadius: SIZES.r10,
        backgroundColor: COLORS.lightGray,
      };
    }
  };

  const getBodyStyles = () => {
    if (isLeft) {
      return {};
    } else {
      return {
        color: COLORS.black,
      };
    }
  };

  const getTimeStyles = () => {
    if (isLeft) {
      return {};
    } else {
      return {
        color: 'darkgray',
      };
    }
  };

  return (
    <View style={[styles.messageContainer, getMessageContainerStyles()]}>
      <Text style={[styles.message, getBodyStyles()]}>{message.body}</Text>
      <Text style={[styles.time, getTimeStyles()]}>{formattedTime}</Text>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  message: {
    color: COLORS.white,
    fontSize: SIZES.f14,
    includeFontPadding: false,
    letterSpacing: 0.2,
  },
  messageContainer: {
    backgroundColor: COLORS.primary400,
    borderRadius: SIZES.r10,
    borderTopLeftRadius: 0,
    margin: SIZES.m10,
    maxWidth: '70%',
    padding: SIZES.m10,
  },
  time: {
    alignSelf: 'flex-end',
    bottom: -SIZES.m6,
    color: COLORS.lightGray,
    fontSize: SIZES.f10,
    position: 'relative',
  },
});
