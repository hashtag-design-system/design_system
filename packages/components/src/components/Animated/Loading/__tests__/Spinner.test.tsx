import { render, screen } from "@testing-library/react";
import Animated from "../../index";
import { checkChildStyle, checkStyleCustomProperties } from "../../__helpers__";

describe("<Animated.Loading.Spinner />", () => {
  test("default behaviour", () => {
    render(<Animated.Loading.Spinner />);
    const spinner = screen.getByTestId("animated-spinner");

    expect(spinner).toBeVisible();
    expect(spinner).toHaveAttribute("class");
    expect(spinner).toHaveAttribute("style");
    expect(spinner).toHaveAttribute("role", "alert")
    expect(spinner).toHaveAttribute("aria-live", "assertive")
    // "--color" is exluded beacause it does not have a default value in the component,
    // but only in the stylesheet
    checkStyleCustomProperties(spinner, [
      "size",
      "rotate-animation-duration",
      "rotate-animation-timing",
      "rotate-animation-iteration",
      "dash-animation-duration",
      "dash-animation-timing",
      "dash-animation-iteration",
    ]);

    expect(spinner.children).toHaveLength(1);
    expect(spinner).toContainElement(screen.getByTestId("icon"));
  });
  test("with size", () => {
    const size = 100;
    render(<Animated.Loading.Spinner size={size} />);

    checkChildStyle("animated-spinner", { name: "size", value: size });
  });
  test("with color", () => {
    const color = "blueviolet";
    render(<Animated.Loading.Spinner color={color} />);

    checkChildStyle("animated-spinner", { name: "color", value: color });
  });
  describe.each(["rotate", "dash"])("with animation", animation => {
    test("with animation.duration", () => {
      const duration = "1s";
      render(
        <Animated.Loading.Spinner
          rotateAnimation={animation === "rotate" ? { duration } : undefined}
          dashAnimation={animation === "dash" ? { duration } : undefined}
        />
      );

      checkChildStyle("animated-spinner", { name: `${animation}-animation-duration`, value: duration });
    });
    test("with animation.timing", () => {
      const timing = "ease-in";
      render(
        <Animated.Loading.Spinner
          rotateAnimation={animation === "rotate" ? { timing } : undefined}
          dashAnimation={animation === "dash" ? { timing } : undefined}
        />
      );

      checkChildStyle("animated-spinner", { name: `${animation}-animation-timing`, value: timing });
    });
    test("with animation.iteration", () => {
      const iteration = "5s";
      render(
        <Animated.Loading.Spinner
          rotateAnimation={animation === "rotate" ? { iteration } : undefined}
          dashAnimation={animation === "dash" ? { iteration } : undefined}
        />
      );

      checkChildStyle("animated-spinner", { name: `${animation}-animation-iteration`, value: iteration });
    });
  });
});
