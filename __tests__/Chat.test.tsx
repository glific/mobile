import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react-native';
import Chat from '../screens/Chat';
import renderWithAuth from '../utils/authProvider';
import { GET_CONTACTS } from '../graphql/queries/Contact';

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
        filter: { term: '' },
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
                body: 'test message',
              },
            ],
          },
        ],
      },
    },
  },
];

describe('Contacts screen', () => {
  test('renders correctly', async () => {
    const { getByTestId, findByText } = renderWithAuth(<Chat />, mocks);
    const searchInput = getByTestId('searchInput');

    await waitFor(async () => {
      expect(searchInput).toBeDefined();

      const contactCard = await getByTestId('contactCard');
      const testName = await findByText('test');
      const testLastMessage = await findByText('test message');

      expect(contactCard).toBeTruthy();
      expect(testName).toBeTruthy();
      expect(testLastMessage).toBeTruthy();
    });
  });

  test('updates search correctly', async () => {
    const { getByTestId } = renderWithAuth(<Chat />, mocks);

    const searchInput = getByTestId('searchInput');
    fireEvent.changeText(searchInput, 'test search');

    await waitFor(() => {
      expect(searchInput.props.value).toBe('test search');
    });
  });

  test('should test when search and filter icon pressed', async () => {
    const navigateMock = jest.fn();
    const mockOnSearchHandler = jest.fn();

    const { getByTestId } = renderWithAuth(<Chat navigation={{ navigate: navigateMock }} />, mocks);

    await waitFor(async () => {
      const searchIcon = await getByTestId('searchIcon');
      const filterIcon = await getByTestId('filterIcon');
      fireEvent.press(searchIcon);
      expect(mockOnSearchHandler).toBeTruthy();

      fireEvent.press(filterIcon);
      expect(navigateMock).toHaveBeenCalledWith('ConversationFilter');
    });
  });

  test('should test menu is visible on press or not ', async () => {
    const { getByTestId } = renderWithAuth(<Chat />, mocks);
    await waitFor(() => {
      fireEvent.press(getByTestId('menuButton'));
    });
    const menu = screen.queryByTestId('menuId');
    expect(menu).toBeTruthy();
  });
});
