import { render, screen } from "@testing-library/react";
import { Animated } from "../index";

const checkChildren = (fireworks: HTMLElement, totalFireworks = 12) => {
  const children = fireworks.children;
  expect(children).toHaveLength(totalFireworks);
  Array.from(children).forEach((child, i) => {
    expect(child).toHaveAttribute("class");
    expect(child).toHaveAttribute("style");
    expect(child).toHaveStyle(`transform: rotate(${i * (360 / totalFireworks)}deg) translateY(-15px)`);
    expect(child.children).toHaveLength(0);
  });
};

const checkChildStyle = (styleValue: { name: string; value: string }) => {
  const { name, value } = styleValue;
  // @ts-expect-error
  expect(screen.getByTestId("fireworks").style["_values"][`--${name}`]).toBe(value);
};

describe("<Animated.Fireworks />", () => {
  test("default behaviour", () => {
    render(<Animated.Fireworks />);
    const fireworks = screen.getByTestId("fireworks");

    expect(fireworks).toBeVisible();
    expect(fireworks).toHaveAttribute("class");
    expect(fireworks).toHaveAttribute("style");
    // @ts-expect-error
    expect(fireworks.style["0"]).toBe("--width");
    // @ts-expect-error
    expect(fireworks.style["1"]).toBe("--height");
    // @ts-expect-error
    expect(fireworks.style["2"]).toBe("--animation-delay");
    // @ts-expect-error
    expect(fireworks.style["3"]).toBe("--animation-timing");
    // @ts-expect-error
    expect(fireworks.style["4"]).toBe("--animation-duration");

    checkChildren(fireworks);
  });
  test("with totalFireworks", () => {
    const totalFireworks = 20;
    render(<Animated.Fireworks totalFireworks={totalFireworks} />);
    const fireworks = screen.getByTestId("fireworks");

    checkChildren(fireworks, totalFireworks);
  });
  test("with width", () => {
    const width = "8px";
    render(<Animated.Fireworks width={width} />);

    checkChildStyle({ name: "width", value: width });
  });
  test("with height", () => {
    const height = "80px";
    render(<Animated.Fireworks height={height} />);

    checkChildStyle({ name: "height", value: height });
  });
  test("with color", () => {
    const color = "red";
    render(<Animated.Fireworks color={color} />);

    checkChildStyle({ name: "bg-clr", value: color });
  });
  describe("with animtion", () => {
    test("with animationDelay", () => {
      const delay = "1s";
      render(<Animated.Fireworks animation={{ delay }} />);

      checkChildStyle({ name: "animation-delay", value: delay });
    });
    test("with animationTiming", () => {
      const timing = "ease-in";
      render(<Animated.Fireworks animation={{ timing }} />);

      checkChildStyle({ name: "animation-timing", value: timing });
    });
    test("with animationDuration", () => {
      const duration = "5s";
      render(<Animated.Fireworks animation={{ duration }} />);

      checkChildStyle({ name: "animation-duration", value: duration });
    });
  });
});
