import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SelectContextType } from "../../../utils/contexts";
import Select from "../index";
import { selectCustomRender } from "../__helpers__/utils";

const TEST_SELECTED_MULTIPLE_ITEMS: SelectContextType["items"] = [
  { id: "test_id0", content: "Test 1", selected: true, isShown: true },
  { id: "test_id1", content: "Test 2", selected: false, isShown: false },
];

describe("<Select.Item />", () => {
  test("default behaviour", () => {
    render(
      <Select defaultOpen>
        <Select.Item id="test_id" />
      </Select>
    );
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
    expect(item.onclick).toBeDefined();

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
    render(
      <Select defaultOpen>
        <Select.Item id="test_id" defaultChecked />
      </Select>
    );
    const item = screen.getByTestId("select-item");
    const itemInput = screen.getByTestId("select-item-input");

    expect(item).toHaveAttribute("aria-selected", "true");
    expect(item).toMatchSnapshot();

    expect(itemInput).toHaveAttribute("value", "true");
    expect(itemInput).toHaveAttribute("type", "checkbox");
    expect(itemInput).toHaveAttribute("aria-checked", "true");
  });
  test('state="disabled"', () => {
    render(
      <Select defaultOpen>
        <Select.Button style={{ width: "200px" }}>Project</Select.Button>
        <Select.Item id="test_id" state="disabled">
          Test
        </Select.Item>
      </Select>
    );
    const item = screen.getByTestId("select-item");
    const itemInput = screen.getByTestId("select-item-input");

    expect(item).toHaveClass("disabled");
    expect(item).toHaveAttribute("aria-selected", "false");
    expect(item).toHaveAttribute("aria-disabled", "true");
    expect(item).toMatchSnapshot();

    userEvent.click(item);

    expect(itemInput).toBeDisabled();
    expect(itemInput).toHaveAttribute("value", "false");
    expect(itemInput).toHaveAttribute("aria-checked", "false");
    expect(itemInput).toHaveAttribute("aria-disabled", "true");

    const btnTextContent = screen.getByTestId("select-btn").children[0].textContent;
    expect(btnTextContent).not.toBe("Test");
    expect(btnTextContent).toBe("Project");
  });
  test("with children", () => {
    render(
      <Select defaultOpen>
        <Select.Button style={{ width: "200px" }}>Project</Select.Button>
        <Select.Item id="test_id">
          <strong>NL</strong>Amsterdam
        </Select.Item>
      </Select>
    );
    const itemLabel = screen.getByTestId("select-item-label");
    const children = itemLabel.children;

    expect(itemLabel).toHaveTextContent("Amsterdam");
    expect(children).toHaveLength(1);
    expect(children[0].tagName.toLowerCase()).toBe("strong");
    expect(children[0].textContent).toBe("NL");

    userEvent.click(itemLabel);
    // Check for items["content"] serialization in <Select.Item /> (newChildren)
    expect(screen.getByTestId("select-btn").children[0]).toHaveTextContent("NL Amsterdam");
  });
  test("with mobileView={true}", () => {
    render(
      <Select defaultOpen mobileView>
        <Select.Item id="test_id" />
      </Select>
    );

    expect(screen.getByTestId("select-hr")).toBeVisible();
  });
  test("with disabled={true}", () => {
    render(
      <Select defaultOpen>
        <Select.Item id="test_id" aria-disabled="true" />
      </Select>
    );
    const item = screen.getByTestId("select-item");
    const selectInput = screen.getByTestId("select-item-input");

    expect(item).toHaveAttribute("tabindex", "-1");
    expect(item).toHaveAttribute("aria-disabled", "true");
    expect(selectInput).toBeDisabled();
    expect(selectInput).toHaveAttribute("aria-disabled", "true");
  });
  test("with isShown={false}", () => {
    selectCustomRender(<Select.Item id={TEST_SELECTED_MULTIPLE_ITEMS[1].id}>{TEST_SELECTED_MULTIPLE_ITEMS[1].content}</Select.Item>, {
      // Pass for document - screen render, otherwise it will not be displayed, so we won't have access to it
      providerProps: { items: TEST_SELECTED_MULTIPLE_ITEMS.slice(1, 2) },
    });

    expect(screen.queryAllByTestId("select-item")).toHaveLength(0);
  });
  test("with one selectedItems", () => {
    render(
      <Select defaultOpen>
        <Select.Item id={TEST_SELECTED_MULTIPLE_ITEMS[0].id} defaultChecked={TEST_SELECTED_MULTIPLE_ITEMS[0].selected}>
          {TEST_SELECTED_MULTIPLE_ITEMS[0].content}
        </Select.Item>
      </Select>
    );
    // , {
    //   // Pass for document - screen render, otherwise it will not be displayed, so we won't have access to it
    //   providerProps: { items: TEST_SELECTED_MULTIPLE_ITEMS.slice(0, 1) },
    // });
    const item = screen.getByTestId("select-item");
    const itemInput = screen.getByTestId("select-item-input");

    expect(item).toHaveAttribute("aria-selected", "true");

    expect(itemInput).toHaveAttribute("value", "true");
    expect(itemInput).toHaveAttribute("aria-checked", "true");
    expect(itemInput).toHaveAttribute("id", TEST_SELECTED_MULTIPLE_ITEMS[0].id);
  });
  test("with multiple selectedItems", async () => {
    render(
      <Select defaultOpen>
        {/* This does not work in testing env: {TEST_SELECTED_MULTIPLE_ITEMS.map(({ id, content }) => {
          <Select.Item id={id}>{content}</Select.Item>;
        })} */}
        <Select.Item id={TEST_SELECTED_MULTIPLE_ITEMS[0].id} defaultChecked={TEST_SELECTED_MULTIPLE_ITEMS[0].selected}>
          {TEST_SELECTED_MULTIPLE_ITEMS[0].content}
        </Select.Item>
        <Select.Item id={TEST_SELECTED_MULTIPLE_ITEMS[1].id} defaultChecked={TEST_SELECTED_MULTIPLE_ITEMS[1].selected}>
          {TEST_SELECTED_MULTIPLE_ITEMS[1].content}
        </Select.Item>
      </Select>
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
