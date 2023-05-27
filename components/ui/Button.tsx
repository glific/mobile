import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { COLORS } from '../../constants';
import { ReactElement } from 'react';

export interface ButtonProps {
  children: ReactElement | string;
  onPress: () => void;
  disable?: boolean;
}

const Button = ({ children, onPress, disable = false }: ButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
      disabled={disable}
    >
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary100,
    borderRadius: 24,
    elevation: 2,
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: COLORS.black,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    includeFontPadding: false,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});
