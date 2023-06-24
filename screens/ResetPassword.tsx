import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import PhoneInput from 'react-native-phone-number-input';

import { COLORS, SCALE, SIZES } from '../constants';
import Button from '../components/ui/Button';

type RootStackParamList = {
  Login: undefined;
  ResetPassword: undefined;
  OtpScreen: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'ResetPassword'>;

const ResetPassword = ({ navigation }: Props) => {
  const [enteredMobile, setEnteredMobile] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const phoneInput = useRef<PhoneInput>(null);

  const onGenerateHandler = async () => {
    try {
      if (enteredMobile.length !== 10) {
        throw new Error('Please enter a valid mobile number!');
      }

      navigation.navigate('OtpScreen');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  let errorDisplay;
  if (errorMessage) {
    errorDisplay = <Text style={styles.errorLabel}>{errorMessage}</Text>;
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputContainer}>
        <Text style={[styles.numberLabel, errorMessage && styles.errorLabel]}>
          Enter your WhatsApp number
        </Text>
        <PhoneInput
          testID="mobileNumber"
          ref={phoneInput}
          defaultCode="IN"
          onChangeText={(text) => setEnteredMobile(text)}
          layout="first"
          value={enteredMobile}
          placeholder="Enter 10 digit phone number"
          containerStyle={styles.phoneInputContainer}
          textContainerStyle={styles.phoneInput}
          flagButtonStyle={styles.flagButtonStyle}
        />
        {errorDisplay}
      </View>
      <View style={styles.buttonContainer}>
        <Button disable={!enteredMobile} onPress={onGenerateHandler}>
          <Text>Generate OTP</Text>
        </Button>
      </View>
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: 'center',
    bottom: SIZES.m20,
    position: 'absolute',
    width: SIZES.s328,
  },
  errorLabel: {
    color: COLORS.error100,
  },
  flagButtonStyle: {
    justifyContent: 'flex-start',
    paddingLeft: SCALE(2),
  },
  inputContainer: { paddingHorizontal: SIZES.m20 },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    paddingTop: SIZES.m24,
  },
  numberLabel: {
    fontSize: SIZES.f16,
    paddingBottom: SIZES.m10,
  },
  phoneInput: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.r10,
    flex: 1,
    fontSize: SIZES.f16,
    marginLeft: -SIZES.m16,
    paddingHorizontal: SIZES.m6,
    paddingVertical: SIZES.m6,
  },
  phoneInputContainer: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.darkGray,
    borderRadius: SIZES.m10,
    borderWidth: SCALE(0.75),
    height: SIZES.s48,
    marginBottom: SIZES.m20,
    width: '100%',
  },
});
