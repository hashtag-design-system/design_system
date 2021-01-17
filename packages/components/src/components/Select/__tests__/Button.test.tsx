import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
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
  test("with width", () => {
    render(
      <Select width={5}>
        <Select.Button />
      </Select>
    );

    expect(screen.getByTestId("select-btn")).toHaveStyle("width: 5px");
  });
  test('keyDown="Tab"', async () => {
    render(
      <Select>
        <Select.Button />
      </Select>
    );
    const btn = screen.getByTestId("select-btn");
    act(() => {
      btn.focus();
    })
    expect(btn).toHaveFocus();

    fireEvent.keyDown(btn, {
      key: "Tab",
      code: "Tab",
      keyCode: 9,
      charCode: 9,
    });
    expect(btn).not.toHaveFocus();
  });
});
