import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { COLORS, SIZES } from '../constants';
import InstructionCard from '../components/InstructionCard';
import AxiosService from '../config/axios';
import Storage from '../utils/asyncStorage';
import AuthContext from '../config/AuthContext';
import { SERVER_URL_SUFFIX } from '../config';

type RootStackParamList = {
  Server: undefined;
  Login: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Server'>;

const Server = ({ navigation }: Props) => {
  const { org, setOrg } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [serverCode, setServerCode] = useState(org && org.shortcode ? org.shortcode : '');
  const [errorMessage, setErrorMessage] = useState('');

  const serverCodeChanged = (value: string) => {
    setServerCode(value);
    setErrorMessage('');
  };

  const onSubmitHandler = async () => {
    const orgUrl = `https://api.${serverCode}.${SERVER_URL_SUFFIX}/api`;
    const wsUrl = `wss://api.${serverCode}.${SERVER_URL_SUFFIX}/socket`;
    if (serverCode.length < 2) {
      setErrorMessage('Please enter valid organization code');
      return;
    }

    await AxiosService.updateServerURL(orgUrl);
    try {
      setLoading(true);
      const client = await AxiosService.createAxiosInstance();
      const response = await client.post('/v1/session/name');

      const orgData = {
        url: orgUrl,
        wsUrl: wsUrl,
        shortcode: serverCode,
        name: response?.data?.data?.name,
      };
      await Storage.storeData('glific_organisation', JSON.stringify(orgData));

      setOrg(orgData);
      setLoading(false);
      navigation.navigate('Login');
    } catch (error) {
      setErrorMessage('Sorry! Unable to find this organization');
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
        <Input
          testID="server"
          label="Enter or paste shortcode here"
          onUpdateValue={serverCodeChanged}
          value={serverCode}
          keyboardType="url"
          placeholder="shortcode"
        />
        <Text style={styles.previewUrl}>
          {serverCode ? serverCode : 'shortcode'}.{SERVER_URL_SUFFIX}
        </Text>
        {errorDisplay}
      </View>
      <InstructionCard />
      <View style={styles.buttonContainer}>
        <Button disable={!serverCode} onPress={onSubmitHandler} loading={loading}>
          <Text style={styles.buttonText}>Continue</Text>
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
  buttonText: {
    textTransform: 'uppercase',
  },
  errorLabel: {
    color: COLORS.error100,
    fontSize: SIZES.f14,
  },
  inputContainer: { paddingHorizontal: SIZES.m20 },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    paddingTop: SIZES.m24,
  },
  previewUrl: {
    color: COLORS.darkGray,
    fontSize: SIZES.f12,
    marginBottom: SIZES.m4,
    marginHorizontal: SIZES.m10,
    marginTop: -SIZES.m6,
  },
});
