import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { COLORS, SIZES, SCALE } from '../../constants';

export interface OtpInputProps {
  label: string;
  value: string;
  onUpdateValue: (text: string) => void;
  onFocus: () => void;
  isError: boolean;
  testID?: string;
}

const OtpInput = ({
  label,
  value,
  onUpdateValue,
  onFocus,
  isError = false,
  testID,
}: OtpInputProps) => {
  const textInputRef = useRef();
  const OTP_LENGTH = 6;
  const [focused, setFocused] = useState(false);

  const codeDigitsArray = new Array(OTP_LENGTH).fill(0);

  const toCodeDigitInput = (_value: string, index: number) => {
    const emptyInputChar = ' ';
    const digit = value[index] || emptyInputChar;

    const isCurrentDigit = index === value.length;
    const isLastDigit = index == OTP_LENGTH - 1;
    const isCodeFull = value.length === OTP_LENGTH;

    const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFull);

    return (
      <View
        key={index}
        style={[
          styles.defaultInput,
          focused && isDigitFocused && { borderColor: COLORS.primary100 },
          isError && { borderColor: COLORS.error100 },
        ]}
      >
        <Text style={styles.inputText}>{digit}</Text>
      </View>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <Text style={[styles.label, isError && styles.errorLabel]}>{label}</Text>
      <View style={styles.inputBox}>
        <View style={styles.inputContainer}>{codeDigitsArray.map(toCodeDigitInput)}</View>
        <TextInput
          testID={testID}
          ref={textInputRef}
          style={[styles.hiddenTextInput, isError && styles.errorLabel]}
          autoCapitalize="none"
          value={value}
          onFocus={() => {
            onFocus();
            setFocused(true);
            textInputRef?.current?.focus();
          }}
          onBlur={() => setFocused(false)}
          onSubmitEditing={() => setFocused(false)}
          onChangeText={(value) => {
            onUpdateValue(value);
            value.length == OTP_LENGTH ? setFocused(false) : setFocused(true);
          }}
          autoFocus={true}
          caretHidden={true}
          returnKeyType={'done'}
          keyboardType={'numeric'}
          textContentType={'oneTimeCode'}
          maxLength={OTP_LENGTH}
        />
      </View>
    </View>
  );
};

export default OtpInput;

const styles = StyleSheet.create({
  defaultInput: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderColor: COLORS.darkGray,
    borderRadius: SIZES.r10,
    borderWidth: SCALE(0.75),
    height: SIZES.s48,
    justifyContent: 'center',
    paddingHorizontal: SIZES.m16,
    width: SIZES.s48,
  },
  errorLabel: {
    color: COLORS.error100,
  },
  hiddenTextInput: {
    alignSelf: 'center',
    bottom: 0,
    height: SIZES.s48,
    opacity: 0,
    position: 'absolute',
    width: '100%',
  },
  inputBox: {
    marginVertical: SIZES.m10,
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    height: SIZES.s48,
    justifyContent: 'space-between',
    width: '100%',
  },
  inputText: {
    color: COLORS.black,
    fontSize: SIZES.f16,
  },
  label: {
    color: COLORS.black,
    fontSize: SIZES.f16,
    marginBottom: SIZES.m4,
  },
  mainContainer: {
    marginVertical: SIZES.m4,
    width: '100%',
  },
});
