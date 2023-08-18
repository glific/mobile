import React from 'react';
import { waitFor } from '@testing-library/react-native';
import customRender from '../utils/jestRender';

import ContactHistory from '../screens/ContactHistory';
import { GET_CONTACT_HISTORY_MOCK, GET_EMPTY_HISTORY_MOCK } from '../__mocks__/queries/history';

describe('Contact History', () => {
  test('renders loading indicator for no data', async () => {
    const { getByTestId } = customRender(
      <ContactHistory route={{ params: { id: '2' } }} />,
      GET_CONTACT_HISTORY_MOCK
    );
    await waitFor(() => {
      expect(getByTestId('loadingIndicator')).toBeDefined();
    });
  });

  test('render with no history data', async () => {
    const { getByText } = customRender(
      <ContactHistory route={{ params: { id: '2' } }} />,
      GET_EMPTY_HISTORY_MOCK
    );
    await waitFor(() => {
      expect(getByText('No History Available')).toBeDefined();
    });
  });

  test('renders the history list correctly', async () => {
    const { getByText, getByLabelText } = customRender(
      <ContactHistory route={{ params: { id: '2' } }} />,
      GET_CONTACT_HISTORY_MOCK
    );
    await waitFor(async () => {
      expect(getByText('Last Active flow is killed as new flow has started')).toBeDefined();
      expect(getByText('Flow Started: FlowName1')).toBeDefined();
    });

    // Todo: need to see how to get the next set of items in flatlist. The below expectations is not correct
    const flatList = getByLabelText('history-list');
    flatList.props.onEndReached();
    await waitFor(() => {
      expect(getByText('Flow Started: FlowName10')).toBeDefined();
    });

    await waitFor(() => {});
  });
});
