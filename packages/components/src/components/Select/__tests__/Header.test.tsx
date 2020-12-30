import { render, screen } from "@testing-library/react";
import Select from "../index";
import { selectCustomRender } from "../__helpers__/utils";

describe("<Select.Header />", () => {
  test("default behaviour", () => {
    render(<Select.Header value="Test header" />);
    const header = screen.getByTestId("select-header");

    expect(header).toBeVisible();
    expect(header).toHaveAttribute("class");
    expect(header).toHaveAttribute("data-children", "false");
    expect(header).toMatchSnapshot();

    const children = header.children;

    expect(children).toHaveLength(1);
    expect(children[0].tagName.toLowerCase()).toBe("h6");
    expect(children[0]).toHaveTextContent("Test header");

    expect(screen.getByTestId("select-hr")).toBeVisible();
  });
  test("with children", () => {
    selectCustomRender(
      <Select.Header value="Test header">
        <Select.Options>
          <Select.Item id="hey">Hey</Select.Item>
          <Select.Item id="amsterdam">Amsterdam</Select.Item>
        </Select.Options>
      </Select.Header>
    );

    const header = screen.getByTestId("select-header");

    expect(header).toHaveAttribute("data-children", "true");
    expect(header).toMatchSnapshot();

    const options = screen.getByTestId("select-options");

    expect(options).toBeVisible();
    expect(options.children).toHaveLength(2);
    expect(screen.queryAllByTestId("select-item")).toHaveLength(2);
  });
});
