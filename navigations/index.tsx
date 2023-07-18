import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthStack from './AuthStack';
import AppStack from './AppStack';
import AuthContext from '../config/AuthContext';
import PopupAlert from '../components/ui/PopupAlert';

const Navigation = () => {
  const { token, org, alert } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {token ? <AppStack /> : <AuthStack initialScreen={!org ? 'Server' : 'Login'} />}
      {alert && <PopupAlert />}
    </NavigationContainer>
  );
};

export default Navigation;
