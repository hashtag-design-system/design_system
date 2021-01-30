import {screen, render} from "@testing-library/react";
import { Dots } from "../index";

describe("TimePicker <Dots />", () => {
  test("default behaviour", () => {
    render(<Dots />);
    const dotsContainer = screen.getByTestId("time-picker-dots-container");
    const dots = screen.getAllByTestId("time-picker-dot");

    expect(dotsContainer).toBeVisible();
    expect(dotsContainer.children).toHaveLength(2);
    expect(dots).toHaveLength(2);
    dots.forEach(dot => {
      expect(dot).toHaveAttribute("class");
      expect(dotsContainer).toContainElement(dot);
    })
  })
})