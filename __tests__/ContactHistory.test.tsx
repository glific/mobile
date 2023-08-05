import React from 'react';
import customRender from '../utils/jestRender';

import ContactHistory from '../screens/ContactHistory';
import { GET_CONTACT_HISTORY_MOCK, GET_EMPTY_HISTORY_MOCK } from '../__mocks__/queries/history';
import { fireEvent, waitFor } from '@testing-library/react-native';

describe('Contact History', () => {
  test('renders loading indicator for no data', () => {
    const { getByTestId } = customRender(<ContactHistory route={{ params: { id: '2' } }} />);
    expect(getByTestId('loadingIndicator')).toBeDefined();
  });

  test('render with no history data', async () => {
    const { getByText } = customRender(
      <ContactHistory route={{ params: { id: '2' } }} />,
      GET_EMPTY_HISTORY_MOCK
    );
    await waitFor(async () => {
      expect(getByText('No History Available')).toBeDefined();
    });
  });

  test('renders the history list correctly', async () => {
    const { getByText } = customRender(
      <ContactHistory route={{ params: { id: '2' } }} />,
      GET_CONTACT_HISTORY_MOCK
    );
    await waitFor(async () => {
      expect(getByText('Last Active flow is killed as new flow has started')).toBeDefined();
      expect(getByText('Flow Started: FlowName1')).toBeDefined();
    });
  });

  test('renders more history on scroll', async () => {
    const eventData = {
      nativeEvent: {
        contentOffset: {
          y: 50,
        },
        contentSize: {
          // Dimensions of the scrollable content
          height: 500,
          width: 100,
        },
        layoutMeasurement: {
          // Dimensions of the device
          height: 100,
          width: 100,
        },
      },
    };

    const { getByText, getByTestId } = customRender(
      <ContactHistory route={{ params: { id: '2' } }} />,
      GET_CONTACT_HISTORY_MOCK
    );
    await waitFor(() => getByTestId('historyFlatList'));
    const flatList = getByTestId('historyFlatList');
    // fire the event to fetch more history
    fireEvent(flatList, 'onEndReached');
    await waitFor(async () => {
      // scroll futher
      fireEvent(flatList, 'onScroll', eventData);
      expect(getByText('Flow Started: FlowName12')).toBeDefined();
    });
  });
});
