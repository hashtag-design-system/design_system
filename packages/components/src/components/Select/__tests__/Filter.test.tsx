import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Select from "../index";
import { selectCustomRender } from "../__helpers__/utils";
import { SelectTestChildren } from "./Select.test";

describe("<Select.Filter />", () => {
  // More tests of filter functionality in the "./Select.test.tsx" file
  test("default behaviour", async () => {
    selectCustomRender(<Select.Filter placeholder="Filter" floatingplaceholder={false} />);
    const input = screen.getByTestId("select-filter");

    expect(input).toBeVisible();
    expect(input).toHaveAttribute("class");
    expect(input.onchange).toBeDefined();
    expect(input.onkeydown).toBeDefined();
    expect(input).toHaveAttribute("placeholder", "Filter");
  });
  test("default behaviour inside <Select />", async () => {
    render(
      <Select defaultOpen>
        <SelectTestChildren />
      </Select>
    );
    const filterInput = screen.getByTestId("select-filter");

    await waitFor(() => {
      expect(filterInput).toBeVisible();
    });
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
        <SelectTestChildren filterById>
          <Select.Item id="georgekrax2" content="Amsterdam" />
        </SelectTestChildren>
      </Select>
    );
    const filterInput = screen.getByTestId("select-filter");

    await waitFor(() => {
      expect(filterInput).toBeVisible();
    });
    const testVal = "george";

    userEvent.type(filterInput, testVal);

    expect(filterInput).toHaveValue(testVal);
    await waitFor(() => {
      const items = screen.queryAllByTestId("select-item");
      expect(items).toHaveLength(2);
      expect(items[0]).toHaveTextContent("georgekrax");
      expect(items[1]).toHaveTextContent("Amsterdam");
    });
  });
  test("onChange basic functionality", () => {
    const onChange = jest.fn(e => e.target.value);
    render(
      <Select defaultOpen>
        <Select.Filter placeholder="Filter" onChange={e => onChange(e)} />
      </Select>
    );
    const input = screen.getByTestId("select-filter");
    const testVal = "george";

    userEvent.type(input, testVal);

    expect(input).toHaveValue(testVal);
    expect(onChange).toHaveBeenCalledTimes(testVal.length);
    expect(onChange.mock.results[testVal.length - 1].value).toBe(testVal);
  });
  describe("keyDown", () => {
    beforeEach(() => {
      render(
        <Select defaultOpen>
          <SelectTestChildren />
        </Select>
      );
    });
    test.each([false, true])("Tab & Tab + Escape", async bool => {
      const input = screen.getByTestId("select-filter");

      await waitFor(() => {
        expect(input).toBeVisible();
      });

      userEvent.click(input);
      expect(input).toHaveFocus();
      userEvent.tab();

      const firstItem = screen.getAllByTestId("select-item")[0];

      await waitFor(() => {
        expect(firstItem).toHaveFocus();
      });

      if (!bool) {
        userEvent.tab({ shift: true });
      } else {
        fireEvent.keyDown(firstItem, {
          key: "Escape",
          code: "Escape",
          keyCode: 27,
          charCode: 27,
        });
      }
      expect(screen.getByTestId("select-filter")).not.toHaveClass("focus");
    });
    test("Escape", async () => {
      const input = screen.getByTestId("select-filter");

      await waitFor(() => {
        expect(input).toBeVisible();
      });

      userEvent.type(input, "hey");
      fireEvent.keyDown(input, {
        key: "Escape",
        code: "Escape",
        keyCode: 27,
        charCode: 27,
      });
      // userEvent.type(input, specialChars.escape);
      await waitFor(() => {
        expect(screen.getByTestId("select-modal")).not.toBeVisible();
      });
      expect(screen.getByTestId("select")).not.toHaveAttribute("open");
      expect(input).not.toHaveFocus();
    });
    test("Enter", async () => {
      const input = screen.getByTestId("select-filter");

      await waitFor(() => {
        expect(input).toBeVisible();
      });

      userEvent.type(input, "hey");
      fireEvent.keyDown(input, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
      });
      await waitFor(() => {
        expect(screen.getByTestId("select-modal")).not.toBeVisible();
      });
      expect(screen.getByTestId("select")).not.toHaveAttribute("open");
      await waitFor(() => {
        expect(screen.getByTestId("select-btn")).toHaveTextContent(screen.getAllByTestId("select-item")[0].textContent || "");
      });
    });
  });
});
