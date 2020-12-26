import { render, screen } from "@testing-library/react";
import userEvent, { specialChars } from "@testing-library/user-event";
import React from "react";
import { calculatePercentage } from "../../../utils";
import Slider from "../index";
import { TEST_CHART_DATA } from "../__helpers__/Chart/Chart.test";
import { defaultProps } from "../__helpers__/utils";

export const TEST_MARKS = [
  { value: 0, label: "0" },
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 30, label: "30" },
  { value: 40, label: "40" },
  { value: 50, label: "50" },
  { value: 60, label: "60" },
  { value: 70, label: "70" },
  { value: 80, label: "80" },
  { value: 90, label: "90" },
  { value: 100, label: "100" },
];

describe("<Slider />", () => {
  test("default behaviour", () => {
    render(<Slider />);
    const input = screen.getByTestId("slider-input");
    const container = screen.getByTestId("slider-container");
    const thumb = screen.getByTestId("slider-thumb");
    const sliderField = screen.getByTestId("slider-field");

    // input tests
    expect(input).toBeVisible();
    expect(input).toHaveAttribute("type", "range");
    expect(input).toHaveAttribute("class");
    expect(input).not.toBeDisabled();
    expect(input).toHaveAttribute("aria-disabled", "false");
    expect(input).toHaveValue("50");
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

    // sliderField tests
    expect(sliderField).toBeVisible();
    expect(sliderField.children).toHaveLength(3);

    expect(screen.queryByTestId("slider-marks-container")).toBeNull();
  });
  test("keyDown default functionality", async () => {
    render(<Slider />);
    const input = screen.getByTestId("slider-input");

    for (let i = 0; i < 10; i++) {
      userEvent.type(input, specialChars.arrowRight);
    }

    expect(input).toHaveValue("60");
    expect(input).toHaveAttribute("aria-valuenow", "60");
    expect(screen.getByTestId("slider-thumb").style.left).toBe("60%");

    for (let i = 0; i < 5; i++) {
      userEvent.type(input, specialChars.arrowLeft);
    }

    expect(input).toHaveValue("55");
    expect(input).toHaveAttribute("aria-valuenow", "55");
    expect(screen.getByTestId("slider-thumb").style.left).toBe("55%");

    for (let i = 0; i < 10; i++) {
      userEvent.type(input, specialChars.arrowUp);
    }

    expect(input).toHaveValue("65");
    expect(input).toHaveAttribute("aria-valuenow", "65");
    expect(screen.getByTestId("slider-thumb").style.left).toBe("65%");

    for (let i = 0; i < 5; i++) {
      userEvent.type(input, specialChars.arrowDown);
    }

    expect(input).toHaveValue("60");
    expect(input).toHaveAttribute("aria-valuenow", "60");
    expect(screen.getByTestId("slider-thumb").style.left).toBe("60%");
  });
  test('state="focus-visible"', () => {
    render(<Slider thumb={{ state: "focus-visible" }} />);

    expect(screen.getByTestId("slider-thumb")).toHaveClass("focus-visible");
  });
  test('state="hover"', async () => {
    render(<Slider thumb={{ state: "hover" }} />);
    const thumb = screen.getByTestId("slider-thumb");

    expect(thumb).toHaveClass("hover");
    userEvent.unhover(thumb);
    expect(thumb).toHaveClass("hover");
  });
  test('state="hover", with disabled={true}', () => {
    render(<Slider thumb={{ state: "hover" }} disabled />);

    expect(screen.getByTestId("slider-thumb")).not.toHaveClass("hover");
  });
  test("disabled state", () => {
    const { rerender } = render(<Slider thumb={{ state: "disabled" }} />);
    const container = screen.getByTestId("slider-container");
    const input = screen.getByTestId("slider-input");

    expect(container).toHaveClass("disabled");
    expect(input).toBeDisabled();

    rerender(<Slider disabled />);

    expect(container).toHaveClass("disabled");
    expect(input).toBeDisabled();

    rerender(<Slider aria-disabled="true" />);

    expect(container).toHaveClass("disabled");
    expect(input).toBeDisabled();
  });
  test("with chart, overlay style", () => {
    render(<Slider chart={TEST_CHART_DATA} />);
    const overlay = screen.getByTestId("slider-chart-overlay-container");

    expect(overlay).toBeVisible();
    expect(overlay.style.right).toBe(
      `${calculatePercentage(
        parseFloat(defaultProps.max!.toString()) / 2,
        parseFloat(defaultProps.min!.toString()),
        parseFloat(defaultProps.max!.toString())
      )}%`
    );
  });
  test("thumb onHover default behaviour", () => {
    render(<Slider />);
    const thumb = screen.getByTestId("slider-thumb");
    const initialWidth = parseFloat(thumb.style.width);
    const initialHeight = parseFloat(thumb.style.height);

    userEvent.hover(thumb);
    expect(thumb).toHaveClass("hover");
    expect(parseFloat(thumb.style.width)).toBeGreaterThan(initialWidth);
    expect(parseFloat(thumb.style.height)).toBeGreaterThan(initialHeight);

    userEvent.unhover(thumb);
    expect(thumb).not.toHaveClass("hover");
    expect(parseFloat(thumb.style.width)).toBe(initialWidth);
    expect(parseFloat(thumb.style.height)).toBe(initialHeight);
  });
  test("number input related attributes", () => {
    render(<Slider min={4} max={10} step={2} />);
    const input = screen.getByTestId("slider-input");

    expect(input.getAttribute("min")).toBe("4");
    expect(input.getAttribute("aria-valuemin")).toBe("4");

    expect(input.getAttribute("max")).toBe("10");
    expect(input.getAttribute("aria-valuemax")).toBe("10");

    expect(input.getAttribute("step")).toBe("2");
  });
  describe("with marks", () => {
    beforeEach(() => {
      render(<Slider thumb={{ defaultValue: 10 }} marks={TEST_MARKS} lockOnMarks />);
    });
    test("with lockOnMarks={true}, keyDown functionality", () => {
      const sliderInput = screen.getByTestId("slider-input");

      for (let i = 0; i < 5; i++) {
        userEvent.type(sliderInput, specialChars.arrowRight);
      }

      expect(screen.getByTestId("slider-input")).toHaveValue("60");
      expect(screen.getByTestId("slider-input")).toHaveAttribute("aria-valuenow", "60");
      expect(screen.getByTestId("slider-thumb").style.left).toBe("60%");

      for (let i = 0; i < 2; i++) {
        userEvent.type(sliderInput, specialChars.arrowLeft);
      }

      expect(screen.getByTestId("slider-input")).toHaveValue("40");
      expect(screen.getByTestId("slider-input")).toHaveAttribute("aria-valuenow", "40");
      expect(screen.getByTestId("slider-thumb").style.left).toBe("40%");
    });
  });
});
