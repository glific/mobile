import { View, Text, TextInput, StyleSheet, KeyboardTypeOptions } from 'react-native';
import { Colors } from '../../constants/styles';
import { AntDesign } from '@expo/vector-icons';

interface InputProps {
  label: string;
  onUpdateValue: (text: string) => void;
  value: string;
  isError: boolean;
  secure?: boolean;
  keyboardType?: KeyboardTypeOptions;
  placeHolder?: string;
}

const Input = ({
  label,
  keyboardType = 'default',
  secure = false,
  onUpdateValue,
  value,
  isError = false,
  placeHolder = 'type...',
}: InputProps) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isError && styles.errorLabel]}>{label}</Text>
      <View style={styles.inputBox}>
        <TextInput
          testID={label}
          style={[styles.input, isError && styles.errorLabel]}
          autoCapitalize="none"
          keyboardType={keyboardType}
          secureTextEntry={secure}
          onChangeText={onUpdateValue}
          value={value}
          placeholder={placeHolder}
          cursorColor={Colors.darkGray}
          selectionColor={Colors.darkGray}
          underlineColorAndroid="transparent"
        />
        {value && (
          <AntDesign
            testID="close"
            name="close"
            style={styles.clearIcon}
            onPress={() => onUpdateValue('')}
          />
        )}
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    paddingHorizontal: '4%',
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    color: Colors.black,
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
    flex: 1,
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
