import { useState, useContext, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import PhoneNumberInput from 'react-native-phone-number-input';
import PhoneInput from 'react-native-phone-number-input';

import { Colors } from '../constants/styles';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Storage from '../utils/asyncStorage';
import AuthContext from '../config/AuthContext';
import createAxiosClient from '../config/axios';

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
  const Client = createAxiosClient();

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
          <Text style={[styles.numberLabel, errorMessage && styles.errorLabel]}>Enter your WhatsApp number</Text>
          <PhoneNumberInput
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
  errorLabel: {
    color: Colors.error100,
  },
  phoneInputContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 0.75,
    borderRadius: 10,
    marginBottom: 20,
    borderColor: Colors.darkGray,
    height: 48,
  },
  phoneInput: {
    width: '80%',
    fontSize: 16,
    backgroundColor: 'white',
    borderRadius: 10,
    marginLeft: -12,
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  numberLabel: {
    paddingBottom: 10,
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 32,
  },

  forgotPassword: {
    alignSelf: 'flex-end',
    color: Colors.primary100,
    marginTop: 5,
  },
  buttonContainer: {
    alignSelf: 'stretch',
    marginBottom: 20,
  },
  iconContainer: {
    position: 'absolute',
    top: 55,
    right: 10,
  },
});
