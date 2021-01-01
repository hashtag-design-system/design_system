import { render, screen } from "@testing-library/react";
import Select from "../index";

describe("<Select.Button />", () => {
  test("default behaviour", () => {
    render(
      <Select>
        <Select.Button />
      </Select>
    );
    const btn = screen.getByTestId("select-btn");

    expect(btn).toBeVisible();
    expect(btn.tagName.toLowerCase()).toBe("summary");
    expect(btn).toHaveAttribute("class");
    expect(btn).toMatchSnapshot();

    const children = btn.children;

    expect(children).toHaveLength(2);
    expect(children[0].tagName.toLowerCase()).toBe("p");
    expect(children[0]).not.toHaveAttribute("style");
    expect(children[1].tagName.toLowerCase()).toBe("svg");
    expect(children[1]).toHaveClass("icon");
  });
  test("with children", () => {
    render(
      <Select>
        <Select.Button>Placeholder</Select.Button>
      </Select>
    );

    expect(screen.getByTestId("select-btn").children[0].textContent).toBe("Placeholder");
  });
  test("with style={{ width }}", () => {
    render(
      <Select>
        <Select.Button style={{ width: 5 }} />
      </Select>
    );
    const pChild = screen.getByTestId("select-btn").children[0] as HTMLParagraphElement;

    expect(pChild.style.width).toBe("5px");
  });
});
