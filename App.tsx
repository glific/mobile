import 'react-native-gesture-handler';
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { ApolloProvider } from '@apollo/client';

import { COLORS } from './constants';
import { client } from './config/apollo';
import Navigation from "./navigations";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={COLORS.primary400} />
        <Navigation />
      </SafeAreaView>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
