import React from 'react';
import { render } from '@testing-library/react-native';
import AuthContext from './AuthContext';

const renderWithAuth = (component) =>
  render(
    <AuthContext.Provider value={{ token: 'existing_token', setToken: jest.fn() }}>
      {component}
    </AuthContext.Provider>
  );

export default renderWithAuth;
