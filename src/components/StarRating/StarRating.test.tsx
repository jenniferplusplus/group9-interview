import * as React from "react";
import { render } from "enzyme";
import StarRating from "./StarRating";

describe("StarRating", () => {
  test("matches snapshot", () => {
    const wrapper = render(<StarRating />);
    expect(wrapper).toMatchSnapshot();
  });
});
