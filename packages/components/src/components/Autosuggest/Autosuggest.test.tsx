import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent, { specialChars } from "@testing-library/user-event";
import Select from "../Select";
import { SelectedItems } from "../Select/Select";
import Autosuggest, { AutosuggestFProps } from "./index";

export const AutosuggestTestComponent: React.FC<AutosuggestFProps> = ({ ...props }) => {
  return (
    <Autosuggest placeholder="Filter" {...props}>
      <Select.Item id="hey_george" content="Hey_george" />
      <Select.Item id="amsterdamgeorge" content="Amsterdam george" />
      <Select.Item id="amsterdam" content="Amsterdam" />
      <Select.Item id="hey" content="Hey" />
      <Select.Item id="me" content="Me" />
      <Select.Item id="me2" content="Me2" />
    </Autosuggest>
  );
};

describe("<Autosuggest />", () => {
  test("default behaviour", () => {
    render(<AutosuggestTestComponent />);
    const selectContainer = screen.getByTestId("autosuggest-select-container");
    const filterInput = screen.getByTestId("select-filter");

    expect(selectContainer).toBeInTheDocument();
    expect(selectContainer.children).toHaveLength(3);
    expect(selectContainer).toContainElement(filterInput);
    expect(selectContainer).toContainElement(screen.getByTestId("select-btn"));
    expect(selectContainer).toContainElement(screen.getByTestId("select-modal"));
    expect(screen.getAllByTestId("select-item")).toHaveLength(6);
    expect(filterInput).toBeVisible();
  });
  describe("open modal", () => {
    test("with defaultOpen={true}", async () => {
      render(<AutosuggestTestComponent defaultOpen />);

      await waitFor(() => {
        expect(screen.getByTestId("select-modal")).toBeVisible();
      });
    });
    test.each(["none", "blur", "escape"])("click on <Select.Filter /> & onBlur", async eventType => {
      render(<AutosuggestTestComponent />);
      const filterInput = screen.getByTestId("select-filter");
      const modal = screen.getByTestId("select-modal");

      userEvent.click(filterInput);

      await waitFor(() => {
        expect(modal).toBeVisible();
      });
      expect(filterInput).toHaveFocus();

      if (eventType === "blur" || eventType === "escape") {
        if (eventType === "blur") {
          act(() => {
            filterInput.blur();
          });
        } else {
          fireEvent.keyDown(filterInput, {
            key: "Escape",
            code: "Escape",
            keyCode: 27,
            charCode: 27,
          });
        }
        await waitFor(() => {
          expect(modal).not.toBeVisible();
        }, { timeout: 5000 });
        expect(filterInput).not.toHaveFocus();
      }
    }, 10000);
  });
  describe("onChange & onSelect", () => {
    test("onSelect", async () => {
      const onSelect = jest.fn((items: SelectedItems[]) => items.filter(item => item.selected));
      const onChange = jest.fn(val => val);
      render(<AutosuggestTestComponent onSelect={items => onSelect(items)} onChange={value => onChange(value)} />);
      const filterInput = screen.getByTestId("select-filter");
      const modal = screen.getByTestId("select-modal");

      const testVal = "hey";
      act(() => {
        userEvent.type(filterInput, testVal);
      });
      // expect(filterInput).toHaveValue(testVal);
      await waitFor(() => {
        expect(modal).toBeVisible();
      });
      expect(onChange).toHaveBeenCalledTimes(testVal.length);
      // expect(onChange.mock.results[testVal.length - 1].value).toBe(testVal);
      const items = screen.getAllByTestId("select-item");
      expect(items).toHaveLength(6);
      await waitFor(() => {
        const shownItems = items.filter(item => !item.hidden);
        expect(shownItems).toHaveLength(2);
        shownItems.forEach(item => {
          // screen.debug();
          expect(item.children[1].children[0].children[0].tagName.toLowerCase()).toBe("strong");
          expect(item.textContent?.toLowerCase()).toContain(testVal);
        });
      });

      act(() => {
        items[0].click();
      });

      await waitFor(() => {
        expect(modal).not.toBeVisible();
      });
      const firstItemText = items[0].textContent;
      expect(filterInput).toHaveValue(firstItemText);
      expect(onSelect).toHaveBeenCalledTimes(1);
      expect(onSelect.mock.results[0].value).toHaveLength(1);

      const secondTestVal = "me";
      userEvent.type(filterInput, specialChars.backspace);
      userEvent.type(filterInput, specialChars.backspace);
      userEvent.type(filterInput, secondTestVal);

      expect(filterInput).toHaveValue(firstItemText?.slice(0, -2) + secondTestVal);

      act(() => {
        filterInput.blur();
      });

      expect(filterInput).toHaveValue(firstItemText?.slice(0, -2) + secondTestVal);
    });
    test("onChange -> onBlur -> onFocus => items.length should be the same", async () => {
      render(<AutosuggestTestComponent />);
      const filterInput = screen.getByTestId("select-filter");
      const modal = screen.getByTestId("select-modal");

      const testVal = "hey";
      userEvent.type(filterInput, testVal);
      expect(filterInput).toHaveValue(testVal);
      await waitFor(() => {
        expect(modal).toBeVisible();
      });
      const items = screen.getAllByTestId("select-item");
      expect(items).toHaveLength(6);
      let shownItems: HTMLElement[] = [];
      await waitFor(() => {
        shownItems = items.filter(item => !item.hidden);
        expect(shownItems).toHaveLength(2);
        shownItems.forEach(item => {
          // screen.debug();
          expect(item.children[1].children[0].children[0].tagName.toLowerCase()).toBe("strong");
          expect(item.textContent?.toLowerCase()).toContain(testVal);
        });
      });

      act(() => {
        filterInput.blur();
      });

      expect(filterInput).toHaveValue(testVal);

      act(() => {
        filterInput.focus();
      });
      await waitFor(() => {
        expect(modal).toBeVisible();
      });
      expect(filterInput).toHaveValue(testVal);
      expect(shownItems).toHaveLength(shownItems.length);
    });
  });
});
