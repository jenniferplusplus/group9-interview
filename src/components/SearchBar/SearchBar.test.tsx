import * as React from 'react';
import { render } from 'enzyme';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  test('matches snapshot', () => {
    const wrapper = render(<SearchBar />);
    expect(wrapper).toMatchSnapshot();
  });
});
