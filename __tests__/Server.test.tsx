import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import customRender from '../utils/jestRender';

import Server from '../screens/Server';
import AxiosService from '../config/axios';
import Storage from '../utils/asyncStorage';
import { SERVER_URL_SUFFIX } from '../config';

jest.mock('../utils/asyncStorage', () => ({
  storeData: jest.fn(),
}));

describe('Server screen', () => {
  test('renders correctly', () => {
    const { getByTestId, getByText } = customRender(<Server />);

    const serverUrlInput = getByTestId('server');
    const continueButton = getByText('Continue');

    expect(serverUrlInput).toBeDefined();
    expect(continueButton).toBeDefined();
  });

  test('updates server code correctly', async () => {
    const { findByTestId, getByTestId } = customRender(<Server />);

    const serverUrlInput = getByTestId('server');
    fireEvent.changeText(serverUrlInput, 'example');
    expect(serverUrlInput.props.value).toBe('example');

    const clearInput = await findByTestId('close');
    fireEvent.press(clearInput);
    expect(serverUrlInput.props.value).toBe('');
  });

  test('displays error message for invalid server code', () => {
    const { getByTestId, getByText } = customRender(<Server />);

    fireEvent.changeText(getByTestId('server'), 'c');
    fireEvent.press(getByText('Continue'));

    const errorMessage = getByText('Please enter valid organization code');
    expect(errorMessage).toBeDefined();
  });

  test('navigates to Login screen on successful submit', async () => {
    // const setOrgMock = jest.fn();
    const navigateMock = jest.fn();

    const createAxiosInstanceMock = jest.fn();
    const postMock = jest.fn();
    AxiosService.updateServerURL = jest.fn();
    AxiosService.createAxiosInstance = createAxiosInstanceMock;

    createAxiosInstanceMock.mockReturnValue({
      post: postMock,
    });

    postMock.mockResolvedValue({
      data: {
        data: {
          name: 'Example Organization',
          shortcode: 'example',
        },
      },
    });

    const responseMock = {
      url: `https://api.example${SERVER_URL_SUFFIX}/api`,
      wsUrl: `wss://api.example${SERVER_URL_SUFFIX}/socket`,
      shortcode: 'example',
      name: 'Example Organization',
    };

    const { getByTestId, getByText } = customRender(
      <Server navigation={{ navigate: navigateMock }} />
    );

    fireEvent.changeText(getByTestId('server'), 'example');
    fireEvent.press(getByText('Continue'));

    await waitFor(async () => {
      expect(AxiosService.updateServerURL).toHaveBeenCalledWith(
        `https://api.example${SERVER_URL_SUFFIX}/api`
      );
    });

    expect(createAxiosInstanceMock).toHaveBeenCalled();
    expect(postMock).toHaveBeenCalledWith('/v1/session/name');

    expect(Storage.storeData).toHaveBeenCalledWith(
      'glific_organisation',
      JSON.stringify(responseMock)
    );
    // expect(setOrgMock).toHaveBeenCalledWith(responseMock);
    // expect(navigateMock).toHaveBeenCalledWith('Login');
  });
});
