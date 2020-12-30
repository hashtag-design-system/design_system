import { screen } from "@testing-library/react";
import { SelectContextType } from "../../../utils/contexts";
import Select from "../index";
import { selectCustomRender } from "../__helpers__/utils";

const TEST_SELECTED_MULTIPLE_ITEMS: SelectContextType["items"] = [
  { id: "test_id0", content: "Test 1", selected: true },
  { id: "test_id1", content: "Test 2", selected: false },
];

describe("<Select.Item />", () => {
  test("default behaviour", () => {
    selectCustomRender(<Select.Item id="test_id" />);
    const item = screen.getByTestId("select-item");
    const itemInput = screen.getByTestId("select-item-input");
    const itemLabel = screen.getByTestId("select-item-label");

    // item tests
    expect(item).toBeVisible();
    expect(item.onclick).toBeDefined();
    expect(item.tagName.toLowerCase()).toBe("div");
    expect(item).toHaveAttribute("class");
    expect(item).toHaveAttribute("tabindex", "0");
    expect(item).toHaveAttribute("aria-selected", "false");
    expect(item.children).toHaveLength(2);

    // itemInput tests
    expect(itemInput).toBeVisible();
    expect(itemInput.tagName.toLowerCase()).toBe("input");
    expect(itemInput).toHaveAttribute("class");
    expect(itemInput).toHaveAttribute("id", "test_id");
    expect(itemInput).toHaveAttribute("value", "false");
    expect(itemInput).toHaveAttribute("type", "checkbox");
    expect(itemInput).toHaveAttribute("aria-checked", "false");

    // itemLabel tests
    expect(itemLabel).toBeVisible();
    expect(itemLabel).toHaveAttribute("class");
    expect(itemLabel).toHaveAttribute("for", "test_id");
    expect(itemLabel.children).toHaveLength(0);
    expect(itemLabel.textContent).toBe("");
  });
  test("with defaultChecked={true}", () => {
    selectCustomRender(<Select.Item id="test_id" />);
    const item = screen.getByTestId("select-item");
    const itemInput = screen.getByTestId("select-item-input");

    expect(item).toHaveAttribute("aria-selected", "false");
    expect(item).toMatchSnapshot();

    expect(itemInput).toHaveAttribute("value", "false");
    expect(itemInput).toHaveAttribute("type", "checkbox");
    expect(itemInput).toHaveAttribute("aria-checked", "false");
  });
  test("with children", () => {
    selectCustomRender(
      <Select.Item id="test_id">
        <strong>🇳🇱</strong>Amsterdam
      </Select.Item>
    );
    const itemLabel = screen.getByTestId("select-item-label");
    const children = itemLabel.children;

    expect(itemLabel).toHaveTextContent("Amsterdam");
    expect(children).toHaveLength(1);
    expect(children[0].tagName.toLowerCase()).toBe("strong");
    expect(children[0].textContent).toBe("🇳🇱");
  });
  test("with isMobile={true}", () => {
    selectCustomRender(<Select.Item id="test_id" />, { providerProps: { isMobile: true } });

    expect(screen.getByTestId("select-hr")).toBeVisible();
  });
  test("with disabled={true}", () => {
    selectCustomRender(<Select.Item id="test_id" aria-disabled="true" />);

    const selectInput = screen.getByTestId("select-item-input");

    expect(screen.getByTestId("select-item")).toHaveAttribute("aria-disabled", "true");
    expect(selectInput).toBeDisabled();
    expect(selectInput).toHaveAttribute("aria-disabled", "true");
  });
  test("with one selectedItems", () => {
    selectCustomRender(<Select.Item id={TEST_SELECTED_MULTIPLE_ITEMS[0].id}>{TEST_SELECTED_MULTIPLE_ITEMS[0].content}</Select.Item>, {
      // Pass for document - screen render, otherwise it will not be displayed, so we won't have access to it
      providerProps: { items: TEST_SELECTED_MULTIPLE_ITEMS.slice(0, 1) },
    });
    const item = screen.getByTestId("select-item");
    const itemInput = screen.getByTestId("select-item-input");

    expect(item).toHaveAttribute("aria-selected", "true");

    expect(itemInput).toHaveAttribute("value", "true");
    expect(itemInput).toHaveAttribute("aria-checked", "true");
    expect(itemInput).toHaveAttribute("id", TEST_SELECTED_MULTIPLE_ITEMS[0].id);
  });
  test("with multiple selectedItems", async () => {
    selectCustomRender(
      <>
        {/* {TEST_SELECTED_MULTIPLE_ITEMS.map(({ id, content }) => {
          <Select.Item id={id}>{content}</Select.Item>;
        })} */}
        <Select.Item id={TEST_SELECTED_MULTIPLE_ITEMS[0].id}>{TEST_SELECTED_MULTIPLE_ITEMS[0].content}</Select.Item>
        <Select.Item id={TEST_SELECTED_MULTIPLE_ITEMS[1].id}>{TEST_SELECTED_MULTIPLE_ITEMS[1].content}</Select.Item>
      </>,
      {
        providerProps: { items: TEST_SELECTED_MULTIPLE_ITEMS },
      }
    );

    screen.getAllByTestId("select-item").forEach((item, i) => {
      const checked = TEST_SELECTED_MULTIPLE_ITEMS[i].selected;
      expect(item.getAttribute("aria-selected")).toBe(checked.toString());
    });

    screen.getAllByTestId("select-item-input").forEach((input, i) => {
      const checked = TEST_SELECTED_MULTIPLE_ITEMS[i].selected;
      expect(input).toHaveAttribute("value", checked.toString());
      expect(input).toHaveAttribute("aria-checked", checked.toString());
      expect(input).toHaveAttribute("id", `test_id${i}`);
    });
  });
});
