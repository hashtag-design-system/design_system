import { screen, render } from "@testing-library/react";
import TimePicker from "../index";

describe("<TimePicker.Minutes />", () => {
  test("default behaviour", () => {
    render(<TimePicker.Minutes />);
    const timePicker = screen.getByTestId("time-picker");

    expect(timePicker).toBeVisible();
  });
});
