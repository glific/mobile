import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

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
  onSwipe: (message: any) => void;
};

const Message: React.FC<MessageProps> = ({ isLeft, message, onSwipe }) => {
  const dateObj = new Date(message.insertedAt);
  const formattedTime = dateObj.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const onRight = (type: string) => {
    if (isLeft) return {};
    else {
      switch (type) {
        case 'message':
          return {
            alignSelf: 'flex-end',
            borderTopRightRadius: 0,
            borderTopLeftRadius: SIZES.r10,
            backgroundColor: COLORS.lightGray,
          };
        case 'body':
          return {
            color: COLORS.black,
          };
        case 'time':
          return {
            color: 'darkgray',
          };
      }
    }
  };

  const translateX = useSharedValue(0);

  const gestureHandler = (event: any) => {
    const translationX = event.nativeEvent.translationX;

    if (isLeft && translationX > 0) {
      translateX.value = Math.min(translationX, 50);
    } else if (!isLeft && translationX < 0) {
      translateX.value = Math.max(translationX, -50);
    }
  };

  const gestureStateHandler = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      const translationThreshold = 40;

      if (
        (isLeft && translateX.value >= translationThreshold) ||
        (!isLeft && translateX.value <= -translationThreshold)
      ) {
        onSwipe({ ...message, isLeft });
        translateX.value = withSpring(0);
      } else {
        translateX.value = withSpring(0);
      }
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler} onHandlerStateChange={gestureStateHandler}>
      <Animated.View style={[styles.messageContainer, onRight('message'), animatedStyle]}>
        <Text style={[styles.message, onRight('body')]}>{message.body}</Text>
        <Text style={[styles.time, onRight('time')]}>{formattedTime}</Text>
      </Animated.View>
    </PanGestureHandler>
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
