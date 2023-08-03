import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import customRender from '../utils/jestRender';

import Chat from '../screens/Chat';
import {
  GET_MORE_CONTACTS_MOCK,
  NO_SEARCH_CONTACTS_MOCK,
  SAVED_SEARCH_QUERY_MOCK,
  SEARCHES_COUNT_MOCK,
  SEARCH_CONTACTS_MOCK,
} from '../__mocks__/queries/contact';
import { MARK_AS_READ_MOCK } from '../__mocks__/mutations/chats';

const noParamsRouteMock = {
  params: undefined,
};

const paramsRouteMock = {
  params: {
    name: 'savedSearch',
    variables: {
      filter: {},
      messageOpts: { limit: 1 },
      contactOpts: { limit: 10, offset: 0 },
    },
  },
};

const navigationMock = {
  navigate: jest.fn(),
};

describe('Contact screen', () => {
  test('renders correctly', async () => {
    const { getByTestId, getByLabelText } = customRender(
      <Chat navigation={navigationMock} route={noParamsRouteMock} />,
      [
        NO_SEARCH_CONTACTS_MOCK,
        MARK_AS_READ_MOCK,
        SAVED_SEARCH_QUERY_MOCK,
        SEARCHES_COUNT_MOCK,
        GET_MORE_CONTACTS_MOCK,
      ]
    );

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
  }, 5000);

  test('should render contacts for savedSearches screen', async () => {
    const { getByTestId } = customRender(
      <Chat navigation={navigationMock} route={paramsRouteMock} />,
      [NO_SEARCH_CONTACTS_MOCK, MARK_AS_READ_MOCK, SAVED_SEARCH_QUERY_MOCK, SEARCHES_COUNT_MOCK]
    );

    await waitFor(async () => {
      const contactCard = await getByTestId('contactCard1');
      expect(contactCard).toBeDefined();
      fireEvent.press(contactCard);
    });
  });

  test('updates search correctly', async () => {
    const { getByTestId } = customRender(
      <Chat navigation={navigationMock} route={noParamsRouteMock} />,
      [NO_SEARCH_CONTACTS_MOCK, SAVED_SEARCH_QUERY_MOCK, SEARCHES_COUNT_MOCK, SEARCH_CONTACTS_MOCK]
    );
    const searchInput = getByTestId('searchInput');
    const searchIcon = getByTestId('searchIcon');

    fireEvent.changeText(searchInput, 'test search');

    await waitFor(() => {
      expect(searchInput.props.value).toBe('test search');
      fireEvent.press(searchIcon);
    });
  });

  test('should test search filters', async () => {
    const { getByText } = customRender(
      <Chat navigation={navigationMock} route={noParamsRouteMock} />,
      [NO_SEARCH_CONTACTS_MOCK, SAVED_SEARCH_QUERY_MOCK, SEARCHES_COUNT_MOCK]
    );
    await waitFor(async () => {
      const filterButton = await getByText('ts');
      expect(filterButton).toBeDefined();
      expect(getByText('(10)')).toBeDefined();

      fireEvent.press(filterButton);
    });
  });
});
