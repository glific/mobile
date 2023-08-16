import React, { memo } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardTypeOptions } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import { COLORS, SCALE, SIZES } from '../../constants';

type InputType = 'text' | 'password' | 'number';

interface InputProps {
  label?: string;
  // eslint-disable-next-line no-unused-vars
  onUpdateValue: (args: string) => void;
  value: string;
  secure?: boolean;
  keyboardType?: KeyboardTypeOptions;
  placeholder: string;
  testID?: string;
  onShowPassword?: () => void;
  type?: InputType;
}

const Input = ({
  label,
  placeholder = 'type...',
  keyboardType = 'default',
  secure = false,
  onUpdateValue,
  value,
  testID,
  onShowPassword,
  type = 'text',
}: InputProps) => {
  return (
    <View style={styles.inputContainer}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputBox}>
        <TextInput
          testID={testID}
          style={styles.input}
          autoCapitalize="none"
          keyboardType={keyboardType}
          secureTextEntry={secure}
          onChangeText={onUpdateValue}
          value={value}
          placeholder={placeholder}
          cursorColor={COLORS.darkGray}
          selectionColor={COLORS.darkGray}
          underlineColorAndroid="transparent"
        />
        {type == 'password' ? (
          <Ionicons
            testID="passwordEye"
            name={secure ? 'eye' : 'eye-off'}
            style={styles.clearIcon}
            onPress={onShowPassword}
          />
        ) : (
          value && (
            <AntDesign
              testID="close"
              name="close"
              style={styles.clearIcon}
              onPress={() => onUpdateValue('')}
            />
          )
        )}
      </View>
    </View>
  );
};

export default memo(Input);

const styles = StyleSheet.create({
  clearIcon: {
    color: COLORS.darkGray,
    fontSize: SIZES.f16,
  },
  input: {
    flex: 1,
    fontSize: SIZES.f16,
  },
  inputBox: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderColor: COLORS.darkGray,
    borderRadius: SIZES.r10,
    borderWidth: SCALE(0.75),
    flexDirection: 'row',
    height: SIZES.s48,
    marginVertical: SIZES.m8,
    paddingHorizontal: SIZES.m10,
    width: '100%',
  },
  inputContainer: {
    marginVertical: SIZES.m4,
    width: '100%',
  },
  label: {
    color: COLORS.black,
    fontSize: SIZES.f16,
    marginBottom: SIZES.m4,
  },
});
