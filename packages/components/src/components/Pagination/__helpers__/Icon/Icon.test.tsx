import { render, screen } from "@testing-library/react";
import { Icon } from "./Icon";

describe("Pagination <Icon />", () => {
  test("default behaviour", () => {
    render(<Icon />);
    const icon = screen.getByTestId("icon");

    expect(icon).toBeVisible();
    expect(icon).toHaveAttribute("class");
    expect(icon).toHaveClass("pagination__btn__icon");
    expect(icon).toHaveAttribute("width", "1em");
    expect(icon).toHaveAttribute("height", "1em");
    expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
    expect(icon).toHaveAttribute("fill");
    expect(icon).toHaveAttribute("xmlns");
    expect(icon).toMatchSnapshot();
    expect(icon.tagName.toLowerCase()).toBe("svg")
    expect(icon.children).toHaveLength(1);

    const child = icon.children[0];
    expect(child.tagName.toLowerCase()).toBe("path");
    expect(child).toHaveAttribute("stroke-width", "1.5");
    expect(child).toHaveAttribute("stroke-linecap", "round");
    expect(child).toHaveAttribute("stroke-linejoin", "round");
    expect(child).not.toHaveAttribute("d");
    expect(child.children).toHaveLength(0);
  });
  test("with d", () => {
    render(<Icon d="M17 21L7 12l10-9" />);
    const icon = screen.getByTestId("icon");

    expect(icon).toMatchSnapshot();

    const child = icon.children[0];
    expect(child).toHaveAttribute("d", "M17 21L7 12l10-9");
  });
});
