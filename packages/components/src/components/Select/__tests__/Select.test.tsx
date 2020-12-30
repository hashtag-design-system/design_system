import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createPortalElement, PortalProps } from "../../__helpers__/";
import Select from "../index";

const TestChildren: React.FunctionComponent<PortalProps> = ({ root }) => {
  return (
    <>
      <Select.Button style={{ width: "200px" }}>Project</Select.Button>
      <Select.Modal>
        <Select.Header>Header</Select.Header>
        <Select.Item id="hey">Hey</Select.Item>
        <Select.Item id="amsterdam">Amsterdam</Select.Item>
        <Select.Item id="georgekrax">georgekrax</Select.Item>
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
  describe("with children", () => {
    test("with defaultOpen={true}", () => {
      const root = createPortalElement();
      render(
        <Select defaultOpen>
          <TestChildren root={root} />
        </Select>
      );
      const select = screen.getByTestId("select");
      const modal = screen.getByTestId("select-modal");

      // With the <summary /> included
      expect(select.children).toHaveLength(2);
      expect(select.children[1].tagName.toLowerCase()).toBe("div");

      expect(modal).toBeVisible();
      expect(modal.children).toBeDefined();
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
      // Due to the fact that by default <Select.Header /> is followed by <Select.Hr />, and
      // in mobileView the <Select.Item /> sub-components are also followed by the <Select.Hr />
      expect(selectModal.children).toHaveLength(8);

      // Due to mobileView={true} each <Select.Item /> is followed by <Select.Hr />,
      // except from the last one. However, the component is set to `display: none`, but
      // still exists in the document
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
        expect(selectModal.children).toHaveLength(5);
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
        expect(selectModal.children).toHaveLength(8);

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

        const item = screen.getAllByTestId("select-item")[0];

        userEvent.click(item);

        expect(onSelect).toHaveBeenCalledTimes(1);
        const mockResults = onSelect.mock.results;
        expect(mockResults).toHaveLength(1);
        expect(mockResults[mockResults.length - 1].value).toStrictEqual([
          { id: item.children[0].id, content: item.children[1].textContent, selected: true },
        ]);

        await waitFor(() => {
          checkItem(item);
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
          expect(onSelect).toHaveBeenCalledTimes(i + 1);
        });

        const mockResults = onSelect.mock.results;
        expect(mockResults).toHaveLength(2);
        expect(mockResults[mockResults.length - 1].value).toStrictEqual([
          { id: items[0].children[0].id, content: items[0].children[1].textContent, selected: true },
          { id: items[1].children[0].id, content: items[1].children[1].textContent, selected: true },
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
  });
});
