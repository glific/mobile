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

    expect(getByTestId('searchInput'));
    expect(getByTestId('searchIcon'));

    await waitFor(async () => {
      const collectionCard = await getByTestId('collectionCard1');

      expect(collectionCard).toBeDefined();
      expect(findByText('test group1')).toBeTruthy();

      fireEvent.press(collectionCard);
    });

    const flatList = getByLabelText('notification-list');
    flatList.props.onEndReached();
    expect(getByTestId('collectionCard10')).toBeDefined();
  });

  test('updates search correctly', async () => {
    const { getByTestId } = customRender(
      <Collections navigation={navigationMock} />,
      GET_COLLECTIONS_MOCK
    );

    const searchInput = getByTestId('searchInput');
    fireEvent.changeText(searchInput, 'test search');

    await waitFor(() => {
      expect(searchInput.props.value).toBe('test search');
    });
  });
});
