import 'react-native-gesture-handler';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import Navigation from './navigations';
import { Colors } from './constants/styles';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { API_BASE_URL } from '@env';

// import { client } from './config/apollo';

const client = new ApolloClient({
  uri: API_BASE_URL,
  cache: new InMemoryCache(),
});

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
