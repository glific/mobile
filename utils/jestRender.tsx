import React from 'react';
import { render } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import { NavigationContainer } from '@react-navigation/native';
import AuthContext from '../config/AuthContext';

const customRender = (
  component: React.ReactElement,
  mocks = [],
  authContextValue = {
    token: 'existing_token',
    setToken: jest.fn(),
    orgURL: 'example.com',
    setURL: jest.fn(),
  }
) => {
  return render(
    <MockedProvider mocks={mocks}>
      <AuthContext.Provider value={authContextValue}>
        <NavigationContainer>{component}</NavigationContainer>
      </AuthContext.Provider>
    </MockedProvider>
  );
};

export default customRender;
