import React, { useState, useRef, useImperativeHandle } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Animated,
  PanResponder,
  StyleSheet,
  Pressable,
} from 'react-native';

import { COLORS, SIZES, Icon } from '../../constants';

type Props = {
  refs: unknown;
  height: number;
  children: React.ReactNode;
  backgroundColor?: string;
  closeButton?: boolean;
  sheetStyle?: object;
  draggable?: boolean;
  outSideTouchCancel?: boolean;
};

const BottomSheet = ({
  refs,
  height,
  children,
  closeButton = false,
  backgroundColor,
  sheetStyle,
  draggable = true,
  outSideTouchCancel = true,
}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const pan = useRef(new Animated.ValueXY()).current;

  const handelModalVisible = (visible: boolean) => {
    if (visible) {
      setModalVisible(visible);
      Animated.timing(animatedHeight, {
        toValue: height,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animatedHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        pan.current = { x: 0, y: 0 };
        animatedHeight.current = new Animated.Value(0);
        setModalVisible(visible);
      });
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      if (gestureState.dy > 0) {
        Animated.event([null, { dy: pan.y }], {
          useNativeDriver: false,
        })(e, gestureState);
      }
    },
    onPanResponderRelease: (e, gestureState) => {
      const gestureLimitArea = height / 3;
      const gestureDistance = gestureState.dy;
      if (gestureDistance > gestureLimitArea) {
        handelModalVisible(false);
      } else {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
    },
  });

  const show = () => {
    handelModalVisible(true);
  };
  const close = () => {
    handelModalVisible(false);
  };

  useImperativeHandle(refs, () => ({
    show: () => {
      show();
    },
    close: () => {
      close();
    },
  }));

  return (
    <Modal transparent visible={modalVisible}>
      <View style={[styles.wrapper, { backgroundColor: backgroundColor || COLORS.black02 }]}>
        <TouchableOpacity
          style={styles.background}
          activeOpacity={1}
          onPress={() => {
            if (outSideTouchCancel) close();
          }}
        />
        {closeButton && (
          <Pressable style={styles.closeButton} onPress={close}>
            <Icon testID="close" name="cross" style={styles.closeIcon} />
          </Pressable>
        )}
        <Animated.View
          {...(draggable && panResponder.panHandlers)}
          style={[
            { transform: pan.getTranslateTransform() },
            styles.sheet_container,
            { height: animatedHeight, backgroundColor: COLORS.white },
            sheetStyle,
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  background: {
    backgroundColor: COLORS.transparent,
    flex: 1,
  },
  closeButton: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: COLORS.black02,
    borderRadius: SIZES.s24,
    height: SIZES.s40,
    justifyContent: 'center',
    marginBottom: SIZES.m10,
    marginRight: SIZES.m16,
    width: SIZES.s40,
  },
  closeIcon: {
    color: COLORS.white,
    fontSize: SIZES.f20,
  },
  sheet_container: {
    overflow: 'hidden',
    width: '100%',
  },
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
