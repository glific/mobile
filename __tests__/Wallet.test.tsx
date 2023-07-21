import React from 'react';
import { waitFor } from '@testing-library/react-native';
import customRender from '../utils/jestRender';

import Wallet from '../components/navigation/Wallet';
import { BSP_BALANCE_MOCK } from '../__mocks__/queries/account';

describe('Wallet', () => {
  test('renders the wallet', async () => {
    const { getByTestId, getByText } = customRender(<Wallet />, BSP_BALANCE_MOCK);

    expect(getByTestId('walletIcon')).toBeDefined();
    await waitFor(() => {
      expect(getByText('Your Wallet Balance')).toBeDefined();
      expect(getByText('$ 10.04')).toBeDefined();
    });
  });
});
