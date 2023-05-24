import React from 'react';
import { render } from '@testing-library/react-native';
import AuthContext from '../config/AuthContext';
import { ApolloProvider } from '@apollo/client';
import { client } from '../config/apollo';

const renderWithAuth = (component) =>
  render(
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ token: 'existing_token', setToken: jest.fn() }}>
        {component}
      </AuthContext.Provider>
    </ApolloProvider>
  );

export default renderWithAuth;
