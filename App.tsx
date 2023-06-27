import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { ApolloProvider } from '@apollo/client';

import useAppResources from './utils/useAppResources';
import AuthContext from './config/AuthContext';
import { client } from './config/apollo';
import Navigation from './navigations';
import { COLORS } from './constants';

export default function App() {
  const [token, setToken] = useState(null);
  const [isURL, setURL] = useState(null);
  const appIsReady = useAppResources(setToken, setURL);

  if (!appIsReady) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <SafeAreaView style={styles.container}>
        <AuthContext.Provider value={{ token, setToken, orgURL: isURL, setURL }}>
          <StatusBar backgroundColor={COLORS.primary400} />
          <Navigation />
        </AuthContext.Provider>
      </SafeAreaView>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
