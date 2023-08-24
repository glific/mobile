import React from 'react';
import { waitFor } from '@testing-library/react-native';
import customRender from '../utils/jestRender';

// import AxiosService from '../config/axios';
// import Storage from '../utils/asyncStorage';
// import CustomDrawer from '../components/navigation/CustomDrawer';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BSP_BALANCE_MOCK } from '../__mocks__/queries/account';
import Wallet from '../components/navigation/Wallet';

// jest.mock('../utils/asyncStorage', () => ({
//   storeData: jest.fn(),
// }));

// const createAxiosInstanceMock = jest.fn();
// const postMock = jest.fn();
// AxiosService.createAxiosInstance = createAxiosInstanceMock;

// createAxiosInstanceMock.mockReturnValue({
//   post: postMock,
// });

// postMock.mockResolvedValue({
//   data: {
//     data: {
//       name: 'staging',
//     },
//   },
// });

describe('App menu drawer', () => {
  //   test('renders drawer correctly', async () => {
  //     const { getByText } = customRender(
  //       <SafeAreaProvider>
  //         <CustomDrawer />
  //       </SafeAreaProvider>,
  //       BSP_BALANCE_MOCK
  //     );

  //     await waitFor(async () => {
  //       expect(createAxiosInstanceMock).toHaveBeenCalled();
  //     });
  //     expect(postMock).toHaveBeenCalledWith('/v1/session/name');

  //     expect(getByText('staging')).toBeDefined();
  //   });

  test('should renders the wallet', async () => {
    const { getByTestId, getByText } = customRender(<Wallet />, BSP_BALANCE_MOCK);

    expect(getByTestId('walletIcon')).toBeDefined();
    await waitFor(() => {
      expect(getByText('Your Wallet Balance')).toBeDefined();
      expect(getByText('$ 10.04')).toBeDefined();
    });
  });

  //   test('should logout', async () => {
  //     const { getByTestId } = customRender(
  //       <SafeAreaProvider>
  //         <CustomDrawer />
  //       </SafeAreaProvider>,
  //       BSP_BALANCE_MOCK
  //     );

  //     const logoutButton = getByTestId('logout');
  //     fireEvent.press(logoutButton);

  //     await waitFor(async () => {
  //       expect(Storage.removeData).toHaveBeenCalledWith('glific_session');
  //       expect(Storage.removeData).toHaveBeenCalledWith('glific_user');
  //     });
  //   });
});
