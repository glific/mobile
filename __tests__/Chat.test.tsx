import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import customRender from '../utils/jestRender';

import Chat from '../screens/Chat';
import { NO_SEARCH_CONTACTS_MOCK } from '../__mocks__/queries/contact';
import { MARK_AS_READ_MOCK } from '../__mocks__/mutations/chats';

const noParamsRouteMock = {
  params: undefined,
};

const paramsRouteMock = {
  params: {
    name: 'savedSearches',
    variables: {
      filter: {},
      messageOpts: { limit: 1 },
      contactOpts: { limit: 10, offset: 0 },
    },
  },
};

describe('Contact screen', () => {
  test('renders correctly', async () => {
    const { getByTestId, getByLabelText } = customRender(<Chat route={noParamsRouteMock} />, [
      ...NO_SEARCH_CONTACTS_MOCK,
      ...MARK_AS_READ_MOCK,
    ]);

    expect(getByTestId('searchInput')).toBeDefined();
    expect(getByTestId('searchIcon')).toBeDefined();
    expect(getByTestId('filterIcon')).toBeDefined();

    await waitFor(async () => {
      const contactCard = await getByTestId('contactCard1');
      expect(contactCard).toBeDefined();
      fireEvent.press(contactCard);
    });

    const flatList = getByLabelText('notification-list');
    flatList.props.onEndReached();
    expect(getByTestId('contactCard10')).toBeDefined();
  });

  test('should render contacts for savedSearches screen', async () => {
    const { getByTestId } = customRender(<Chat route={paramsRouteMock} />, [
      ...NO_SEARCH_CONTACTS_MOCK,
      ...MARK_AS_READ_MOCK,
    ]);

    await waitFor(async () => {
      const contactCard = await getByTestId('contactCard1');
      expect(contactCard).toBeDefined();
      fireEvent.press(contactCard);
    });
  });

  test('updates search correctly', async () => {
    const { getByTestId } = customRender(
      <Chat route={noParamsRouteMock} />,
      NO_SEARCH_CONTACTS_MOCK
    );
    const searchInput = getByTestId('searchInput');
    fireEvent.changeText(searchInput, 'test search');
    await waitFor(() => {
      expect(searchInput.props.value).toBe('test search');
    });
  });

  test('should test when search and filter icon pressed', async () => {
    const mockOnSearchHandler = jest.fn();
    const { getByTestId } = customRender(
      <Chat route={noParamsRouteMock} />,
      NO_SEARCH_CONTACTS_MOCK
    );
    const searchIcon = getByTestId('searchIcon');
    fireEvent.press(searchIcon);
    expect(mockOnSearchHandler).toBeTruthy();
  });

  test('should test search filters', async () => {
    const { getByText } = customRender(
      <Chat route={noParamsRouteMock}/>,
      NO_SEARCH_CONTACTS_MOCK);
    await waitFor(async () => {
      const filterButton = await getByText('ts');
      expect(filterButton).toBeDefined();
      expect(getByText('(10)')).toBeDefined();

      fireEvent.press(filterButton);
    });
  });
});
