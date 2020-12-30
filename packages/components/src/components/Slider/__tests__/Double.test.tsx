import { render, screen } from "@testing-library/react";
import userEvent, { specialChars } from "@testing-library/user-event";
import React from "react";
import { calculatePercentage } from "../../../utils";
import Slider from "../index";
import { TEST_CHART_DATA } from "../__helpers__/Chart/Chart.test";
import { defaultProps } from "../__helpers__/utils";

describe("<Slider.Double />", () => {
  test("default behaviour", () => {
    render(<Slider.Double />);
    const inputs = screen.getAllByTestId("slider-input");
    const container = screen.getByTestId("slider-container");
    const thumbs = screen.getAllByTestId("slider-thumb");
    const sliderField = screen.getByTestId("slider-field");

    // inputs tests
    inputs.forEach(input => {
      expect(input).toBeVisible();
      expect(input).toHaveAttribute("type", "range");
      expect(input).toHaveAttribute("class");
      expect(input).not.toBeDisabled();
      expect(input).not.toHaveAttribute("aria-disabled");
      expect(input).toHaveValue("25");
      expect(input).toHaveAttribute("min", "0");
      expect(input).toHaveAttribute("max", "100");
      expect(input).toHaveAttribute("step", "1");
      expect(input).toHaveAttribute("aria-valuemin", "0");
      expect(input).toHaveAttribute("aria-valuemax", "100");
      expect(input).toHaveAttribute("aria-valuenow", "25");
      expect(input).toHaveAttribute("tabindex", "-1");
      expect(input).toHaveAttribute("role", "slider");
    });

    // container tests
    expect(container).toBeVisible();
    expect(container.children).toHaveLength(1);
    expect(container).toHaveAttribute("class");

    // thumbs tests
    thumbs.forEach(thumb => {
      expect(thumb).toHaveAttribute("class");
      expect(thumb).not.toHaveClass("hover");

      if (thumb.className.includes("left")) {
        expect(thumb.style.left).toBe("25%");
      }
      if (thumb.className.includes("right")) {
        expect(thumb.style.right).toBe("25%");
      }
    });

    // sliderField tests
    expect(sliderField).toBeVisible();
    expect(sliderField.children).toHaveLength(5);

    expect(screen.queryByTestId("slider-marks-container")).toBeNull();
  });
  test("keyDown default functionality", async () => {
    render(<Slider.Double />);
    const inputs = screen.queryAllByTestId("slider-input");

    for (let i = 0; i < 10; i++) {
      userEvent.type(inputs[0], specialChars.arrowRight);
    }

    expect(inputs[0]).toHaveValue("35");
    expect(inputs[0]).toHaveAttribute("aria-valuenow", "35");
    expect(screen.queryAllByTestId("slider-thumb")[0].style.left).toBe("35%");

    for (let i = 0; i < 5; i++) {
      userEvent.type(inputs[0], specialChars.arrowLeft);
    }

    expect(inputs[0]).toHaveValue("30");
    expect(inputs[0]).toHaveAttribute("aria-valuenow", "30");
    expect(screen.queryAllByTestId("slider-thumb")[0].style.left).toBe("30%");

    for (let i = 0; i < 10; i++) {
      userEvent.type(inputs[1], specialChars.arrowDown);
    }

    expect(inputs[1]).toHaveValue("35");
    expect(inputs[1]).toHaveAttribute("aria-valuenow", "35");
    expect(screen.queryAllByTestId("slider-thumb")[1].style.right).toBe("35%");

    for (let i = 0; i < 5; i++) {
      userEvent.type(inputs[1], specialChars.arrowUp);
    }

    expect(inputs[1]).toHaveValue("30");
    expect(inputs[1]).toHaveAttribute("aria-valuenow", "30");
    expect(screen.queryAllByTestId("slider-thumb")[1].style.right).toBe("30%");
  });
  test('lThumb, state="focus-visible"', () => {
    render(<Slider.Double lThumb={{ state: "focus-visible" }} />);

    expect(screen.queryAllByTestId("slider-thumb")[0]).toHaveClass("focus-visible");
  });
  test('rThumb, state="focus-visible"', () => {
    render(<Slider.Double rThumb={{ state: "focus-visible" }} />);

    expect(screen.queryAllByTestId("slider-thumb")[1]).toHaveClass("focus-visible");
  });
  test('lThumb, state="hover"', async () => {
    render(<Slider.Double lThumb={{ state: "hover" }} />);
    const thumb = screen.queryAllByTestId("slider-thumb")[0];

    expect(thumb).toHaveClass("hover");
    userEvent.unhover(thumb);
    expect(thumb).toHaveClass("hover");
  });
  test('rThumb, state="hover"', async () => {
    render(<Slider.Double rThumb={{ state: "hover" }} />);
    const thumb = screen.queryAllByTestId("slider-thumb")[1];

    expect(thumb).toHaveClass("hover");
    userEvent.unhover(thumb);
    expect(thumb).toHaveClass("hover");
  });
  test('state="hover", with disabled={true}', () => {
    const { rerender } = render(<Slider.Double lThumb={{ state: "hover" }} disabled />);

    const thumbs = screen.queryAllByTestId("slider-thumb");

    thumbs.forEach(thumb => {
      expect(thumb).not.toHaveClass("hover");
    });

    rerender(<Slider.Double rThumb={{ state: "hover" }} disabled />);

    thumbs.forEach(thumb => {
      expect(thumb).not.toHaveClass("hover");
    });
  });
  test("disabled state", () => {
    const { rerender } = render(<Slider.Double lThumb={{ state: "disabled" }} />);
    const container = screen.getByTestId("slider-container");
    const inputs = screen.getAllByTestId("slider-input");

    expect(container).toHaveClass("disabled");
    inputs.forEach(input => {
      expect(input).toBeDisabled();
    });

    rerender(<Slider.Double disabled />);

    expect(container).toHaveClass("disabled");
    inputs.forEach(input => {
      expect(input).toBeDisabled();
    });

    rerender(<Slider.Double aria-disabled="true" />);

    expect(container).toHaveClass("disabled");
    inputs.forEach(input => {
      expect(input).toBeDisabled();
    });
  });
  test("with chart, overlay style", () => {
    render(<Slider.Double chart={TEST_CHART_DATA} />);
    const overlay = screen.getByTestId("slider-chart-overlay-container");

    expect(overlay).toBeVisible();
    expect(overlay.style.right).toBe(
      `${calculatePercentage(
        parseFloat(defaultProps.max!.toString()) / 4,
        parseFloat(defaultProps.min!.toString()),
        parseFloat(defaultProps.max!.toString())
      )}%`
    );
    expect(overlay.style.left).toBe(
      `${calculatePercentage(
        parseFloat(defaultProps.max!.toString()) / 4,
        parseFloat(defaultProps.min!.toString()),
        parseFloat(defaultProps.max!.toString())
      )}%`
    );
  });
  test("thumb onHover default behaviour", () => {
    render(<Slider.Double />);
    const thumbs = screen.getAllByTestId("slider-thumb");

    thumbs.forEach(thumb => {
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
  });
  test("number input related attributes", () => {
    render(<Slider.Double min={4} max={10} step={2} />);
    const inputs = screen.getAllByTestId("slider-input");

    inputs.forEach(input => {
      expect(input.getAttribute("min")).toBe("4");
      expect(input.getAttribute("aria-valuemin")).toBe("4");

      expect(input.getAttribute("max")).toBe("10");
      expect(input.getAttribute("aria-valuemax")).toBe("10");

      expect(input.getAttribute("step")).toBe("2");
    });
  });
});
