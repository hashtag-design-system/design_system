import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "../index";

describe("<Input.Digit />", () => {
  test("default behaviour", () => {
    render(<Input.Digit />);
    const input = screen.getByTestId("input-digit");

    expect(input).toHaveValue("");
    expect(input.getAttribute("width")).toBeDefined();
    expect(input).not.toHaveAttribute("placeholder");
    expect(input.getAttribute("data-hasfloatingplaceholder")).toBe("false");
    expect(input.getAttribute("aria-label")).toBeNull();
  });
  test("onChange default functionality", () => {
    render(<Input.Digit />);
    const input = screen.getByTestId("input-digit");

    userEvent.type(input, "A");

    expect(input).toHaveValue("A");
  });
});
