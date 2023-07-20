import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import customRender from '../utils/jestRender';

import Collections from '../screens/Collections';
import { GET_COLLECTIONS_MOCK } from '../__mocks__/queries/collection';

describe('Collections Screen', () => {
  test('renders the Collections screen', async () => {
    const { getByTestId, findByText } = customRender(<Collections />, GET_COLLECTIONS_MOCK);

    expect(getByTestId('searchInput'));
    expect(getByTestId('searchIcon'));

    await waitFor(async () => {
      const collectionCard = await getByTestId('collectionCard');

      expect(collectionCard).toBeDefined();
      expect(findByText('test group')).toBeTruthy();

      fireEvent.press(collectionCard);
      // expect(navigateMock).toHaveBeenCalledWith('ChatScreen', {
      //   id: '17',
      //   displayName: 'test',
      //   conversationType: 'collection',
      // });
    });
  });

  test('updates search correctly', async () => {
    const { getByTestId } = customRender(<Collections />, GET_COLLECTIONS_MOCK);

    const searchInput = getByTestId('searchInput');
    fireEvent.changeText(searchInput, 'test search');

    await waitFor(() => {
      expect(searchInput.props.value).toBe('test search');
    });
  });
});
