import { render, screen } from "@testing-library/react";
import Select from "../index";
import { selectCustomRender } from "../__helpers__/utils";

describe("<Select.Options />", () => {
  test("default behaviour", () => {
    render(<Select.Options />);
    const options = screen.getByTestId("select-options");

    expect(options).toBeVisible();
    expect(options).toHaveAttribute("class");
    expect(options.children).toHaveLength(0);
  });
  test("with children", () => {
    selectCustomRender(
      <Select.Options>
        <Select.Item id="hey">Hey</Select.Item>
        <Select.Item id="amsterdam">Amsterdam</Select.Item>
      </Select.Options>
    );
    const children = screen.getByTestId("select-options").children;

    expect(children).toHaveLength(2);
    Array.from(children).forEach(child => {
      expect(child).toBeVisible();
      expect(child).toHaveAttribute("data-testid", "select-item");
    });
  });
});
