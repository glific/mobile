import React from 'react';
import { render } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import { NavigationContainer } from '@react-navigation/native';
import AuthContext from '../config/AuthContext';

const customRender = (
  component: React.ReactElement,
  mocks: Array<unknown> = [],
  authContextValue = {
    token: 'existing_token',
    setToken: jest.fn(),
    org: {
      url: 'https://api.example.tides.coloredcow.com/api',
      shortcode: 'example',
      name: 'Example Organization',
    },
    setOrg: jest.fn(),
    user: {
      accessRoles: [{ id: '1', label: 'Admin' }],
      contact: { id: '1' },
      groups: [
        { description: null, id: '3', label: 'STARTED_AB' },
        { description: null, id: '4', label: 'Default Group' },
      ],
      id: '1',
      language: { id: '1', locale: 'en' },
      name: 'NGO Main Account',
      organization: {
        contact: { phone: '917834811114' },
        id: '1',
      },
      phone: '917834811114',
      roles: [{ id: '1', label: 'Admin' }],
    },
    setUser: jest.fn(),
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
