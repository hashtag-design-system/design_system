import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Select, { SelectButtonFProps, SelectFilterProps } from "../index";

const TestChildren: React.FunctionComponent<SelectFilterProps & SelectButtonFProps> = ({
  state,
  showValue,
  filterById = false,
  children,
}) => {
  return (
    <>
      <Select.Button state={state} showValue={showValue} style={{ width: "200px" }}>
        Project
      </Select.Button>
      <Select.Modal>
        <Select.Header value="Header" />
        <Select.Options>
          <Select.Filter filterById={filterById} placeholder="Filter" floatingplaceholder={false} />
          <Select.Item id="hey">Hey</Select.Item>
          <Select.Item id="amsterdam">Amsterdam</Select.Item>
          <Select.Item id="georgekrax">georgekrax</Select.Item>
          {children}
        </Select.Options>
      </Select.Modal>
    </>
  );
};

const checkItem = (item: HTMLElement, boolean = true) => {
  expect(item).toHaveAttribute("aria-selected", String(boolean));
  expect(item.children[0]).toHaveAttribute("value", String(boolean));
  expect(item.children[0]).toHaveAttribute("aria-checked", String(boolean));
};

describe("<Select />", () => {
  test("default behaviour", () => {
    render(<Select />);
    const select = screen.getByTestId("select");

    expect(select).toBeInTheDocument();
    expect(select).toHaveAttribute("class");
    expect(select).not.toHaveAttribute("open");
    expect(select.ontoggle).toBeDefined();
    expect(select.onkeydown).toBeDefined();
    expect(select.children).toHaveLength(0);

    const container = screen.getByTestId("select-container");

    expect(container).toBeVisible();
    expect(container).toHaveAttribute("class");
    expect(container.tagName.toLowerCase()).toBe("div");
    expect(container.children).toHaveLength(1);
    expect(container.children[0].tagName.toLowerCase()).toBe("details");
  });
  test('state="disabled"', () => {
    render(
      <Select>
        <TestChildren state="disabled" />
      </Select>
    );
    const btn = screen.getByTestId("select-btn");

    expect(btn).toHaveClass("disabled");

    userEvent.click(btn);

    expect(screen.getByTestId("select-modal")).not.toBeVisible();
    expect(screen.getByTestId("select")).not.toHaveAttribute("open");
  });
  describe("with children", () => {
    test("with defaultOpen={true}", () => {
      render(
        <Select defaultOpen>
          <TestChildren />
        </Select>
      );
      const select = screen.getByTestId("select");
      const modal = screen.getByTestId("select-modal");

      // With the <summary /> included
      expect(select.children).toHaveLength(2);
      expect(select.children[1].tagName.toLowerCase()).toBe("div");

      expect(modal).toBeVisible();
      expect(modal.children).toBeDefined();

      expect(screen.getByTestId("select-btn").children[0].textContent).toBe("Project");
    });
    test("with showValue={true}", () => {
      render(
        <Select defaultOpen multiSelectable>
          <TestChildren showValue />
        </Select>
      );

      const items = screen.getAllByTestId("select-item");
      items.slice(0, 2).forEach(item => {
        userEvent.click(item);
      });

      expect(items[0]).toHaveAttribute("aria-selected", "true");
      expect(items[1]).toHaveAttribute("aria-selected", "true");
      expect(items[2]).toHaveAttribute("aria-selected", "false");

      // Do not change value with showValue={false}, and keep the default one
      expect(screen.getByTestId("select-btn").children[0].textContent).toBe("Hey, Amsterdam");
    });
    test("with showValue={false} & value", () => {
      render(
        <Select defaultOpen multiSelectable>
          <TestChildren showValue={false} />
        </Select>
      );

      const items = screen.getAllByTestId("select-item");
      items.slice(0, 2).forEach(item => {
        userEvent.click(item);
      });

      expect(items[0]).toHaveAttribute("aria-selected", "true");
      expect(items[1]).toHaveAttribute("aria-selected", "true");
      expect(items[2]).toHaveAttribute("aria-selected", "false");

      // Do not change value with showValue={false}, and keep the default one
      expect(screen.getByTestId("select-btn").children[0].textContent).toBe("Project");
    });
    test("with mobileView={true}", () => {
      render(
        <Select mobileView>
          <TestChildren />
        </Select>
      );

      expect(screen.getByTestId("modal-root")).toBeInTheDocument();
    });
    test("with mobileView={true} & defaultOpen={true}", async () => {
      render(
        <Select mobileView defaultOpen>
          <TestChildren />
        </Select>
      );

      const modal = screen.getByTestId("modal");
      const selectModal = screen.getByTestId("select-modal");

      expect(screen.getByTestId("modal-root")).toBeInTheDocument();
      await waitFor(() => {
        expect(modal).toBeVisible();
      });
      expect(modal).toHaveAttribute("class");
      expect(modal).toHaveAttribute("style");
      expect(modal.children).toHaveLength(1);
      expect(modal.children[0].tagName.toLowerCase()).toBe("div");
      expect(modal).toContainElement(selectModal);
      expect(selectModal.children).toHaveLength(3);

      // Also +1, dues to the fact that the <Select.Header /> is followed by one, by default
      const selectHrs = screen.getAllByTestId("select-hr");
      expect(selectHrs).toHaveLength(4);
      selectHrs.forEach(hr => {
        expect(hr).toBeVisible();
      });
    });
    describe("onToggle functionality", () => {
      test("basic functionality", () => {
        render(
          <Select>
            <TestChildren />
          </Select>
        );

        // Test firstly for default (isOpen={false}) behaviour
        const selectModal = screen.getByTestId("select-modal");
        const select = screen.getByTestId("select");

        expect(select).not.toHaveAttribute("open");
        expect(selectModal).toBeInTheDocument();
        expect(selectModal).not.toBeVisible();
        // Not mobile, so that <Select.Item /> to be followed by <Selct.Hr />
        // Only the <Select.Header /> is followed by <Select.Hr />
        expect(selectModal.children).toHaveLength(3);
        const items = screen.queryAllByTestId("select-item");
        expect(items).toHaveLength(3);
        items.forEach(item => checkItem(item, false));

        fireEvent.change(select, { target: { open: true } });

        expect(selectModal).toBeVisible();

        fireEvent.change(select, { target: { open: false } });

        expect(selectModal).not.toBeVisible();
      });
      test("with mobileView={true} functionality", async () => {
        render(
          <Select mobileView>
            <TestChildren />
          </Select>
        );

        // Test firstly for default (isOpen={false}) behaviour
        const select = screen.getByTestId("select");
        const modalRoot = screen.getByTestId("modal-root");

        expect(screen.getByTestId("select-btn")).toBeVisible();
        expect(modalRoot).toBeInTheDocument();
        // Only the <Select.Button /> is visible and in the document
        expect(select.children).toHaveLength(1);
        expect(select).not.toHaveAttribute("open");

        fireEvent.change(select, { target: { open: true } });

        await waitFor(() => {
          const modal = screen.getByTestId("modal");
          expect(modal).toBeVisible();
          expect(modal).toBeInTheDocument();
          expect(modal).toContainElement(screen.getByTestId("select-modal"));
        });

        const selectModal = screen.getByTestId("select-modal");
        expect(selectModal).toBeVisible();
        expect(selectModal).toBeInTheDocument();
        // Mobile device, so <Select.Item /> is followed by <Selct.Hr />
        // Not Only the <Select.Header /> is followed by <Select.Hr />
        expect(selectModal.children).toHaveLength(3);

        const items = screen.queryAllByTestId("select-item");
        expect(items).toHaveLength(3);
        items.forEach(item => checkItem(item, false));

        fireEvent.change(select, { target: { open: false } });

        await waitFor(() => {
          expect(screen.queryByTestId("select-modal")).toBeNull();
          expect(modalRoot.children).toHaveLength(0);
        });

        fireEvent.change(select, { target: { open: true } });

        await waitFor(() => {
          expect(selectModal).toBeVisible();
          expect(modalRoot.children).toHaveLength(1);
        });

        // Click outside
        userEvent.click(screen.getByTestId("modal"));

        await waitFor(() => {
          expect(screen.queryByTestId("select-modal")).toBeNull();
          expect(modalRoot.children).toHaveLength(0);
        });
      });
    });
    describe("onSelect functionality", () => {
      test("basic functionality", async () => {
        const onSelect = jest.fn(selectedItems => selectedItems);
        render(
          <Select defaultOpen onSelect={items => onSelect(items)}>
            <TestChildren />
          </Select>
        );

        const items = screen.queryAllByTestId("select-item");

        userEvent.click(items[0]);

        // As it is also called at useEffect(), on initial render
        expect(onSelect).toHaveBeenCalledTimes(2);
        const mockResults = onSelect.mock.results;

        expect(mockResults[mockResults.length - 1].value).toStrictEqual([
          { id: items[0].children[0].id, content: items[0].children[1].textContent, selected: true, isShown: true },
          { id: items[1].children[0].id, content: items[1].children[1].textContent, selected: false, isShown: true },
          { id: items[2].children[0].id, content: items[2].children[1].textContent, selected: false, isShown: true },
        ]);

        await waitFor(() => {
          checkItem(items[0]);
        });
      });
      test("with mobileView={true} functionality", async () => {
        render(
          <Select mobileView defaultOpen>
            <TestChildren />
          </Select>
        );

        const modal = screen.getByTestId("modal");

        expect(screen.getByTestId("modal-root")).toBeInTheDocument();
        await waitFor(() => {
          expect(modal).toBeVisible();
        });

        const item = screen.getAllByTestId("select-item")[0];
        userEvent.click(item);

        // Modal closes after onClick, so the items are not displayed on the screen
        await waitFor(() => {
          expect(screen.queryAllByTestId("select-item")).toHaveLength(0);
          expect(screen.queryByTestId("modal")).toBeNull();
        });

        expect(screen.getByTestId("select-btn")).toBeVisible();
        fireEvent.change(screen.getByTestId("select"), { target: { open: true } });

        // On second open of the modal however, the item should be selected - checked
        await waitFor(() => {
          expect(modal).toBeVisible();
          const items = screen.getAllByTestId("select-item");
          expect(items).toHaveLength(3);
          checkItem(items[0]);
        });
      });
      test("with mobileView={true} & multiSelectable={true}", async () => {
        const onSelect = jest.fn(selectedItems => selectedItems);
        render(
          <Select defaultOpen multiSelectable mobileView onSelect={items => onSelect(items)}>
            <TestChildren />
          </Select>
        );

        const modal = screen.getByTestId("modal");

        expect(screen.getByTestId("modal-root")).toBeInTheDocument();
        await waitFor(() => {
          expect(modal).toBeVisible();
        });

        const items = screen.getAllByTestId("select-item");

        expect(items).toHaveLength(3);

        items.slice(0, 2).forEach((item, i) => {
          userEvent.click(item);
          // +1 due to the index, which starts from 0
          // +1 due to the initial first call on useEffect()
          expect(onSelect).toHaveBeenCalledTimes(i + 2);
        });

        const mockResults = onSelect.mock.results;
        await waitFor(() => {
          expect(mockResults).toHaveLength(3);
        });

        expect(mockResults[mockResults.length - 1].value).toStrictEqual([
          { id: items[0].children[0].id, content: items[0].children[1].textContent, selected: true, isShown: true },
          { id: items[1].children[0].id, content: items[1].children[1].textContent, selected: true, isShown: true },
          { id: items[2].children[0].id, content: items[2].children[1].textContent, selected: false, isShown: true },
        ]);

        // Modal should not close after onClick, due to multiSelectable={true}
        expect(screen.getByTestId("select-modal")).toBeVisible();

        await waitFor(() => {
          items.forEach((item, i) => {
            const checked = i <= 1 ? true : false;
            checkItem(item, checked);
          });
        });
      });
    });
    describe("<Select.Filter />", () => {
      // Tests in conjuction with the tests in "./Filter.test/tsx" file
      test("default behaviour", async () => {
        render(
          <Select defaultOpen>
            <TestChildren />
          </Select>
        );
        const filterInput = screen.getByTestId("input");

        expect(filterInput).toBeVisible();
        const testVal = "george";

        userEvent.type(filterInput, testVal);

        expect(filterInput).toHaveValue(testVal);
        await waitFor(() => {
          const items = screen.queryAllByTestId("select-item");
          expect(items).toHaveLength(1);
          expect(items[0]).toHaveTextContent("georgekrax");
        });
      });
      test("with filterById={true}", async () => {
        render(
          <Select defaultOpen>
            <TestChildren filterById>
              <Select.Item id="georgekrax2">amsterdam</Select.Item>
            </TestChildren>
          </Select>
        );
        const filterInput = screen.getByTestId("input");

        expect(filterInput).toBeVisible();
        const testVal = "george";

        userEvent.type(filterInput, testVal);

        expect(filterInput).toHaveValue(testVal);
        await waitFor(() => {
          const items = screen.queryAllByTestId("select-item");
          expect(items).toHaveLength(2);
          expect(items[0]).toHaveTextContent("georgekrax");
          expect(items[1]).toHaveTextContent("amsterdam");
        });
      });
      test("onChange basic functionality", () => {
        const onChange = jest.fn(e => e.target.value);
        render(
          <Select defaultOpen>
            <Select.Filter placeholder="Filter" onChange={e => onChange(e)} />
          </Select>
        );
        const input = screen.getByTestId("input");
        const testVal = "george";

        userEvent.type(input, testVal);

        expect(input).toHaveValue(testVal);
        expect(onChange).toHaveBeenCalledTimes(testVal.length);
        expect(onChange.mock.results[testVal.length - 1].value).toBe(testVal);
      });
    });
    describe("with children", () => {
      test("<Select.Modal />", () => {
        render(
          <Select defaultOpen>
            <Select.Modal>
              <Select.Item id="test_id0">Test 1</Select.Item>
              <Select.Item id="test_id1">Test 2</Select.Item>
            </Select.Modal>
          </Select>
        );
        const children = screen.getByTestId("select-modal").children;

        expect(children).toHaveLength(2);
        Array.from(children).forEach((child, i) => {
          expect(child).toBeVisible();
          expect(child.children[0].id).toBe(`test_id${i}`);
          expect(child.children[1].textContent).toBe(child.textContent);
        });
      });
      test("<Select.Header />", () => {
        render(
          <Select defaultOpen>
            <Select.Header value="Test header">
              <Select.Options>
                <Select.Item id="hey">Hey</Select.Item>
                <Select.Item id="amsterdam">Amsterdam</Select.Item>
              </Select.Options>
            </Select.Header>
          </Select>
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
  });
});
