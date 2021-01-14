import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Button from "../../Button";
import Select, { SelectButtonFProps, SelectFilterProps } from "../index";

export const SelectTestChildren: React.FunctionComponent<SelectFilterProps & SelectButtonFProps> = ({
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
          <Select.Item id="hey" content="Hey" />
          <Select.Item id="amsterdam" content="Amsterdam" />
          <Select.Item id="georgekrax" content="georgekrax" />
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
        <SelectTestChildren state="disabled" />
      </Select>
    );
    const btn = screen.getByTestId("select-btn");

    expect(btn).toHaveClass("disabled");

    userEvent.click(btn);

    expect(screen.getByTestId("select-modal")).not.toBeVisible();
    expect(screen.getByTestId("select")).not.toHaveAttribute("open");
  });
  describe("with children", () => {
    test("with defaultOpen={true}", async () => {
      render(
        <Select defaultOpen>
          <SelectTestChildren />
        </Select>
      );
      const select = screen.getByTestId("select");
      const modal = screen.getByTestId("select-modal");

      // With the <summary /> included
      expect(select.children).toHaveLength(2);
      expect(select.children[1].tagName.toLowerCase()).toBe("div");

      await waitFor(() => {
        expect(modal).toBeVisible();
      });
      expect(modal.children).toBeDefined();

      expect(screen.getByTestId("select-btn").children[0].textContent).toBe("Project");
    });
    test("with showValue={true}", async () => {
      render(
        <Select defaultOpen multiSelectable>
          <SelectTestChildren showValue />
        </Select>
      );

      const items = screen.getAllByTestId("select-item");
      items.slice(0, 2).forEach(item => {
        act(() => {
          item.click();
        });
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
          <SelectTestChildren showValue={false} />
        </Select>
      );

      const items = screen.getAllByTestId("select-item");
      items.slice(0, 2).forEach(item => {
        act(() => {
          item.click();
        });
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
          <SelectTestChildren />
        </Select>
      );

      expect(screen.getByTestId("modal-root")).toBeInTheDocument();
    });
    test("with mobileView={true} & defaultOpen={true}", async () => {
      render(
        <Select mobileView defaultOpen>
          <SelectTestChildren />
        </Select>
      );

      const modal = screen.getByTestId("select-modal--mobile");
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
    test("onOutsideClick", async () => {
      const onOutsideClick = jest.fn(bool => bool);
      render(
        <>
          <Button>Click me</Button>
          <Select defaultOpen onOutsideClick={boolean => onOutsideClick(boolean)}>
            <SelectTestChildren />
          </Select>
        </>
      );

      const modal = screen.getByTestId("select-modal--desktop");

      expect(screen.getByTestId("modal-root")).toBeInTheDocument();
      await waitFor(() => {
        expect(modal).toBeVisible();
      });
      act(() => {
        screen.getByTestId("btn").click();
      });
      await waitFor(() => {
        expect(modal).not.toBeVisible();
      });
      // +plus useEffect()
      expect(onOutsideClick).toHaveBeenCalledTimes(3);
      expect(onOutsideClick.mock.results[1].value).toBeTruthy();
    });
    describe("onToggle functionality", () => {
      test("basic functionality", async () => {
        render(
          <Select>
            <SelectTestChildren />
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

        await waitFor(() => {
          expect(selectModal).toBeVisible();
        });

        fireEvent.change(select, { target: { open: false } });

        expect(selectModal).not.toBeVisible();
      });
      test("with mobileView={true} functionality", async () => {
        render(
          <Select mobileView>
            <SelectTestChildren />
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
          const modal = screen.getByTestId("select-modal--mobile");
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
        userEvent.click(screen.getByTestId("select-modal--mobile"));

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
            <SelectTestChildren />
          </Select>
        );

        const items = screen.queryAllByTestId("select-item");

        act(() => {
          items[0].click();
        });

        expect(onSelect).toHaveBeenCalledTimes(1);
        const mockResults = onSelect.mock.results;

        const itemsContent = items.map(item => item.children[1].textContent);
        expect(mockResults[mockResults.length - 1].value).toStrictEqual([
          {
            id: items[0].children[0].id,
            content: itemsContent[0],
            valueAlternative: undefined,
            highlightedChildren: itemsContent[0],
            selected: true,
            isShown: true,
            ref: expect.anything(),
          },
          {
            id: items[1].children[0].id,
            content: itemsContent[1],
            valueAlternative: undefined,
            highlightedChildren: itemsContent[1],
            selected: false,
            isShown: true,
            ref: expect.anything(),
          },
          {
            id: items[2].children[0].id,
            content: itemsContent[2],
            valueAlternative: undefined,
            highlightedChildren: itemsContent[2],
            selected: false,
            isShown: true,
            ref: expect.anything(),
          },
        ]);

        await waitFor(() => {
          checkItem(items[0]);
        });
      });
      test("with mobileView={true} functionality", async () => {
        render(
          <Select mobileView defaultOpen>
            <SelectTestChildren />
          </Select>
        );

        expect(screen.getByTestId("modal-root")).toBeInTheDocument();
        await waitFor(() => {
          expect(screen.getByTestId("select-modal--mobile")).toBeVisible();
        });

        const item = screen.getAllByTestId("select-item")[0];
        userEvent.click(item);

        // Modal closes after onClick, so the items are not displayed on the screen
        await waitFor(() => {
          expect(screen.queryAllByTestId("select-item")).toHaveLength(0);
          expect(screen.queryByTestId("select-modal--mobile")).toBeNull();
        });

        expect(screen.getByTestId("select-btn")).toBeVisible();
        fireEvent.change(screen.getByTestId("select"), { target: { open: true } });

        // On second open of the modal however, the item should be selected - checked
        await waitFor(() => {
          expect(screen.getByTestId("select-modal--mobile")).toBeVisible();
          const items = screen.getAllByTestId("select-item");
          expect(items).toHaveLength(3);
          checkItem(items[0]);
        });
      });
      test("with mobileView={true} & multiSelectable={true}", async () => {
        const onSelect = jest.fn(selectedItems => selectedItems);
        render(
          <Select defaultOpen multiSelectable mobileView onSelect={items => onSelect(items)}>
            <SelectTestChildren />
          </Select>
        );

        expect(screen.getByTestId("modal-root")).toBeInTheDocument();
        await waitFor(() => {
          expect(screen.getByTestId("select-modal")).toBeVisible();
        });

        const items = screen.getAllByTestId("select-item");

        expect(items).toHaveLength(3);

        items.slice(0, 2).forEach((item, i) => {
          act(() => {
            item.click();
          });
          expect(onSelect).toHaveBeenCalledTimes(i + 1);
        });

        const mockResults = onSelect.mock.results;
        await waitFor(() => {
          expect(mockResults).toHaveLength(2);
        });

        const itemsContent = items.map(item => item.children[1].textContent);
        expect(mockResults[mockResults.length - 1].value).toStrictEqual([
          {
            id: items[0].children[0].id,
            content: itemsContent[0],
            valueAlternative: undefined,
            highlightedChildren: itemsContent[0],
            selected: true,
            isShown: true,
            ref: expect.anything(),
          },
          {
            id: items[1].children[0].id,
            content: itemsContent[1],
            valueAlternative: undefined,
            highlightedChildren: itemsContent[1],
            selected: true,
            isShown: true,
            ref: expect.anything(),
          },
          {
            id: items[2].children[0].id,
            content: itemsContent[2],
            valueAlternative: undefined,
            highlightedChildren: itemsContent[2],
            selected: false,
            isShown: true,
            ref: expect.anything(),
          },
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
    describe("with children", () => {
      test("<Select.Modal />", async () => {
        render(
          <Select defaultOpen>
            <Select.Modal>
              <Select.Item id="test_id0" content="Test 1" />
              <Select.Item id="test_id1" content="Test 2" />
            </Select.Modal>
          </Select>
        );
        const children = screen.getByTestId("select-modal").children;

        expect(children).toHaveLength(2);
        await waitFor(() => {
          expect(children[0]).toBeVisible();
          expect(children[1]).toBeVisible();
        });
        Array.from(children).forEach((child, i) => {
          expect(child.children[0].id).toBe(`test_id${i}`);
          expect(child.children[1].textContent).toBe(child.textContent);
        });
      });
      test("<Select.Header />", () => {
        render(
          <Select defaultOpen>
            <Select.Header value="Test header">
              <Select.Options>
                <Select.Item id="hey" content="Hey" />
                <Select.Item id="amsterdam" content="Amsterdam" />
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
