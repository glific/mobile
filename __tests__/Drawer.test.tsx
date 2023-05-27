import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import AppDrawer from '../navigations/Drawer';
import renderWithAuth from '../utils/authProvider';
import { GET_CONTACTS } from '../graphql/queries/Contact';

describe('AppDrawer', () => {
  const mockContacts = [
    {
      id: '1',
      name: 'test',
      maskedPhone: '12*****90',
    },
  ];

  const mocks = [
    {
      request: {
        query: GET_CONTACTS,
        variables: {
          filter: {},
          messageOpts: { limit: 3, offset: 0 },
          contactOpts: { limit: 10, offset: 0 },
        },
      },
      result: {
        data: {
          search: [
            {
              contact: mockContacts,
            },
          ],
        },
      },
    },
  ];
  it('renders correctly', () => {
    const Drawer = createDrawerNavigator();
    const { getByText, getByTestId } = renderWithAuth(<AppDrawer />, mocks);

    // You can write your assertions here to verify if the component renders correctly.
    // For example, you can check if a specific text is present in the rendered output.
    expect(getByText('Chat')).toBeDefined();
    expect(getByText('Notifications')).toBeDefined();
    expect(getByText('MyAccount')).toBeDefined();
    expect(getByText('Setting')).toBeDefined();
    expect(getByText('Help')).toBeDefined();

    fireEvent(getByTestId('drawerToggleButton'), 'press');

    // expect(getByText('Custom Drawer')).toBeDefined();
  });
});
