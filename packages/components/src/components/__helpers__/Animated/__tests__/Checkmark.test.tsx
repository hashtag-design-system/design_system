import { render, screen } from "@testing-library/react";
import { Animated } from "../Animated";

describe("<Animated.Checkmark />", () => {
  test("default behaviour", () => {
    render(<Animated.Checkmark />);
    const svg = screen.getByTestId("animated-checkmark");
    const path = screen.getByTestId("icon-path");

    expect(svg).toBeInTheDocument();
    expect(svg).toBeVisible();
    expect(svg).toHaveAttribute("xmlns");
    expect(svg).toHaveAttribute("viewBox");
    expect(svg).toHaveAttribute("width");
    expect(svg).toHaveAttribute("height");
    expect(path.getAttribute("opacity")).toBe("0");
    expect(path).toHaveAttribute("stroke-width");
    expect(path).toHaveAttribute("stroke", "var(--grey-1)");
    expect(path).toHaveAttribute("stroke-linecap");
    expect(path).toHaveAttribute("stroke-linejoin");
    expect(path).toHaveAttribute("fill");
    expect(path).toHaveAttribute("d");
  });
  test("with custom size", () => {
    render(<Animated.Checkmark size={6} />);
    const svg = screen.getByTestId("animated-checkmark");

    expect(svg).toHaveAttribute("width", "6");
    expect(svg).toHaveAttribute("height", "6");
  });
  test("with children", () => {
    render(
      <Animated.Checkmark>
        <path
          d="M1.75 7.583h10.5"
          fill="transparent"
          stroke="var(--primary)"
          strokeWidth={2}
          strokeLinecap="round"
          data-testid="animated-checkmark-children-prop"
        />
      </Animated.Checkmark>
    );

    expect(screen.getByTestId("animated-checkmark").children).toHaveLength(1);
    expect(screen.getByTestId("animated-checkmark-children-prop")).toBeInTheDocument();
  });
});
