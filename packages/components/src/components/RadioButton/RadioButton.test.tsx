import { render, screen } from "@testing-library/react";
import RadioButton from "./index";

describe("<RadioButton />", () => {
  test("default behaviour", () => {
    render(<RadioButton />);
    const radioBtn = screen.getByTestId("radio-btn");

    expect(radioBtn).toBeVisible();
    // expect(screen.getByRole("checkbox")).toBeVisible();
    // expect(radioBtn.getAttribute("for")).toHaveLength(5);
    // expect(radioBtn.getAttribute("aria-labelledby")).toHaveLength(5);
    // expect(radioBtn.getAttribute("aria-checked")).toBeFalsy();
    // expect(radioBtn.getAttribute("ischecked")).toBeFalsy();
    // expect(radioBtn.getAttribute("tabindex")).toBe("0");
    // expect(radioBtn.onclick).toBeDefined();
    // expect(screen.getByTestId("animated-checkmark")).toBeVisible();
  });
});
