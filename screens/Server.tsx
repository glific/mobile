import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { COLORS, SIZES } from '../constants';
import { validateUrl } from '../utils/helper';
import InstructionCard from '../components/InstructionCard';
import AxiosService from '../config/axios';

type RootStackParamList = {
  Server: undefined;
  Login: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Server'>;

const Server = ({ navigation }: Props) => {
  const [serverURL, setServerURL] = useState('staging.tides.coloredcow.com'); // TODO: Remove this initialization when in production
  const [errorMessage, setErrorMessage] = useState('');

  const serverURLChanged = (value: string) => {
    setServerURL(value);
    setErrorMessage('');
  };

  const onSubmitHandler = async () => {
    if (!serverURL || !validateUrl(`https://api.${serverURL}/api`)) {
      setErrorMessage('Please enter valid server url');
      return;
    }

    await AxiosService.updateServerURL(`https://api.${serverURL}/api`);
    navigation.navigate('Login');
  };

  let errorDisplay;
  if (errorMessage) {
    errorDisplay = <Text style={styles.errorLabel}>{errorMessage}</Text>;
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputContainer}>
        <Input
          testID="server"
          label="Enter or paste URL here"
          onUpdateValue={serverURLChanged}
          value={serverURL}
          isError={errorMessage ? true : false}
          keyboardType="url"
          placeholder="smilefoundation.org/..."
        />
        {errorDisplay}
      </View>
      <InstructionCard />
      <View style={styles.buttonContainer}>
        <Button onPress={onSubmitHandler}>
          <Text>CONTINUE</Text>
        </Button>
      </View>
    </View>
  );
};

export default Server;

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
