import 'react-native-gesture-handler';
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import Navigation from "./navigations";
import { Colors } from './constants/styles';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary400} />
      <Navigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
