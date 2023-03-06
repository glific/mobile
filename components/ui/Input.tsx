import { View, Text, TextInput, StyleSheet, KeyboardTypeOptions } from "react-native";

import { Colors } from "../../constants/styles";

interface InputProps {
  label: String;
  onUpdateValue: (text: string) => void;
  value: string;
  isError: boolean;
  secure?: boolean;
  keyboardType?: KeyboardTypeOptions;
}

const Input = ({
  label,
  keyboardType = "default",
  secure = false,
  onUpdateValue,
  value,
  isError = false,
}: InputProps) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isError && styles.errorLabel]}>{label}</Text>
      <TextInput
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
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: "white",
    borderColor: Colors.primary100,
    borderRadius: 4,
    fontSize: 16,
  },
  error: {
    backgroundColor: Colors.error100,
  },
});
