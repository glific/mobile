import React, { useState, useContext, useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import PhoneInput from 'react-native-phone-number-input';
import { useLazyQuery } from '@apollo/client';

import { GET_CURRENT_USER } from '../graphql/queries/Account';
import { COLORS, SCALE, SIZES } from '../constants';
import AuthContext from '../config/AuthContext';
import Storage from '../utils/asyncStorage';
import AxiosService from '../config/axios';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

type RootStackParamList = {
  Login: undefined;
  Server: undefined;
  ResetPassword: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = ({ navigation }: Props) => {
  const { setToken, setUser, org, setAlert } = useContext(AuthContext);
  const [enteredMobile, setEnteredMobile] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);

  const [getCurrentUser] = useLazyQuery(GET_CURRENT_USER, {
    fetchPolicy: 'network-only',
    onCompleted(data) {
      const { user } = data.currentUser;
      const userCopy = JSON.parse(JSON.stringify(user));
      userCopy.roles = user.accessRoles;
      Storage.storeData('glific_user', JSON.stringify(userCopy));
      setUser(userCopy);
    },
    onError() {
      setErrorMessage('Your account is not approved yet. Please contact your organisation admin.');
      Storage.removeData('glific_session');
      Storage.removeData('glific_user');
      setToken(null);
      setUser(null);
    },
  });

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
      setLoading(true);
      const Client = await AxiosService.createAxiosInstance();
      const countryCode = phoneInput.current?.getCallingCode();

      const response = await Client.post('/v1/session', {
        user: {
          phone: countryCode + enteredMobile,
          password: enteredPassword,
        },
      });

      await Storage.storeData('glific_session', JSON.stringify(response.data.data));
      await getCurrentUser();
      setLoading(false);
      setAlert({
        error: false,
        title: 'Login Successful!',
        message: 'You  have successfully logged into your Glific mobile app',
        disable: true,
      });
      setToken(response.data.data.access_token);
    } catch (error) {
      setErrorMessage('Incorrect login credentials!');
      setLoading(false);
    }
  };

  let errorDisplay;
  if (errorMessage) {
    errorDisplay = <Text style={styles.errorLabel}>{errorMessage}</Text>;
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputContainer}>
        <View testID="organisationURL" style={styles.headerContainer}>
          <Text style={styles.urlText}>{org ? org.name : ''}</Text>
          <Pressable testID="changeURL" onPress={() => navigation.navigate('Server')}>
            <Text style={styles.textButton}>Change</Text>
          </Pressable>
        </View>
        <Text style={styles.numberLabel}>Enter your WhatsApp number</Text>
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
          flagButtonStyle={styles.flagButtonStyle}
        />
        <Input
          testID="password"
          label="Enter your password"
          placeholder="Password"
          value={enteredPassword}
          onUpdateValue={(text) => updateInputValueHandler('password', text)}
          secure={!showPassword}
          onShowPassword={() => setShowPassword((showPassword) => !showPassword)}
          type="password"
        />
        <Pressable
          testID="forgotPassword"
          style={styles.forgotPasswordContainer}
          onPress={() => navigation.navigate('ResetPassword')}
        >
          <Text style={styles.textButton}>Forgot password?</Text>
        </Pressable>
        {errorDisplay}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          disable={!enteredMobile && !enteredPassword}
          onPress={onSubmitHandler}
          loading={loading}
        >
          <Text>LOG IN</Text>
        </Button>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: 'center',
    bottom: SIZES.m20,
    position: 'absolute',
    width: SIZES.s328,
  },
  errorLabel: {
    color: COLORS.error100,
    fontSize: SIZES.f14,
  },
  flagButtonStyle: {
    justifyContent: 'flex-start',
    paddingLeft: SCALE(2),
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginTop: SIZES.m6,
  },
  headerContainer: {
    backgroundColor: COLORS.primary10,
    borderRadius: SIZES.r10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.m16,
    paddingBottom: SIZES.m12,
    paddingHorizontal: SIZES.m10,
    paddingTop: SIZES.m12,
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
  textButton: {
    color: COLORS.primary100,
    fontSize: SIZES.f14,
  },
  urlText: {
    color: COLORS.primary400,
    fontSize: SIZES.f16,
    fontWeight: '500',
  },
});
