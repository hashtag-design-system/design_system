import { render, screen, waitFor } from "@testing-library/react";
import Animated from "../../index";
import { checkChildStyle, checkStyleCustomProperties } from "../../__helpers__";

describe("<Animated.Loading.Dots />", () => {
  test("default behaviour", async () => {
    render(<Animated.Loading.Dots />);
    const container = screen.getByTestId("animated-dots-container");
    const dots = screen.getAllByTestId("animated-dot");

    await waitFor(() => {
      expect(container).toBeVisible();
    });
    expect(container).toHaveAttribute("class");
    expect(container.children).toHaveLength(dots.length);
    expect(dots).toHaveLength(3);

    dots.forEach(dot => {
      expect(dot).toBeVisible();
      expect(dot).toHaveAttribute("class");
      expect(dot).toHaveAttribute("style");
      expect(container).toContainElement(dot);
      checkStyleCustomProperties(dot, ["size", "margin"]);
    });
  });
  test("with totalDots", async () => {
    const totalDots = 5;
    render(<Animated.Loading.Dots totalDots={totalDots} />);
    const container = screen.getByTestId("animated-dots-container");
    const dots = screen.getAllByTestId("animated-dot");

    await waitFor(() => {
      expect(container).toBeVisible();
    });
    expect(container.children).toHaveLength(dots.length);
    expect(dots).toHaveLength(totalDots);

    dots.forEach(dot => {
      expect(container).toContainElement(dot);
    });
  });
  test("with size", async () => {
    const size = 24;
    render(<Animated.Loading.Dots size={size} />);
    const dots = screen.getAllByTestId("animated-dot");

    dots.forEach(dot => {
      checkChildStyle(dot, { name: "size", value: size + "px" });
    });
  });
  test("with margin", async () => {
    const margin = 24;
    render(<Animated.Loading.Dots margin={margin} />);
    const dots = screen.getAllByTestId("animated-dot");

    dots.forEach(dot => {
      checkChildStyle(dot, { name: "margin", value: margin + "px" });
    });
  });
  test("with bgClr", async () => {
    const bgClr = "orangered";
    render(<Animated.Loading.Dots bgClr={bgClr} />);
    const dots = screen.getAllByTestId("animated-dot");

    dots.forEach(dot => {
      checkChildStyle(dot, { name: "bg-clr", value: bgClr });
    });
  });
  test("with dotProps", async () => {
    const dotsProps = { "data-test": "test" };
    render(<Animated.Loading.Dots dotsProps={dotsProps as any} />);
    const dots = screen.getAllByTestId("animated-dot");

    dots.forEach(dot => {
      expect(dot).toHaveAttribute(Object.keys(dotsProps)[0], Object.values(dotsProps)[0]);
    });
  });
});
