import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { COLORS, SIZES } from '../constants';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

type RootStackParamList = {
  Login: undefined;
  OtpScreen: undefined;
  NewPassword: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'NewPassword'>;

const NewPassword = ({ navigation }: Props) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [inputs, setInputs] = useState({
    newPassword: '',
    confirmPassword: '',
    showNewPassword: false,
    showConfirmPassword: false,
  });

  const handleOnchange = (input: string, text: string | boolean) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const onSaveHandler = async () => {
    try {
      if (inputs.newPassword != inputs.confirmPassword) {
        throw new Error('Confirmed password is not same with new password');
      }

      navigation.navigate('Login');
    } catch (error: unknown) {
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
        <Input
          testID="newPassword"
          label="Enter new password"
          placeholder="New password"
          value={inputs.newPassword}
          onUpdateValue={(text) => handleOnchange('newPassword', text)}
          secure={inputs.showNewPassword ? false : true}
          onShowPassword={() => handleOnchange('showNewPassword', !inputs.showNewPassword)}
          type="password"
        />
        <Input
          testID="confirmPassword"
          label="Confirm new password"
          placeholder="Confirm password"
          value={inputs.confirmPassword}
          onUpdateValue={(text) => handleOnchange('confirmPassword', text)}
          secure={inputs.showConfirmPassword ? false : true}
          onShowPassword={() => handleOnchange('showConfirmPassword', !inputs.showConfirmPassword)}
          type="password"
        />
        {errorDisplay}
      </View>
      <View style={styles.buttonContainer}>
        <Button disable={!inputs.newPassword && !inputs.confirmPassword} onPress={onSaveHandler}>
          <Text>SAVE</Text>
        </Button>
      </View>
    </View>
  );
};

export default NewPassword;

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
  inputContainer: { paddingHorizontal: SIZES.m20 },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    paddingTop: SIZES.m24,
  },
});
