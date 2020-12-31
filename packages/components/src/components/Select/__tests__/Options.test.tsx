import { render, screen } from "@testing-library/react";
import Select from "../index";
import { selectCustomRender } from "../__helpers__/utils";

describe("<Select.Options />", () => {
  test("default behaviour", () => {
    selectCustomRender(<Select.Options />);
    const options = screen.getByTestId("select-options");

    expect(options).toBeVisible();
    expect(options).toHaveAttribute("class");
    expect(options.children).toHaveLength(0);
    expect(options).toHaveAttribute("role", "listbox");
    expect(options).toHaveAttribute("aria-multiselectable", "false");
  });
  test("with multiSelectable={true}", () => {
    selectCustomRender(<Select.Options />, { providerProps: { multiSelectable: true } });

    expect(screen.getByTestId("select-options")).toHaveAttribute("aria-multiselectable", "true");
  });
  test("with children", () => {
    render(
      <Select defaultOpen>
        <Select.Options>
          <Select.Item id="hey">Hey</Select.Item>
          <Select.Item id="amsterdam">Amsterdam</Select.Item>
        </Select.Options>
      </Select>
    );
    const children = screen.getByTestId("select-options").children;

    expect(children).toHaveLength(2);
    Array.from(children).forEach(child => {
      expect(child).toBeVisible();
      expect(child).toHaveAttribute("data-testid", "select-item");
    });
  });
  test("with mobileView={true}", () => {
    render(
      <Select defaultOpen mobileView>
        <Select.Options>
          <Select.Item id="hey">Hey</Select.Item>
          <Select.Item id="amsterdam">Amsterdam</Select.Item>
        </Select.Options>
        ,
      </Select>
    );
    const children = screen.getByTestId("select-options").children;

    // Due to mobileView={true} each <Select.Item /> is followed by <Select.Hr />,
    // except from the last one. However, the last component is set to `display: none`,
    // but still exists in the document
    expect(children).toHaveLength(4);
    Array.from(children).forEach((child, i) => {
      expect(child).toBeVisible();
      if ((i + 1) % 2 === 0) {
        expect(child).toHaveAttribute("data-testid", "select-hr");
      } else {
        expect(child).toHaveAttribute("data-testid", "select-item");
      }
    });
  });
});
