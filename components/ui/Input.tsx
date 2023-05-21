import { View, Text, TextInput, StyleSheet, KeyboardTypeOptions } from "react-native";
import { Colors } from "../../constants/styles";

interface InputProps {
  label: string;
  placeholder: string;
  onUpdateValue: (text: string) => void;
  value: string;
  isError: boolean;
  secure?: boolean;
  keyboardType?: KeyboardTypeOptions;
}

const Input = ({
  label,
  placeholder,
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
        testID={label}
        style={[styles.input, isError && styles.errorLabel]}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
        placeholder={placeholder}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 18,
  },
  label: {
    color: Colors.primaryText,
    marginBottom: 8,
  },
  errorLabel: {
    color: Colors.error100,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "white",
    borderColor: "#93a29b",
    borderWidth: 1,
    borderRadius: 11,
    fontSize: 16,
  },
  error: {
    backgroundColor: Colors.error100,
  },
});
