import { screen, render } from "@testing-library/react";
import TimePicker from "../index";

describe("<TimePicker.Seconds />", () => {
  test("default behaviour", () => {
    render(<TimePicker.Seconds />);
    const timePicker = screen.getByTestId("time-picker");

    expect(timePicker).toBeVisible();
  });
});
