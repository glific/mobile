import React from 'react';
import SavedSearches from '../screens/SavedSearches';
import { render, screen } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import { GET_SAVED_SEARCH } from '../graphql/queries/SaveSearch';
import SaveScreenListItem from '../components/ui/SaveScreenListItem';

const mockNavigate = jest.fn();
const mockDispatch = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigate,
      dispatch: mockDispatch,
    }),
  };
});

describe('Save Screen', () => {
  const mocks = [
    {
      request: {
        query: GET_SAVED_SEARCH,
        variables: {
          filter: { term: undefined },
          messageOpts: { limit: 1 },
          contactOpts: { limit: 10 },
        },
      },
      response: {
        data: {
          SavedSearches: [
            {
              id: '1',
              label: 'test',
            },
          ],
        },
      },
    },
  ];
  test('renders the Save screen', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SavedSearches />
      </MockedProvider>
    );
    expect(await screen.findByTestId('loadingIndicator')).toBeTruthy();
    expect(await screen.findByTestId('flatlist')).toBeTruthy();
  });
  test('renders the Save screen', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SaveScreenListItem navigation={mockNavigate} name="helloworld" />
      </MockedProvider>
    );
    expect(await screen.findByTestId('SaveScreenListItemCard')).toBeTruthy();
    expect(await screen.findByTestId('pressableSaveScreen')).toBeTruthy();
  });
});
