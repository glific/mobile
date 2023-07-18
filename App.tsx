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
  const [org, setOrg] = useState(null);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(null);
  const appIsReady = useAppResources(setToken, setOrg, setUser);

  if (!appIsReady) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ token, setToken, org, setOrg, user, setUser, alert, setAlert }}>
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
