import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import Chat from '../screens/Chat';
import renderWithAuth from '../utils/authProvider';
import { GET_CONTACTS } from '../graphql/queries/Contact';

describe('Contacts screen', () => {
  const mockContacts = {
    id: '1',
    name: 'test',
    maskedPhone: '12*****90',
    lastMessageAt: '2021-08-10T12:00:00.000Z',
  };
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
              contact: mockContacts,
              messages: [
                {
                  id: '1',
                  body: 'test',
                },
              ],
            },
          ],
        },
      },
    },
  ];
  test('renders correctly', async () => {
    const { getByTestId } = renderWithAuth(<Chat />, mocks);
    const searchInput = getByTestId('searchInput');
    const loadingIndicator = getByTestId('loadingIndicator');

    expect(loadingIndicator).toBeTruthy();
    await waitFor(() => {
      expect(searchInput).toBeDefined();
    });
  }, 10000);

  test('updates search correctly', async () => {
    const { getByTestId } = renderWithAuth(<Chat />, mocks);

    const searchInput = getByTestId('searchInput');
    fireEvent.changeText(searchInput, 'test search');

    await waitFor(() => {
      expect(searchInput.props.value).toBe('test search');
    });
  });

  test('should test when search and filter icon pressed', async () => {
    const mockOnSearchHandler = jest.fn();
    const mockOnFilter = jest.fn();

    const { getByTestId } = renderWithAuth(<Chat />, mocks);
    await waitFor(() => {
      fireEvent.press(getByTestId('searchIcon'));
      fireEvent.press(getByTestId('filterOutline'));
    });
    expect(mockOnSearchHandler).toBeTruthy();
    expect(mockOnFilter).toBeTruthy();
  });
});
