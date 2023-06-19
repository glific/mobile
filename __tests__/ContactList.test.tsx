import React from 'react';
import { cleanup, render, waitFor } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import { GET_CONTACTS } from '../graphql/queries/Contact';
import ContactList from '../components/ui/ContactList';
import { NavigationContainer } from '@react-navigation/native';

describe('ContactList component', () => {
  const mockContacts = [
    {
      id: '1',
      name: 'John Doe',
      lastMessageAt: '2022-01-01T12:00:00Z',
      lastMessage: 'Hello',
    },
    {
      id: '2',
      maskedPhone: '12*****90',
      lastMessageAt: '2022-01-02T12:00:00Z',
      lastMessage: 'Hi',
    },
  ];

  const mocks = [
    {
      request: {
        query: GET_CONTACTS,
        variables: {
          filter: {},
          messageOpts: { limit: 1 },
          contactOpts: { limit: 10 },
        },
      },
      result: {
        data: {
          search: [
            {
              contact: {
                id: '1',
                name: 'John Doe',
                maskedPhone: '1234567890',
                lastMessageAt: '2022-01-01T12:00:00Z',
              },
              messages: [
                {
                  id: '1',
                  body: 'Hello',
                },
              ],
            },
          ],
        },
      },
    },
  ];
  afterEach(() => {
    cleanup(); // Clean up rendered components and handles after each test
  });

  it('renders loading indicator while data is loading', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ContactList />
      </MockedProvider>
    );

    const loadingIndicator = getByTestId('loadingIndicator');
    expect(loadingIndicator).toBeTruthy();
  });

});
