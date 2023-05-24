import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import Storage from '../utils/asyncStorage';
import AuthContext from '../config/AuthContext';

const getToken = async (setToken) => {
  const sessionValue = await Storage.getData('session');
  if (sessionValue !== null) {
    const parsedSessionValue = JSON.parse(sessionValue);
    setToken(parsedSessionValue.access_token);
  }
};

const Navigation = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    getToken(setToken);
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <NavigationContainer>{token ? <AppStack /> : <AuthStack />}</NavigationContainer>
    </AuthContext.Provider>
  );
};

export default Navigation;
