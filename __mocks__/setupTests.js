jest.mock('../config/axios');
jest.mock('expo-font');
jest.mock('expo-asset');

jest.mock('@react-native-async-storage/async-storage', () => {
  return require('@react-native-async-storage/async-storage/jest/async-storage-mock');
});

jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  return {
    Ionicons: View,
    AntDesign: View,
    Entypo: View,
    Feather: View,
    FontAwesome: View,
    Foundation: View,
    MaterialIcons: View,
    MaterialCommunityIcons: View,
    Octicons: View,
  };
});

jest.mock('react-native-phone-number-input', () => {
  const { TextInput } = jest.requireActual('react-native');
  return jest.fn().mockImplementation((props) => {
    return <TextInput onChange={props.onChangeText} value={props.value} testID="mobileNumber" />;
  });
});
