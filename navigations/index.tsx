import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthStack from './AuthStack';
import AppStack from './AppStack';
import AuthContext from '../config/AuthContext';

const Navigation = () => {
  const { token, org } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {token ? <AppStack /> : <AuthStack initialScreen={!org.name ? 'Server' : 'Login'} />}
    </NavigationContainer>
  );
};

export default Navigation;
