import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { COLORS, SIZES } from '../constants';
import Button from '../components/ui/Button';
import OtpInput from '../components/ui/OtpInput';

type RootStackParamList = {
  ResetPassword: undefined;
  OtpScreen: undefined;
  NewPassword: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'OtpScreen'>;

const OtpScreen = ({ navigation }: Props) => {
  const [enteredOTP, setEnteredOTP] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onVerifyOtpHandler = async () => {
    try {
      if (enteredOTP.length !== 6) {
        throw new Error('Please enter a valid OTP!');
      }

      navigation.navigate('NewPassword');
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
        <OtpInput
          testID="otp"
          label="Please enter the OTP received on your whatsapp number."
          value={enteredOTP}
          onUpdateValue={(text) => setEnteredOTP(text)}
          isError={errorMessage ? true : false}
          onFocus={() => setErrorMessage('')}
        />
        <Text style={styles.forgotPassword}>Resend?</Text>
        {errorDisplay}
      </View>
      <View style={styles.buttonContainer}>
        <Button disable={!enteredOTP} onPress={onVerifyOtpHandler}>
          <Text>CONTINUE</Text>
        </Button>
      </View>
    </View>
  );
};

export default OtpScreen;

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
  forgotPassword: {
    alignSelf: 'flex-end',
    color: COLORS.primary100,
    marginTop: SIZES.m6,
  },
  inputContainer: { paddingHorizontal: SIZES.m20 },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    paddingTop: SIZES.m24,
  },
});
