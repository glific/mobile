import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import customRender from '../utils/jestRender';

import Collections from '../screens/Collections';
import { GET_COLLECTIONS_MOCK } from '../__mocks__/queries/collection';

const navigationMock = {
  navigate: jest.fn(),
};

describe('Collections Screen', () => {
  test('renders the Collections screen', async () => {
    const { getByTestId, findByText, getByLabelText } = customRender(
      <Collections navigation={navigationMock} />,
      GET_COLLECTIONS_MOCK
    );
    await waitFor(() => {
      expect(getByTestId('searchInput')).toBeDefined();
      expect(getByTestId('searchIcon')).toBeDefined();
      expect(getByTestId('collectionCard1')).toBeDefined();
    });
    const collectionCard = getByTestId('collectionCard1');
    await waitFor(() => {
      expect(collectionCard).toBeDefined();
      expect(findByText('test group1')).toBeTruthy();
    });

    fireEvent.press(collectionCard);

    await waitFor(() => {
      expect(getByLabelText('notification-list')).toBeDefined();
    });
    const flatList = getByLabelText('notification-list');
    flatList.props.onEndReached();

    await waitFor(() => {
      expect(getByTestId('collectionCard10')).toBeDefined();
    });
  });

  test('updates search correctly', async () => {
    const { getByTestId } = customRender(
      <Collections navigation={navigationMock} />,
      GET_COLLECTIONS_MOCK
    );

    await waitFor(() => {
      expect(getByTestId('searchInput')).toBeDefined();
    });

    const searchInput = getByTestId('searchInput');
    fireEvent.changeText(searchInput, 'test search');

    await waitFor(() => {
      expect(searchInput.props.value).toBe('test search');
    });
  });
});
