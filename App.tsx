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
    <AuthContext.Provider value={{ token, setToken, orgURL, setURL, user, setUser }}>
      <ApolloProvider client={client}>
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor={COLORS.primary400} />
          <Navigation />
        </SafeAreaView>
      </ApolloProvider>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
