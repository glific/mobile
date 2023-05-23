import { View, Text, TextInput, StyleSheet, KeyboardTypeOptions } from 'react-native';
import { Colors } from '../../constants/styles';

import { AntDesign } from '@expo/vector-icons';

export interface InputProps {
  label: string;
  placeholder: string;
  onUpdateValue: (text: string) => void;
  value: string;
  isError: boolean;
  secure?: boolean;
  keyboardType?: KeyboardTypeOptions;
  placeHolder: string;
}

const Input = ({
  label,
  placeholder,
  keyboardType = 'default',
  secure = false,
  onUpdateValue,
  value,
  isError = false,
}: InputProps) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isError && styles.errorLabel]}>{label}</Text>
      <TextInput
        testID={label}
        style={[styles.input, isError && styles.errorLabel]}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: Colors.primary100,
    marginBottom: 4,
  },
  errorLabel: {
    color: Colors.error100,
  },
  inputBox: {
    width: '100%',
    height: 48,
    marginVertical: 8,
    borderWidth: 0.75,
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: Colors.darkGray,
    borderRadius: 10,
    flexDirection: 'row',
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: "white",
    borderColor: Colors.primary100,
    borderRadius: 4,
    fontSize: 16,
  },
  clearIcon: {
    fontSize: 16,
    color: Colors.darkGray,
  },
  error: {
    backgroundColor: Colors.error100,
  },
});
