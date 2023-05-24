import 'react-native-gesture-handler';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import Navigation from './navigations';
import { Colors } from './constants/styles';
import { ApolloProvider } from '@apollo/client';
import { client } from './config/apollo';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary400} />
      <ApolloProvider client={client}>
        <Navigation />
      </ApolloProvider>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
