import { ReactElement } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { Colors } from '../../constants/styles';

interface ButtonProps {
  children: ReactElement;
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
    borderRadius: 20,
    height: 40,
    paddingVertical: 6,
    paddingHorizontal: 12,
    justifyContent: 'center',
    backgroundColor: Colors.primary100,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    includeFontPadding: false,
  },
});
