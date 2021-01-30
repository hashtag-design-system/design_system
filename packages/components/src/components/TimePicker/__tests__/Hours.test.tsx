import { render, screen } from "@testing-library/react";
import TimePicker from "../index";

describe("<TimePicker.Hours />", () => {
  test("default behaviour", () => {
    render(<TimePicker.Hours />);
    const timePicker = screen.getByTestId("time-picker");
    const items = screen.getAllByTestId("time-picker-item");

    expect(timePicker).toBeVisible();
    // Except from the slides, additioncal slides are added due to loopAdditionalSlides
    expect(timePicker.children[0].children.length).toBeGreaterThan(100);
    expect(items.length).toBeGreaterThan(100);
  });
});
