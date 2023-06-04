import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import { GET_COLLECTIONS } from '../graphql/queries/Collection';
import CollectionList from '../components/ui/CollectionList';
import { NavigationContainer } from '@react-navigation/native';

describe('CollectionList component', () => {
  const mocks = [
    {
      request: {
        query: GET_COLLECTIONS,
        variables: {
          filter: { searchGroup: true },
          messageOpts: {
            limit: 3,
            offset: 0,
          },
          contactOpts: {
            limit: 10,
            offset: 0,
          },
        },
      },
      result: {
        data: {
          search: [
            {
              group: {
                id: '1',
                label: 'Collection 1',
              },
            },
            {
              group: {
                id: '2',
                label: 'Collection 2',
              },
            },
          ],
        },
      },
    },
  ];

  it('renders loading indicator while data is loading', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CollectionList />
      </MockedProvider>
    );

    const loadingIndicator = getByTestId('loadingIndicator');
    expect(loadingIndicator).toBeTruthy();
  });

  it('renders collections after data loading', async () => {
    const { findByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <NavigationContainer>
          <CollectionList navigation={{ navigate: jest.fn() }} />
        </NavigationContainer>
      </MockedProvider>
    );

    await waitFor(async () => {
      const collection1 = await findByText('Collection 1');
      expect(collection1).toBeTruthy();
    
      const collection2 = await findByText('Collection 2');
      expect(collection2).toBeTruthy();
    });
    
  });
});
