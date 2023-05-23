import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Colors } from '../constants/styles';
import { validateUrl } from '../utils/helper';
import InstructionCard from '../components/InstructionCard';

type RootStackParamList = {
  Server: undefined;
  Login: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Server'>;

const Server = ({ navigation }: Props) => {
  const [serverURL, setServerURL] = useState('https://glific.test');
  const [errorMessage, setErrorMessage] = useState('');

  const serverURLChanged = (value: string) => {
    setServerURL(value);
    setErrorMessage('');
  };

  const onSubmitHandler = () => {
    if (!serverURL || !validateUrl(serverURL)) {
      setErrorMessage('Please enter valid server url');
      return;
    }

    // navigate to next page
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
          label="Enter or paste URL here"
          onUpdateValue={serverURLChanged}
          value={serverURL}
          isError={errorMessage ? true : false}
          keyboardType="url"
          placeholder="https://smilefoundation.org/..."
        />
      </View>
      <InstructionCard />
      <View style={styles.buttonContainer}>
        {errorDisplay}
        <Button onPress={onSubmitHandler}>
          <Text>CONTINUE</Text>
        </Button>
      </View>
    </View>
  );
};

export default Server;

const styles = StyleSheet.create({
  inputContainer: { paddingHorizontal: 20 },
  mainContainer: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '92%',
    alignSelf: 'center',
  },
  errorLabel: {
    color: Colors.error100,
  },
});
