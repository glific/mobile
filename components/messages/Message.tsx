import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlingGestureHandler, Directions, State } from 'react-native-gesture-handler';
import Animated, {
  withSpring,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { COLORS } from '../../constants';

const Message = ({ time, isLeft, message, onSwipe }: any) => {
  const dateObj = new Date(time);
  const formattedTime = dateObj.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const startingPosition = 0;
  const x = useSharedValue(startingPosition);

  const isOnLeft = (type: any) => {
    if (isLeft && type === 'messageContainer') {
      return {
        alignSelf: 'flex-start',
        backgroundColor: '#073F24',
        borderTopLeftRadius: 0,
      };
    } else if (!isLeft && type === 'message') {
      return {
        color: '#E1E8E5',
      };
    } else if (isLeft && type === 'time') {
      return {
        color: 'darkgray',
      };
    } else if (isLeft && type === 'message') {
      return {
        color: 'white',
      };
    } else {
      return {
        borderTopRightRadius: 0,
        color: '#E1E8E5',
      };
    }
  };

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {},
    onActive: (event, ctx) => {
      x.value = isLeft ? 50 : -50;
    },
    onEnd: (event, ctx) => {
      x.value = withSpring(startingPosition);
    },
  });

  const uas = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }],
    };
  });

  return (
    <FlingGestureHandler
      direction={isLeft ? Directions.RIGHT : Directions.LEFT}
      onGestureEvent={eventHandler}
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
          onSwipe(message, isLeft);
        }
      }}
    >
      <Animated.View style={[styles.container, uas]}>
        <View style={[styles.messageContainer, isOnLeft('messageContainer')]}>
          <Text style={[styles.message, isOnLeft('message')]}>{message}</Text>
          <Text style={[styles.time, isOnLeft('time')]}>{formattedTime}</Text>
        </View>
      </Animated.View>
    </FlingGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  messageContainer: {
    backgroundColor: COLORS.primary400,
    maxWidth: '70%',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    paddingVertical: 14,
  },
  message: {
    fontSize: 14,
    letterSpacing: 0.2,
    color: COLORS.black,
    includeFontPadding: false,
  },
  time: {
    fontSize: 10,
    color: 'lightgray',
    position: 'relative',
    alignSelf: 'flex-end',
    bottom: -6,
  },
});

export default Message;
