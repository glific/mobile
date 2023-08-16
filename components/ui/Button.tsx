import React, { ReactElement, memo } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { COLORS, SIZES } from '../../constants';
import Loading from './Loading';

type ButtonType = 'positive' | 'neutral' | 'negative';

export interface ButtonProps {
  children: ReactElement | string;
  onPress: () => void;
  disable?: boolean;
  type?: ButtonType;
  loading?: boolean;
}

const Button = ({
  children,
  onPress,
  disable = false,
  type = 'positive',
  loading = false,
}: ButtonProps) => {
  const buttonTypeStyle = (component: string) => {
    if (component === 'container') {
      return {
        backgroundColor:
          type === 'negative'
            ? COLORS.error100
            : type === 'neutral'
            ? COLORS.lightGray
            : COLORS.primary100,
      };
    } else if (component === 'text') {
      return {
        color: type === 'neutral' ? COLORS.black : COLORS.white,
      };
    }
  };
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        buttonTypeStyle('container'),
        pressed && styles.pressed,
      ]}
      onPress={onPress}
      disabled={disable}
    >
      <Text style={[styles.buttonText, buttonTypeStyle('text')]}>{children}</Text>
      {loading && <Loading color={COLORS.white} size="small" relative />}
    </Pressable>
  );
};

export default memo(Button);

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: SIZES.r20,
    elevation: 2,
    flex: 1,
    flexDirection: 'row',
    height: SIZES.s40,
    justifyContent: 'center',
    paddingHorizontal: SIZES.m12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: SIZES.f16,
    fontWeight: '500',
    includeFontPadding: false,
    marginRight: SIZES.m4,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});
