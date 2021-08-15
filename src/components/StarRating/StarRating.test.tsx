import * as React from "react";
import { shallow } from "enzyme";
import StarRating from "./StarRating";

describe("StarRating", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<StarRating />);
    expect(wrapper).toMatchSnapshot();
  });
});
