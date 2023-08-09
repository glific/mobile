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
import {
  messageReceivedSubscription,
  messageSendSubscription,
} from '../__mocks__/subscriptions/message';

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
        messageSendSubscription,
        messageReceivedSubscription,
        NO_SEARCH_CONTACTS_MOCK,
        MARK_AS_READ_MOCK,
        SAVED_SEARCH_QUERY_MOCK,
        SEARCHES_COUNT_MOCK,
        GET_MORE_CONTACTS_MOCK,
      ]
    );
    await waitFor(() => {
      expect(getByTestId('searchInput')).toBeDefined();
      expect(getByTestId('searchIcon')).toBeDefined();
      expect(getByTestId('filterIcon')).toBeDefined();
      expect(getByTestId('contactCard1')).toBeDefined();
    });

    const contactCard = getByTestId('contactCard1');
    fireEvent.press(contactCard);

    await waitFor(() => {
      expect(getByLabelText('notification-list')).toBeDefined();
    });

    const flatList = getByLabelText('notification-list');
    flatList.props.onEndReached();

    // need to actually get the contact card 11 here
    await waitFor(() => {
      expect(getByTestId('contactCard10')).toBeDefined();
    });

    await waitFor(() => {});
  });

  test('should render contacts for savedSearches screen', async () => {
    const { getByTestId } = customRender(
      <Chat navigation={navigationMock} route={paramsRouteMock} />,
      [
        NO_SEARCH_CONTACTS_MOCK,
        MARK_AS_READ_MOCK,
        SAVED_SEARCH_QUERY_MOCK,
        SEARCHES_COUNT_MOCK,
        messageSendSubscription,
        messageReceivedSubscription,
      ]
    );

    await waitFor(() => {
      expect(getByTestId('contactCard1')).toBeDefined();
    });

    const contactCard = getByTestId('contactCard1');
    fireEvent.press(contactCard);
    // wait for some more events to happen
    await waitFor(() => {});
  });

  test('updates search correctly', async () => {
    const { getByTestId } = customRender(
      <Chat navigation={navigationMock} route={noParamsRouteMock} />,
      [
        NO_SEARCH_CONTACTS_MOCK,
        SAVED_SEARCH_QUERY_MOCK,
        SEARCHES_COUNT_MOCK,
        SEARCH_CONTACTS_MOCK,
        messageSendSubscription,
        messageReceivedSubscription,
      ]
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
      [
        NO_SEARCH_CONTACTS_MOCK,
        NO_SEARCH_CONTACTS_MOCK,
        SAVED_SEARCH_QUERY_MOCK,
        SEARCHES_COUNT_MOCK,
        messageSendSubscription,
        messageReceivedSubscription,
      ]
    );
    await waitFor(() => {
      expect(getByText('ts')).toBeDefined();
      expect(getByText('(10)')).toBeDefined();
    });
    const filterButton = getByText('ts');
    fireEvent.press(filterButton);

    // need to test something here
    await waitFor(() => {});
  });
});
