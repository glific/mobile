import React from 'react';
import Collections from '../screens/Collections';
import renderWithAuth from '../utils/authProvider';
import { GET_COLLECTIONS } from '../graphql/queries/Collection';

describe('Collections Screen', () => {
  const mockGroups = [
    {
      id: '1',
      label: 'test',
    },
  ];

  const mocks = [
    {
      request: {
        query: GET_COLLECTIONS,
        variables: {
          filter: { searchGroup: true },
          messageOpts: { limit: 3, offset: 0 },
          contactOpts: { limit: 10, offset: 0 },
        },
      },
      response: {
        data: {
          search: [
            {
              group: mockGroups,
            },
          ],
        },
      },
    },
  ];
  test('renders the Collections screen', () => {
    const { getByTestId } = renderWithAuth(<Collections />, mocks);
    const loadingIndicator = getByTestId('loadingIndicator');
    expect(loadingIndicator).toBeTruthy();
  });
});
