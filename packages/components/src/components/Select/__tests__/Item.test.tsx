import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent, { specialChars } from "@testing-library/user-event";
import { SelectContextType } from "../../../utils";
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
        <Select.Item id="test_id" content="" />
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
    expect(item).not.toHaveAttribute("hidden");
    expect(item).toHaveAttribute("tabindex", "0");
    expect(item).toHaveAttribute("role", "option");
    expect(item).toHaveAttribute("aria-selected", "false");
    expect(item).toHaveAttribute("aria-hidden", "false");
    expect(item.children).toHaveLength(2);
    expect(item.onclick).toBeDefined();
    expect(item.onmousedown).toBeDefined();
    expect(item.onkeydown).toBeDefined();

    // itemInput tests
    expect(itemInput).toBeVisible();
    expect(itemInput.tagName.toLowerCase()).toBe("input");
    expect(itemInput).toHaveAttribute("class");
    expect(itemInput).toHaveAttribute("id", "test_id");
    expect(itemInput).toHaveAttribute("value", "false");
    expect(itemInput).toHaveAttribute("type", "checkbox");
    expect(itemInput).toHaveAttribute("aria-checked", "false");

    // itemLabel tests
    const firstChild = itemLabel.children[0];
    expect(itemLabel).toBeVisible();
    expect(itemLabel).toHaveAttribute("class");
    expect(itemLabel).toHaveAttribute("for", "test_id");
    expect(itemLabel.children).toHaveLength(1);
    expect(firstChild.tagName.toLowerCase()).toBe("div");
    expect(firstChild).toHaveTextContent("");
  });
  test("with defaultChecked={true}", () => {
    render(
      <Select defaultOpen>
        <Select.Item id="test_id" defaultChecked content="" />
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
        <Select.Item id="test_id" state="disabled" content="Test" />
      </Select>
    );
    const item = screen.getByTestId("select-item");
    const itemInput = screen.getByTestId("select-item-input");

    expect(item).toHaveClass("disabled");
    expect(item).toHaveAttribute("aria-selected", "false");
    expect(item).toHaveAttribute("aria-disabled", "true");
    expect(item).toMatchSnapshot();
    expect(item.children).toHaveLength(2);

    const itemLabelChildren = item.children[1].children;
    expect(itemLabelChildren).toHaveLength(1);
    expect(itemLabelChildren[0]).toHaveTextContent("Test");

    userEvent.click(item);

    expect(itemInput).toBeDisabled();
    expect(itemInput).toHaveAttribute("value", "false");
    expect(itemInput).toHaveAttribute("aria-checked", "false");
    expect(itemInput).toHaveAttribute("aria-disabled", "true");

    const btnTextContent = screen.getByTestId("select-btn").children[0].textContent;
    expect(btnTextContent).not.toBe("Test");
    expect(btnTextContent).toBe("Project");
  });
  test("with children", async () => {
    render(
      <Select defaultOpen width="200px">
        <Select.Button>Project</Select.Button>
        <Select.Item
          id="test_id"
          content="Amsterdam"
          htmlContent={{
            before: (
              <>
                <strong>NL</strong>
              </>
            ),
          }}
        />
      </Select>
    );
    const itemLabel = screen.getByTestId("select-item-label");
    const children = itemLabel.children;

    expect(itemLabel).toHaveTextContent("Amsterdam");
    expect(children).toHaveLength(2);
    expect(children[0].tagName.toLowerCase()).toBe("strong");
    expect(children[0].textContent).toBe("NL");

    screen.getByTestId("select-item").click();
    // Check for items["content"] serialization in <Select.Item /> (newChildren)
    await waitFor(() => {
      expect(screen.getByTestId("select-btn").children[0]).toHaveTextContent("Amsterdam");
    });
  });
  test("with mobileView={true}", () => {
    render(
      <Select defaultOpen mobileView>
        <Select.Item id="test_id" content="" />
      </Select>
    );

    expect(screen.getByTestId("select-hr")).toBeVisible();
  });
  test("with disabled={true}", () => {
    render(
      <Select defaultOpen>
        <Select.Item id="test_id" aria-disabled="true" content="" />
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
    selectCustomRender(<Select.Item id={TEST_SELECTED_MULTIPLE_ITEMS[1].id} content={TEST_SELECTED_MULTIPLE_ITEMS[1].content} />, {
      // Pass for document - screen render, otherwise it will not be displayed, so we won't have access to it
      providerProps: { items: TEST_SELECTED_MULTIPLE_ITEMS.slice(1, 2) },
    });
    const items = screen.getAllByTestId("select-item");

    expect(items).toHaveLength(1);
    expect(items.filter(item => !item.hidden)).toHaveLength(0);
    items.forEach(item => {
      expect(item).toHaveAttribute("hidden");
      expect(item).toHaveAttribute("aria-hidden", "true");
    });
    expect(screen.queryAllByTestId("select-hr")).toHaveLength(0);
  });
  test("with one selectedItems", () => {
    render(
      <Select defaultOpen>
        <Select.Item
          id={TEST_SELECTED_MULTIPLE_ITEMS[0].id}
          defaultChecked={TEST_SELECTED_MULTIPLE_ITEMS[0].selected}
          content={TEST_SELECTED_MULTIPLE_ITEMS[0].content}
        />
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
        <Select.Item
          id={TEST_SELECTED_MULTIPLE_ITEMS[0].id}
          defaultChecked={TEST_SELECTED_MULTIPLE_ITEMS[0].selected}
          content={TEST_SELECTED_MULTIPLE_ITEMS[0].content}
        />
        <Select.Item
          id={TEST_SELECTED_MULTIPLE_ITEMS[1].id}
          defaultChecked={TEST_SELECTED_MULTIPLE_ITEMS[1].selected}
          content={TEST_SELECTED_MULTIPLE_ITEMS[1].content}
        />
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
  test('keyDown="Enter"', async () => {
    render(
      <Select>
        <Select.Button style={{ width: "200px" }}>Btn test</Select.Button>
        <Select.Modal>
          <Select.Item id={TEST_SELECTED_MULTIPLE_ITEMS[0].id} content={TEST_SELECTED_MULTIPLE_ITEMS[0].content} />
        </Select.Modal>
      </Select>
    );
    const item = screen.getByTestId("select-item");
    const btn = screen.getByTestId("select-btn");

    userEvent.click(btn);
    userEvent.type(btn, specialChars.arrowDown);

    userEvent.type(item, specialChars.enter);
    expect(screen.getByTestId("select")).not.toHaveAttribute("open");
    expect(screen.getByTestId("select-modal")).not.toBeVisible();
  });
  test("onClick", async () => {
    const onClick = jest.fn(e => e.currentTarget.getAttribute("data-testid"));
    const content = TEST_SELECTED_MULTIPLE_ITEMS[0].content;
    render(
      <Select defaultOpen>
        <Select.Button style={{ width: "200px" }}>Btn test</Select.Button>
        <Select.Modal>
          <Select.Item onClick={e => onClick(e)} id={TEST_SELECTED_MULTIPLE_ITEMS[0].id} content={content} />
        </Select.Modal>
      </Select>
    );
    const item = screen.getByTestId("select-item");

    act(() => {
      item.click();
    });

    await waitFor(() => {
      expect(screen.getByTestId("select-modal")).not.toBeVisible();
    });
    expect(screen.getByTestId("select")).not.toHaveAttribute("open");
    expect(screen.getByTestId("select-btn")).toHaveTextContent(content);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick.mock.results[0].value).toBe("select-item");
  });
});
