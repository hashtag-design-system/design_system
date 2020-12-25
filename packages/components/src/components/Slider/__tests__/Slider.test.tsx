import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent, { specialChars } from "@testing-library/user-event";
import Slider from "../index";

describe("<Slider />", () => {
  test("default behaviour", () => {
    render(<Slider />);
    const input = screen.getByTestId("slider-input");
    const container = screen.getByTestId("slider-container");
    const thumb = screen.getByTestId("slider-thumb");

    // input tests
    expect(input).toBeVisible();
    expect(input).toHaveAttribute("type", "range");
    expect(input).toHaveAttribute("class");
    expect(input).not.toBeDisabled();
    expect(input).toHaveAttribute("aria-disabled", "false");
    expect(input).toHaveAttribute("value", "50");
    expect(input).toHaveAttribute("min", "0");
    expect(input).toHaveAttribute("max", "100");
    expect(input).toHaveAttribute("step", "1");
    expect(input).toHaveAttribute("aria-valuemin", "0");
    expect(input).toHaveAttribute("aria-valuemax", "100");
    expect(input).toHaveAttribute("aria-valuenow", "50");
    expect(input).toHaveAttribute("tabindex", "-1");
    expect(input).toHaveAttribute("role", "slider");

    // container tests
    expect(container).toBeVisible();
    expect(container.children).toHaveLength(1);
    expect(container).toHaveAttribute("class");

    // thumb tests
    expect(thumb).toHaveAttribute("class");
    expect(thumb).not.toHaveClass("hover");
    expect(thumb.style.left).toBe("50%");
  });
  test("onChange default functionality", async () => {
    render(<Slider />);
    const sliderInput = screen.getByTestId("slider-input");

    userEvent.type(sliderInput, specialChars.arrowUp);
    screen.debug();
    await waitFor(() => {
      expect(screen.getByTestId("slider-input")).toHaveAttribute("value", "60");
      expect(screen.getByTestId("slider-input")).toHaveAttribute("aria-valuenow", "60");
      expect(screen.getByTestId("slider-thumb").style.left).toBe("60%");
    });
  });
});
