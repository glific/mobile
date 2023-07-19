import React from 'react';
import customRender from '../utils/jestRender';

import HomeHeaderRight from '../components/headers/HomeHeaderRight';
import { GET_NOTIFICATIONS_COUNT_MOCK } from '../__mocks__/queries/notification';
import { waitFor } from '@testing-library/react-native';

describe('Home Notification Icon', () => {
  test('renders the notification icon', async () => {
    const { getByTestId, getByText } = customRender(
      <HomeHeaderRight />,
      GET_NOTIFICATIONS_COUNT_MOCK
    );
    expect(getByTestId('notificationIcon')).toBeDefined();
    await waitFor(() => {
      expect(getByText('10')).toBeDefined();
    });
  });
});
