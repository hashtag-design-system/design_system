import { render, screen } from "@testing-library/react";
import Animated from "../index";
import { checkChildStyle, checkStyleCustomProperties } from "../__helpers__";

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

describe("<Animated.Fireworks />", () => {
  test("default behaviour", () => {
    render(<Animated.Fireworks />);
    const fireworks = screen.getByTestId("fireworks");

    expect(fireworks).toBeVisible();
    expect(fireworks).toHaveAttribute("class");
    expect(fireworks).toHaveAttribute("style");
    checkStyleCustomProperties(fireworks, ["width", "height", "animation-duration", "animation-timing", "animation-iteration"]);
    // // @ts-expect-error
    // expect(fireworks.style["0"]).toBe("--width");
    // // @ts-expect-error
    // expect(fireworks.style["1"]).toBe("--height");
    // // @ts-expect-error
    // expect(fireworks.style["2"]).toBe("--animation-duration");
    // // @ts-expect-error
    // expect(fireworks.style["3"]).toBe("--animation-timing");
    // // @ts-expect-error
    // expect(fireworks.style["4"]).toBe("--animation-iteration");

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

    checkChildStyle("fireworks", { name: "width", value: width });
  });
  test("with height", () => {
    const height = "80px";
    render(<Animated.Fireworks height={height} />);

    checkChildStyle("fireworks", { name: "height", value: height });
  });
  test("with color", () => {
    const color = "red";
    render(<Animated.Fireworks color={color} />);

    checkChildStyle("fireworks", { name: "bg-clr", value: color });
  });
  describe("with animαtion", () => {
    test("with animation.duration", () => {
      const duration = "1s";
      render(<Animated.Fireworks animation={{ duration }} />);

      checkChildStyle("fireworks", { name: "animation-duration", value: duration });
    });
    test("with animation.timing", () => {
      const timing = "ease-in";
      render(<Animated.Fireworks animation={{ timing }} />);

      checkChildStyle("fireworks", { name: "animation-timing", value: timing });
    });
    test("with animation.iteration", () => {
      const iteration = "5s";
      render(<Animated.Fireworks animation={{ iteration }} />);

      checkChildStyle("fireworks", { name: "animation-iteration", value: iteration });
    });
  });
});
