import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AutosuggestTestComponent } from "../../Autosuggest.test";

describe("Autosuggest <Filter />", () => {
  test("default behaviour", () => {
    render(<AutosuggestTestComponent />);
    const filterInput = screen.getByTestId("select-filter");

    expect(filterInput).toBeVisible();
    expect(filterInput.onchange).toBeDefined();
    expect(filterInput.onkeydown).toBeDefined();
    expect(filterInput.onfocus).toBeDefined();
    expect(filterInput.onblur).toBeDefined();
  });
  test("onChange", () => {
    const onChange = jest.fn(val => val);
    render(<AutosuggestTestComponent onChange={value => onChange(value)} />);
    const filterInput = screen.getByTestId("select-filter");

    const testVal = "hey";
    userEvent.type(filterInput, testVal);

    expect(filterInput).toHaveValue(testVal);
    expect(onChange).toHaveBeenCalledTimes(testVal.length);
    expect(onChange.mock.results[testVal.length - 1].value).toBe(testVal);

    const items = screen.getAllByTestId("select-item");
    expect(items).toHaveLength(6);
    const shownItems = items.filter(item => !item.hidden);
    expect(shownItems).toHaveLength(2);
    shownItems.forEach(item => {
      // screen.debug();
      expect(item.children[1].children[0].children[0].tagName.toLowerCase()).toBe("strong");
      expect(item.textContent?.toLowerCase()).toContain(testVal);
    });
  });
  test("with mobileView={true}", async () => {
    render(<AutosuggestTestComponent mobileView />);
    const filterInput = screen.getByTestId("select-filter");
    expect(screen.queryByTestId("select-modal")).toBeNull();
    userEvent.click(filterInput);

    const filterInputs = screen.getAllByTestId("select-filter");
    expect(filterInputs).toHaveLength(2);
    await waitFor(() => {
      expect(filterInputs[0]).toBeVisible();
    });
    expect(screen.getByTestId("select-modal")).toBeVisible();
    expect(screen.getByTestId("select-modal--mobile")).toBeVisible();
    expect(filterInputs[1]).toBeVisible();
  });
  test('keyDown="Enter"', async () => {
    const onBlur = jest.fn(e => e.currentTarget.getAttribute("data-testid"));
    render(<AutosuggestTestComponent onBlur={e => onBlur(e)} />);
    const filterInput = screen.getByTestId("select-filter");
    const items = screen.getAllByTestId("select-item");

    expect(items).toHaveLength(6);

    // userEvent.type(filterInput, "{enter}");
    fireEvent.keyDown(filterInput, {
      key: "Enter",
      code: "Enter",
      keyCode: 13,
      charCode: 13,
    });

    await waitFor(() => {
      expect(screen.getByTestId("select-modal")).not.toBeVisible();
    });
    expect(onBlur).toHaveBeenCalledTimes(2);
    expect(onBlur.mock.results[0].value).toBe("select-item");
    expect(filterInput).toBeVisible();
    expect(filterInput).toHaveValue(items[0].textContent);
    expect(items[0]).toHaveAttribute("aria-selected", "true");
  });
});
