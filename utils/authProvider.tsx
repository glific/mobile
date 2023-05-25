import React from 'react';
import { render } from '@testing-library/react-native';
import AuthContext from '../config/AuthContext';
import { MockedProvider } from '@apollo/client/testing';

const renderWithAuth = (component, mocks = []) =>
  render(
    <MockedProvider mocks={mocks}>
      <AuthContext.Provider value={{ token: 'existing_token', setToken: jest.fn() }}>
        {component}
      </AuthContext.Provider>
    </MockedProvider>
  );

export default renderWithAuth;
