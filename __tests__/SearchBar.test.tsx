 import React from 'react';
 import { render, fireEvent } from '@testing-library/react-native';
 import SearchBar from '../components/ui/SearchBar';


describe('SearchBar', () => {

  it('should render SearchBar component', () => {
    const { getByTestId } = render(<SearchBar/>);

    const searchIcon = getByTestId('searchIcon');
    const searchInput = getByTestId('searchInput');
    const filterOutline = getByTestId('filterOutline');

    expect(searchIcon).toBeDefined();
    expect(searchInput).toBeDefined();
    expect(filterOutline).toBeDefined();
  });

//   it('should call onSearchHandler when search icon is pressed', () => {
//     const onSearchHandler = jest.fn();
//     const { getByTestId } = render(<SearchBar onSearch
//       ={onSearchHandler} />);

//     fireEvent.press(getByTestId('searchIcon'));

//     expect(onSearchHandler).toHaveBeenCalled();
//   });

//   it('should update the searchValue when text input changes', () => {
//     const { getByTestId } = render(<SearchBar />);
//     const searchInput = getByTestId('searchInput');

//     fireEvent.changeText(searchInput, 'example search');

//     expect(searchInput.props.value).toBe('example search');
//   });

//   it('should call onFilter when filter icon is pressed', () => {
//     const onFilter = jest.fn();
//     const { getByTestId } = render(<SearchBar onFilter={onFilter} />);

//     fireEvent.press(getByTestId('filterOutline'));

//     expect(onFilter).toHaveBeenCalled();
//   });
});
