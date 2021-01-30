import { render, screen } from "@testing-library/react";
import { Label } from "../index";

describe("TimePicker <Label />", () => {
  test("default behaviour", () => {
    render(<Label />);
    const label = screen.getByTestId("time-picker-label");

    expect(label).toBeVisible();
    expect(label.children).toHaveLength(0);
    expect(label).toHaveAttribute("class");
  });
  test("with children", () => {
    render(<Label>Hours</Label>);
    const label = screen.getByTestId("time-picker-label");

    expect(label.children).toHaveLength(0);
    expect(label).toHaveTextContent("Hours");
  });
});
