import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import customRender from '../utils/jestRender';

import Collections from '../screens/Collections';
import { GET_COLLECTIONS_MOCK } from '../__mocks__/queries/collection';

describe('Collections Screen', () => {
  test('renders the Collections screen', async () => {
    const { getByTestId, findByText } = customRender(<Collections />, GET_COLLECTIONS_MOCK);
    const searchInput = getByTestId('searchInput');
    const searchIcon = getByTestId('searchIcon');
    const filterIcon = getByTestId('filterIcon');

    await waitFor(async () => {
      expect(searchInput).toBeDefined();
      expect(searchIcon).toBeDefined();
      expect(filterIcon).toBeDefined();

      const collectionCard = await getByTestId('collectionCard');
      const testGroup = await findByText('test group');

      expect(collectionCard).toBeTruthy();
      expect(testGroup).toBeTruthy();
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
