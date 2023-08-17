jest.mock('../config/axios');
jest.mock('@expo/vector-icons');

jest.mock('@react-native-async-storage/async-storage', () => {
  return require('@react-native-async-storage/async-storage/jest/async-storage-mock');
});

jest.mock('react-native-phone-number-input', () => {
  const { TextInput } = jest.requireActual('react-native');
  return jest.fn().mockImplementation((props) => {
    return <TextInput onChange={props.onChangeText} value={props.value} testID="mobileNumber" />;
  });
});
