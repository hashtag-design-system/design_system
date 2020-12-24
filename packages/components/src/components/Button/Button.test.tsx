import { render, screen } from "@testing-library/react";
import { OpenEye } from "../Input/__icons__";
import Button, { ButtonTypes } from "./index";

describe("<Button />", () => {
  test("default behaviour", () => {
    render(<Button />);
    const btn = screen.getByTestId("btn");

    expect(btn).toBeVisible();
    expect(btn).toHaveAttribute("class");
    expect(btn).not.toHaveAttribute("disabled");
    expect(btn).not.toBeDisabled();
    expect(btn).toHaveTextContent("");
    expect(btn.children).toHaveLength(0);
    expect(btn).toMatchSnapshot();
  });
  test.each(ButtonTypes)("btn type", type => {
    render(<Button type={type} />);

    expect(screen.getByTestId("btn").className).toContain(type);
  });
  test("block={true}", () => {
    render(<Button block />);

    expect(screen.getByTestId("btn")).toHaveClass("block");
  });
  test("pill={true}", () => {
    render(<Button pill />);

    expect(screen.getByTestId("btn")).toHaveClass("pill");
  });
  test("with children", () => {
    render(<Button>Button</Button>);
    const btn = screen.getByTestId("btn");

    expect(btn).toBeVisible();
    expect(btn).toHaveTextContent("Button");
    // Due to text, and not HTML element
    expect(btn.children.length).toBe(0);
  });
  test("with children of `React.ReactNode` (component - icon)", () => {
    render(
      <Button>
        Button
        <OpenEye />
      </Button>
    );
    const btn = screen.getByTestId("btn");

    expect(btn).toBeVisible();
    expect(btn).toHaveTextContent("Button");
    expect(btn.children.length).toBe(1);
    expect(btn).toContainHTML("<svg");
    expect(screen.getByTestId("icon")).toBeVisible();
  });
  describe("disabled state", () => {
    test('state="disabled"', () => {
      render(<Button state="disabled" />);
      const btn = screen.getByTestId("btn");

      expect(btn).toHaveClass("disabled");
      expect(btn).toBeDisabled();
      expect(btn).toHaveAttribute("aria-disabled", "true");
    });
    test('aria-disabled="true"', () => {
      render(<Button aria-disabled="true" />);
      const btn = screen.getByTestId("btn");

      expect(btn).toBeDisabled();
      expect(btn).toHaveAttribute("aria-disabled", "true");
    });
    test("disabled={true}", () => {
      render(<Button disabled />);
      const btn = screen.getByTestId("btn");

      expect(btn).toBeDisabled();
      expect(btn).toHaveAttribute("aria-disabled", "true");
    });
  });
});
