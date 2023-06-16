import React from 'react';
import { render } from '@testing-library/react-native';
import AuthContext from '../config/AuthContext';
import { MockedProvider } from '@apollo/client/testing';
import { NavigationContainer } from '@react-navigation/native';

const renderWithAuth = (component: any, mocks = []) =>
  render(
    <MockedProvider mocks={mocks}>
      <AuthContext.Provider value={{ token: 'existing_token', setToken: jest.fn() }}>
        <NavigationContainer>{component}</NavigationContainer>
      </AuthContext.Provider>
    </MockedProvider>
  );

export default renderWithAuth;
