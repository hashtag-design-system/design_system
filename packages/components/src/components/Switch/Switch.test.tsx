import { render, screen } from "@testing-library/react";
import Switch from "./index";

describe("<Switch />", () => {
  test("default behaviour", () => {
    render(<Switch />);
    const switchBtn = screen.getByTestId("switch-btn");

    expect(switchBtn).toBeVisible();
    // expect(screen.getByRole("checkbox")).toBeVisible();
    // expect(switch.getAttribute("for")).toHaveLength(5);
    // expect(switch.getAttribute("aria-labelledby")).toHaveLength(5);
    // expect(switch.getAttribute("aria-checked")).toBeFalsy();
    // expect(switch.getAttribute("ischecked")).toBeFalsy();
    // expect(switch.getAttribute("tabindex")).toBe("0");
    // expect(switch.onclick).toBeDefined();
    // expect(screen.getByTestId("animated-checkmark")).toBeVisible();
  });
});
