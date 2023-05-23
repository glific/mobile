import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Button from '../components/ui/Button';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Input from '../components/ui/Input';
import { Colors } from '../constants/styles';
import createAxiosClient from '../config/axios';
import Storage from '../utils/asyncStorage';
import PhoneNumberInput from 'react-native-phone-number-input';

type RootStackParamList = {
  Login: undefined;
  Chat: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = ({ navigation }: Props) => {
  const [enteredMobile, setEnteredMobile] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const Client = createAxiosClient();

  function updateInputValueHandler(inputType: string, enteredValue: string) {
    switch (inputType) {
      case 'mobile':
        setEnteredMobile(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
    }
  }

  const onSubmitHandler = async () => {
    try {
      if (enteredMobile == '' || enteredPassword == '') {
        throw new Error('Please enter mobile number and password!');
      }
      const response = await Client.post('/v1/session', {
        user: {
          phone: enteredMobile,
          password: enteredPassword,
        },
      });

      await Storage.storeData('session', JSON.stringify(response.data.data));
      navigation.navigate('Home');
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
          <Text style={styles.numberLabel}>Enter your WhatsApp number</Text>
          <PhoneNumberInput
            defaultCode="IN"
            onChangeText={updateInputValueHandler.bind(this, 'mobile')}
            layout="first"
            value={enteredMobile}
            placeholder="Enter 10 digit phone number"
            containerStyle={{
              backgroundColor: 'white',
              borderColor: '#93a29b',
              borderWidth: 1,
              borderRadius: 11,
              width: '100%',
            }}
            textContainerStyle={{
              backgroundColor: 'white',
              height: 50,
              borderColor: '#93a29b',
              borderRightWidth: 0.5,
              borderRadius: 11,
              marginLeft: -12,
              paddingVertical: 8,
              paddingHorizontal: 6,
            }}
          />
        </View>

        <View style={styles.passwordContainer}>
          <Input
            label="Enter your password"
            onUpdateValue={updateInputValueHandler.bind(this, 'password')}
            secure={showPassword ? false : true}
            value={enteredPassword}
            isError={errorMessage ? true : false}
            placeholder="Password"
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color="gray" />
          </TouchableOpacity>
        </View>
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
  passwordContainer: {
    marginTop: 20,
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
