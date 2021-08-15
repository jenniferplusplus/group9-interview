import * as React from 'react';
import { render } from 'enzyme';
import Movie from './Movie';

describe('Movie', () => {
  test('matches snapshot', () => {
    const wrapper = render(<Movie />);
    expect(wrapper).toMatchSnapshot();
  });
});
