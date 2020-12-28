import { screen } from "@testing-library/react";
import Select from "../index";
import { selectCustomRender } from "../__helpers__/utils";

describe("<Select.Header />", () => {
  test("default behaviour", () => {
    selectCustomRender(<Select.Header />);
    const header = screen.getByTestId("select-header");

    expect(header).toBeVisible();
    expect(header).toHaveAttribute("class");
    expect(header).toHaveAttribute("data-onlychild", "true");

    const children = header.children;

    expect(children).toHaveLength(1);
    expect(children[0].tagName.toLowerCase()).toBe("h6");
    expect(children[0]).toHaveTextContent("");

    expect(screen.getByTestId("select-hr")).toBeVisible();
  });
  test("with onlyChild={false}", () => {
    selectCustomRender(<Select.Header />, { providerProps: { onlyChild: false } });

    expect(screen.getByTestId("select-header")).toHaveAttribute("data-onlychild", "false");
  });
  test("with children", () => {
    selectCustomRender(<Select.Header>Header</Select.Header>);

    expect(screen.getByTestId("select-header")).toHaveTextContent("Header");
  });
});
