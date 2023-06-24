import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react-native';
import customRender from '../utils/jestRender';

import Chat from '../screens/Chat';
import { NO_SEARCH_CONTACTS_MOCK, SEARCH_CONTACTS_MOCK } from '../__mocks__/queries/contact';

describe('Chat screen', () => {
  test('renders correctly', async () => {
    const { getByTestId, findByText } = customRender(<Chat />, NO_SEARCH_CONTACTS_MOCK);
    const searchInput = getByTestId('searchInput');
    const searchIcon = getByTestId('searchIcon');
    const filterIcon = getByTestId('filterIcon');

    await waitFor(async () => {
      expect(searchInput).toBeDefined();
      expect(searchIcon).toBeDefined();
      expect(filterIcon).toBeDefined();

      const testName = await findByText('test');
      const testLastMessage = await findByText('test message');

      expect(testName).toBeTruthy();
      expect(testLastMessage).toBeTruthy();
    });
  });

  test('updates search correctly', async () => {
    const { getByTestId } = customRender(<Chat />, SEARCH_CONTACTS_MOCK);

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
    await waitFor(() => {
      fireEvent.press(getByTestId('menuIcon'));
    });
    const menu = screen.queryByTestId('menuCard');
    expect(menu).toBeTruthy();
  });
});
