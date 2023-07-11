import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { COLORS, SIZES } from '../constants';
import { validateUrl } from '../utils/helper';
import InstructionCard from '../components/InstructionCard';
import AxiosService from '../config/axios';
import Storage from '../utils/asyncStorage';
import AuthContext from '../config/AuthContext';

type RootStackParamList = {
  Server: undefined;
  Login: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Server'>;

const Server = ({ navigation }: Props) => {
  const { setURL, orgURL, setOrgName } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [serverURL, setServerURL] = useState(orgURL ? orgURL : '');
  const [errorMessage, setErrorMessage] = useState('');

  const serverURLChanged = (value: string) => {
    setServerURL(value);
    setErrorMessage('');
  };

  const onSubmitHandler = async () => {
    if (!serverURL || !validateUrl(`https://api.${serverURL}.tides.coloredcow.com/api`)) {
      setErrorMessage('Please enter valid server url');
      return;
    }

    await Storage.storeData('orgnisationUrl', serverURL);
    setURL(serverURL);
    await AxiosService.updateServerURL(`https://api.${serverURL}.tides.coloredcow.com/api`);

    try {
      setLoading(true);
      const Client = await AxiosService.createAxiosInstance();
      const response = await Client.post('/v1/session/name');
      setOrgName(response?.data?.data?.name);
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
          label="Enter or paste URL here"
          onUpdateValue={serverURLChanged}
          value={serverURL}
          keyboardType="url"
          placeholder="shortcode"
        />
        <Text style={styles.previewUrl}>
          {serverURL ? serverURL : 'shortcode'}.tides.coloredcow.com
        </Text>
        {errorDisplay}
      </View>
      <InstructionCard />
      <View style={styles.buttonContainer}>
        <Button disable={!serverURL} onPress={onSubmitHandler} loading={loading}>
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
