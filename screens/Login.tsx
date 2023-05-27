import React, { useState, useContext, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import PhoneInput from 'react-native-phone-number-input';

import { COLORS } from '../constants';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Storage from '../utils/asyncStorage';
import AuthContext from '../config/AuthContext';
import AxiosService from '../config/axios';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = ({ navigation }: Props) => {
  const { setToken } = useContext(AuthContext);
  const [enteredMobile, setEnteredMobile] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);

  const updateInputValueHandler = (inputType: string, enteredValue: string) => {
    switch (inputType) {
      case 'mobile':
        setEnteredMobile(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
    }
  };

  const onSubmitHandler = async () => {
    try {
      if (enteredMobile == '' || enteredPassword == '') {
        throw new Error('Please enter mobile number and password!');
      }
      const Client = await AxiosService.createAxiosInstance();
      const countryCode = phoneInput.current?.getCallingCode();

      const response = await Client.post('/v1/session', {
        user: {
          phone: countryCode + enteredMobile,
          password: enteredPassword,
        },
      });

      await Storage.storeData('session', JSON.stringify(response.data.data));
      setToken(response.data.data.access_token);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  let errorDisplay;
  if (errorMessage) {
    errorDisplay = <Text style={styles.errorLabel}>{errorMessage}</Text>;
  }

  return (
    <View style={styles.container}>
      <View>
        <View>
          <Text style={[styles.numberLabel, errorMessage && styles.errorLabel]}>
            Enter your WhatsApp number
          </Text>
          <PhoneInput
            testID="mobileNumber"
            ref={phoneInput}
            defaultCode="IN"
            onChangeText={(text) => updateInputValueHandler('mobile', text)}
            layout="first"
            value={enteredMobile}
            placeholder="Enter 10 digit phone number"
            containerStyle={styles.phoneInputContainer}
            textContainerStyle={styles.phoneInput}
          />
        </View>
        <Input
          testID="password"
          label="Enter your password"
          placeholder="Password"
          value={enteredPassword}
          onUpdateValue={(text) => updateInputValueHandler('password', text)}
          secure={showPassword ? false : true}
          onShowPassword={() => setShowPassword(!showPassword)}
          isError={errorMessage ? true : false}
          type="password"
        />
        <Text style={styles.forgotPassword}>Forgot password?</Text>
        {errorDisplay}
      </View>
      <View style={styles.buttonContainer}>
        <Button disable={!enteredMobile && !enteredPassword} onPress={onSubmitHandler}>
          <Text>LOG IN</Text>
        </Button>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: 'stretch',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  errorLabel: {
    color: COLORS.error100,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    color: COLORS.primary100,
    marginTop: 5,
  },
  numberLabel: {
    fontSize: 16,
    paddingBottom: 10,
  },
  phoneInput: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    fontSize: 16,
    marginLeft: -12,
    paddingHorizontal: 6,
    paddingVertical: 8,
    width: '80%',
  },
  phoneInputContainer: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.darkGray,
    borderRadius: 10,
    borderWidth: 0.75,
    height: 48,
    marginBottom: 20,
    width: '100%',
  },
});
