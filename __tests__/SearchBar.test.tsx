import React from 'react';
import { fireEvent, waitFor, screen } from '@testing-library/react-native';
import SearchBar from '../components/ui/SearchBar';
import customRender from '../utils/jestRender';

describe('SearchBar', () => {
  const setSearchValueMock = jest.fn();
  const onSearchMock = jest.fn();

  beforeEach(() => {
    setSearchValueMock.mockClear();
    onSearchMock.mockClear();
  });

  test('should render Search Bar without menu', () => {
    const { getByTestId } = customRender(
      <SearchBar value="" setSearchValue={setSearchValueMock} onSearch={onSearchMock} />
    );

    const searchIcon = getByTestId('searchIcon');
    const searchInput = getByTestId('searchInput');
    const filterIcon = getByTestId('filterIcon');

    expect(searchIcon).toBeDefined();
    expect(searchInput).toBeDefined();
    expect(filterIcon).toBeDefined();
  });

  test('should render Search Bar with menu', () => {
    const { getByTestId } = customRender(
      <SearchBar
        value=""
        setSearchValue={setSearchValueMock}
        onSearch={onSearchMock}
        showMenu={true}
      />
    );

    const searchIcon = getByTestId('searchIcon');
    const searchInput = getByTestId('searchInput');
    const filterIcon = getByTestId('filterIcon');
    const menuIcon = getByTestId('menuIcon');

    expect(searchIcon).toBeDefined();
    expect(searchInput).toBeDefined();
    expect(filterIcon).toBeDefined();
    expect(menuIcon).toBeDefined();
  });

  test('should changes the input value and call onSearch when search button is pressed  ', () => {
    const { getByTestId } = customRender(
      <SearchBar value="" setSearchValue={setSearchValueMock} onSearch={onSearchMock} />
    );
    const searchIcon = getByTestId('searchIcon');
    const searchInput = getByTestId('searchInput');

    fireEvent.changeText(searchInput, 'test');
    expect(setSearchValueMock).toHaveBeenCalledWith('test');

    fireEvent.press(searchIcon);
    expect(onSearchMock).toHaveBeenCalled();
  });

  it('should show menu component when showMenu is true', async () => {
    const { getByTestId } = customRender(
      <SearchBar
        value=""
        setSearchValue={setSearchValueMock}
        onSearch={onSearchMock}
        showMenu={true}
      />
    );
    await waitFor(() => {
      fireEvent.press(getByTestId('menuIcon'));
    });
    const menu = screen.queryByTestId('menuCard');
    expect(menu).toBeTruthy();
  });
});
