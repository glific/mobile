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
  const [orgURL, setURL] = useState(null);
  const [user, setUser] = useState(null);
  const appIsReady = useAppResources(setToken, setURL, setUser);

  if (!appIsReady) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <SafeAreaView style={styles.container}>
        <AuthContext.Provider value={{ token, setToken, orgURL, setURL, user, setUser }}>
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
