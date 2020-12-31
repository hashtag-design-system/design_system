import { screen } from "@testing-library/react";
import Select from "../index";
import { selectCustomRender } from "../__helpers__/utils";

describe("<Select.Button />", () => {
  test("default behaviour", () => {
    selectCustomRender(<Select.Button />);
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
  test("with value", () => {
    selectCustomRender(<Select.Button />, { providerProps: { btnValue: "Placeholder" } });

    expect(screen.getByTestId("select-btn").children[0].textContent).toBe("Placeholder");
  });
  test("with children", () => {
    selectCustomRender(<Select.Button>Placeholder</Select.Button>);

    expect(screen.getByTestId("select-btn").children[0].textContent).toBe("Placeholder");
  });
  test("with style={{ width }}", () => {
    selectCustomRender(<Select.Button style={{ width: 5 }} />);
    const pChild = screen.getByTestId("select-btn").children[0] as HTMLParagraphElement;

    expect(pChild.style.width).toBe("5px");
  });
  test("with showValue={false} & value", () => {
    selectCustomRender(<Select.Button showValue={false}>Test</Select.Button>, { providerProps: { btnValue: "Placeholder" } });

    expect(screen.getByTestId("select-btn").children[0].textContent).toBe("Test");
  });
  test("with showValue={false} & without value", () => {
    selectCustomRender(<Select.Button showValue={false}>Test</Select.Button>);

    expect(screen.getByTestId("select-btn").children[0].textContent).toBe("Test");
  });
});
