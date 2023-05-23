import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlingGestureHandler, Directions, State } from 'react-native-gesture-handler';
import Animated, {
  withSpring,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { theme } from '../../theme';

const Message = ({ time, isLeft, message, onSwipe }: any) => {
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
          <View style={styles.messageView}>
            <Text style={[styles.message, isOnLeft('message')]}>{message}</Text>
          </View>
          <View style={styles.timeView}>
            <Text style={[styles.time, isOnLeft('time')]}>{time}</Text>
          </View>
        </View>
      </Animated.View>
    </FlingGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginVertical: 5,
  },
  messageContainer: {
    backgroundColor: theme.colors.messageBackground,
    maxWidth: '80%',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 10,
  },
  messageView: {
    backgroundColor: 'transparent',
    maxWidth: '80%',
  },
  timeView: {
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    paddingLeft: 10,
  },
  message: {
    color: 'white',
    alignSelf: 'flex-start',
    fontSize: 15,
  },
  time: {
    color: 'lightgray',
    alignSelf: 'flex-end',
    fontSize: 10,
  },
});

export default Message;
