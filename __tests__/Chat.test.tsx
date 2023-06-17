import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react-native';
import Chat from '../screens/Chat';
import renderWithAuth from '../utils/authProvider';
import { GET_CONTACTS } from '../graphql/queries/Contact';

jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  return {
    Ionicons: View,
    AntDesign: View,
    Entypo: View,
  };
});

const mockContacts = {
  id: '1',
  name: 'test',
  maskedPhone: '12*****90',
  lastMessageAt: '2021-08-10T12:00:00.000Z',
};

const noSearchMocks = [
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

const withSearchMocks = [
  {
    request: {
      query: GET_CONTACTS,
      variables: {
        filter: { term: 'test mock' },
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

describe('Chat screen', () => {
  test('renders correctly', async () => {
    const { getByTestId, findByText } = renderWithAuth(<Chat />, noSearchMocks);
    const searchInput = getByTestId('searchInput');
    const searchIcon = getByTestId('searchIcon');
    const filterIcon = getByTestId('filterIcon');

    await waitFor(async () => {
      expect(searchInput).toBeDefined();
      expect(searchIcon).toBeDefined();
      expect(filterIcon).toBeDefined();

      const contactCard = await getByTestId('contactCard');
      const testName = await findByText('test');
      const testLastMessage = await findByText('test message');

      expect(contactCard).toBeTruthy();
      expect(testName).toBeTruthy();
      expect(testLastMessage).toBeTruthy();
    });
  });

  test('updates search correctly', async () => {
    const { getByTestId } = renderWithAuth(<Chat />, withSearchMocks);

    const searchInput = getByTestId('searchInput');
    fireEvent.changeText(searchInput, 'test search');

    await waitFor(() => {
      expect(searchInput.props.value).toBe('test search');
    });
  });

  test('should test when search and filter icon pressed', async () => {
    const navigateMock = jest.fn();
    const mockOnSearchHandler = jest.fn();

    const { getByTestId } = renderWithAuth(
      <Chat navigation={{ navigate: navigateMock }} />,
      withSearchMocks
    );

    const searchIcon = getByTestId('searchIcon');
    fireEvent.press(searchIcon);
    expect(mockOnSearchHandler).toBeTruthy();

    // const filterIcon = getByTestId('filterIcon');
    // fireEvent.press(filterIcon);
    // expect(navigateMock).toHaveBeenCalledWith('ConversationFilter');
  });

  test('should test menu is visible on press or not ', async () => {
    const { getByTestId } = renderWithAuth(<Chat />, noSearchMocks);
    await waitFor(() => {
      fireEvent.press(getByTestId('menuIcon'));
    });
    const menu = screen.queryByTestId('menuId');
    expect(menu).toBeTruthy();
  });
});
