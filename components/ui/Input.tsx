import React from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardTypeOptions } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import { Colors } from '../../constants/styles';

export interface InputProps {
  label: string;
  onUpdateValue: (text: string) => void;
  value: string;
  isError: boolean;
  secure?: boolean;
  keyboardType?: KeyboardTypeOptions;
  placeholder: string;
  testID?: string;
  onShowPassword?: () => void;
}

const Input = ({
  label,
  placeholder = 'type...',
  keyboardType = 'default',
  secure = false,
  onUpdateValue,
  value,
  isError = false,
  testID,
  onShowPassword
}: InputProps) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isError && styles.errorLabel]}>{label}</Text>
      <View style={styles.inputBox}>
        <TextInput
          testID={testID}
          style={[styles.input, isError && styles.errorLabel]}
          autoCapitalize="none"
          keyboardType={keyboardType}
          secureTextEntry={secure}
          onChangeText={onUpdateValue}
          value={value}
          placeholder={placeholder}
          cursorColor={Colors.darkGray}
          selectionColor={Colors.darkGray}
          underlineColorAndroid="transparent"
        />
        {testID == "password"? 
          <Ionicons name={secure ? 'eye' : 'eye-off'} style={styles.clearIcon} onPress={onShowPassword}/>
        :(value && (
          <AntDesign
            testID="close"
            name="close"
            style={styles.clearIcon}
            onPress={() => onUpdateValue('')}
          />
        ))}
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginVertical: 4,
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
