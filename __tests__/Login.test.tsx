import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import customRender from '../utils/jestRender';

import Login from '../screens/Login';
import AxiosService from '../config/axios';
import Storage from '../utils/asyncStorage';
import { getCurrentUserQuery } from '../__mocks__/queries/user';

jest.mock('../utils/asyncStorage', () => ({
  storeData: jest.fn(),
}));

describe('Login screen', () => {
  test('renders correctly', () => {
    const { getByTestId, getByText } = customRender(<Login />);

    expect(getByTestId('organisationURL')).toBeDefined();
    expect(getByTestId('mobileNumber')).toBeDefined();
    expect(getByTestId('password')).toBeDefined();
    expect(getByText('Log in')).toBeDefined();
  });

  test('updates input values correctly', () => {
    const { getByTestId } = customRender(<Login />);

    const mobileInput = getByTestId('mobileNumber');
    const passwordInput = getByTestId('password');

    fireEvent.changeText(mobileInput, '7834811114');
    fireEvent.changeText(passwordInput, 'secret1234');

    expect(mobileInput.props.value).toBe('7834811114');
    expect(passwordInput.props.value).toBe('secret1234');
  });

  test('should login successfully', async () => {
    // const setTokenMock = jest.fn();
    const navigateMock = jest.fn();

    const createAxiosInstanceMock = jest.fn();
    const postMock = jest.fn();
    AxiosService.createAxiosInstance = createAxiosInstanceMock;

    createAxiosInstanceMock.mockReturnValue({
      post: postMock,
    });

    postMock.mockResolvedValue({
      data: {
        data: {
          access_token: 'safbwuf.dwuqwfrbq',
          renewal_token: 'fwhrfwifh.qwq39rhbsa',
          token_expiry_time: '10:00:00T00:00:00',
        },
      },
    });

    const responseMock = {
      access_token: 'safbwuf.dwuqwfrbq',
      renewal_token: 'fwhrfwifh.qwq39rhbsa',
      token_expiry_time: '10:00:00T00:00:00',
    };

    const { getByTestId, getByText } = customRender(
      <Login navigation={{ navigate: navigateMock }} />,
      [getCurrentUserQuery]
    );

    fireEvent.changeText(getByTestId('mobileNumber'), '7834811114');
    fireEvent.changeText(getByTestId('password'), 'secret1234');
    fireEvent.press(getByText('Log in'));

    await waitFor(async () => {
      expect(createAxiosInstanceMock).toHaveBeenCalled();
    });
    expect(postMock).toHaveBeenCalledWith('/v1/session', {
      user: {
        phone: 'undefined7834811114',
        password: 'secret1234',
      },
    });
    expect(Storage.storeData).toHaveBeenCalledWith('glific_session', JSON.stringify(responseMock));
    // expect(setTokenMock).toHaveBeenCalledWith(responseMock.access_token);
  });

  // test('should navigate to reset password screen', async () => {
  //   const navigateMock = jest.fn();
  //   const { getByTestId } = customRender(<Login navigation={{ navigate: navigateMock }} />);

  //   fireEvent.press(getByTestId('forgotPassword'));
  //   await waitFor(() => {
  //     expect(navigateMock).toHaveBeenCalledWith('ResetPassword');
  //   });
  // });

  test('should navigate to add organisation url screen', async () => {
    const navigateMock = jest.fn();
    const { getByTestId } = customRender(<Login navigation={{ navigate: navigateMock }} />);

    fireEvent.press(getByTestId('changeURL'));
    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('Server');
    });
  });
});
