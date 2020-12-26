import { render, screen } from "@testing-library/react";
import { Bar } from "./Bar";

describe("Slider <Bar />", () => {
  test("default behaviour", () => {
    render(<Bar />);
    const bar = screen.getByTestId("slider-bar");

    expect(bar).toBeVisible();
    expect(bar).toHaveAttribute("class");
    expect(bar).toMatchSnapshot();
    expect(bar.style.width).toBeDefined();
    expect(bar.children.length).toBe(1);
    expect(bar.children[0]).toHaveAttribute("class");
  });
  test("custom className", () => {
    render(<Bar className="custom-className" />);
    const bar = screen.getByTestId("slider-bar");

    expect(bar).toHaveClass("custom-className");
    expect(bar.children[0]).toHaveClass("custom-className");
  });
});
