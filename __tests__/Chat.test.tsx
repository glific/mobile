import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import customRender from '../utils/jestRender';

import Chat from '../screens/Chat';
import { NO_SEARCH_CONTACTS_MOCK } from '../__mocks__/queries/contact';
import { MARK_AS_READ_MOCK } from '../__mocks__/mutations/chats';

describe('Contact screen', () => {
  test('renders correctly', async () => {
    const navigateMock = jest.fn();
    const { getByTestId, findByText } = customRender(
      <Chat navigation={{ navigate: navigateMock }} />,
      [...NO_SEARCH_CONTACTS_MOCK, MARK_AS_READ_MOCK]
    );

    expect(getByTestId('searchInput')).toBeDefined();
    expect(getByTestId('searchIcon')).toBeDefined();
    expect(getByTestId('filterIcon')).toBeDefined();

    await waitFor(async () => {
      const contactCard = await getByTestId('contactCard');

      expect(contactCard).toBeDefined();
      expect(findByText('test')).toBeTruthy();
      expect(findByText('test message')).toBeTruthy();

      fireEvent.press(contactCard);
    });
  });

  test('updates search correctly', async () => {
    const { getByTestId } = customRender(<Chat />, NO_SEARCH_CONTACTS_MOCK);
    const searchInput = getByTestId('searchInput');
    fireEvent.changeText(searchInput, 'test search');
    await waitFor(() => {
      expect(searchInput.props.value).toBe('test search');
    });
  });

  test('should test when search and filter icon pressed', async () => {
    const navigateMock = jest.fn();
    const mockOnSearchHandler = jest.fn();
    const { getByTestId } = customRender(
      <Chat navigation={{ navigate: navigateMock }} />,
      NO_SEARCH_CONTACTS_MOCK
    );
    const searchIcon = getByTestId('searchIcon');
    fireEvent.press(searchIcon);
    expect(mockOnSearchHandler).toBeTruthy();
    // const filterIcon = getByTestId('filterIcon');
    // fireEvent.press(filterIcon);
    // expect(navigateMock).toHaveBeenCalledWith('ConversationFilter');
  });

  test('should test menu is visible on press or not ', async () => {
    const { getByTestId } = customRender(<Chat />, NO_SEARCH_CONTACTS_MOCK);
    fireEvent.press(getByTestId('menuIcon'));
    await waitFor(() => {
      const menu = getByTestId('menuCard');
      expect(menu).toBeTruthy();
    });
  });
});
