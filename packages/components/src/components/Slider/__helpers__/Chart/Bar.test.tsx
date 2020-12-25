import { render, screen } from "@testing-library/react";
import { Bar } from "./Bar";

describe("Slider Chart <Bar />", () => {
  test("default behaviour", () => {
    render(<Bar />);
    const bar = screen.getByTestId("slider-chart-bar");
    const { height } = bar.style;

    expect(bar).toBeVisible();
    expect(bar).toHaveAttribute("class");
    expect(bar).toHaveTextContent("");
    expect(height).toBeDefined();
    expect(height).toBe("50%");
    expect(height).toMatchSnapshot();
  });
  test("with height", () => {
    render(<Bar height={70} />);
    const bar = screen.getByTestId("slider-chart-bar");
    const { height } = bar.style;

    expect(bar).toBeVisible();
    expect(height).toBeDefined();
    expect(height).toBe("70%");
  });
});
