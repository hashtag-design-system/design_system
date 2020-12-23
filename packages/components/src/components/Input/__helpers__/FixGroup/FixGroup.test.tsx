import { render, screen } from "@testing-library/react";
import { OpenEye } from "../../__icons__/OpenEye";
import { FixGroup } from "./FixGroup";

describe("Input <FixGroup />", () => {
  describe("prefix & suffix of string type", () => {
    test("displays prefix", () => {
      render(<FixGroup group="$" position="left" />);
      const element = screen.getByTestId("fix-group");

      expect(element).toBeInTheDocument();
      expect(element.style.transform).toBe("translateY(-15%)");
    });
    test("displays suffix", () => {
      render(<FixGroup group="Kg" position="right" />);
      const element = screen.getByTestId("fix-group");

      expect(element).toBeInTheDocument();
      expect(element.style.transform).toBe("translateY(-15%)");
    });
  });
  describe("prefix & suffix of `React.ReactNode` (component - icon) type", () => {
    test("displays prefix component", () => {
      render(<FixGroup group={<OpenEye />} position="left" />);
      const prefix = screen.getByTestId("fix-group");

      expect(prefix).toBeInTheDocument();
      expect(prefix).toMatchSnapshot();
      expect(prefix.style.transform).toBe("translateY(-40%)");
    });
    test("displays suffix component", () => {
      render(<FixGroup group={<OpenEye />} position="right" />);
      const suffix = screen.getByTestId("fix-group");

      expect(suffix).toBeInTheDocument();
      expect(suffix).toMatchSnapshot();
      expect(suffix.style.transform).toBe("translateY(-40%)");
    });
  });
  test("default behaviour", () => {
    render(<FixGroup group="Kg" />);

    expect(screen.getByTestId("fix-group")).toBeInTheDocument();
  });
  test('have "left" position', () => {
    render(<FixGroup group="Kg" position="left" />);
    const element = screen.getByTestId("fix-group");

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("left");
  });
  test('have "right" position', () => {
    render(<FixGroup group="Kg" position="right" />);
    const element = screen.getByTestId("fix-group");

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("right");
  });
});
