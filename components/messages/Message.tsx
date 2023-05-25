import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

import { COLORS, SIZES } from '../../constants';


type MessageProps = {
  isLeft: boolean;
  message: {
    id: number,
    body: string,
    insertedAt: string,
    sender: {
      id: number,
    }
  };
  onSwipe: (message: any, isLeft: boolean) => void;
};

const Message: React.FC<MessageProps> = ({ isLeft, message, onSwipe }: any) => {
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
  const containerWidth = SIZES.width * 0.7;

  const gestureHandler = (event: any) => {
    translateX.value = event.nativeEvent.translationX;
  };

  const gestureStateHandler = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      const translationThreshold = containerWidth * 0.5;
      const isOpen = translateX.value > translationThreshold;

      if (isOpen) {
        translateX.value = withSpring(containerWidth);
      } else {
        translateX.value = withSpring(0, {}, () => {
          translateX.value = 0;
        });
      }
    }
    if(event.nativeEvent.state === State.ACTIVE) {
          onSwipe(message, isLeft);
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
  messageContainer: {
    maxWidth: '70%',
    margin: SIZES.m10,
    padding: SIZES.m10,
    borderTopLeftRadius: 0,
    borderRadius: SIZES.r10,
    backgroundColor: COLORS.primary400,
  },
  message: {
    fontSize: SIZES.f14,
    letterSpacing: 0.2,
    color: COLORS.white,
    includeFontPadding: false,
    // backgroundColor: COLORS.primary100,
  },
  time: {
    fontSize: SIZES.f10,
    color: 'lightgray',
    position: 'relative',
    alignSelf: 'flex-end',
    bottom: -SIZES.m6,
  },
});

