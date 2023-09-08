// eslint-disable-next-line react-native/split-platform-components
import { ToastAndroid, Platform, Alert } from 'react-native';

export const showToast = (message: string) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert(message);
  }
};
