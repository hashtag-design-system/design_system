import { COUNTRIES, COUNTRIES_LITERAL_TYPE } from "@georgekrax-hashtag/common";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SelectedItems } from "../../Select/Select";
import Input from "../index";

const TEST_VAL = "6948528974";

const checkVal = (hasDefaultCountry = false): string => {
  const input = screen.getByTestId("input");
  if (hasDefaultCountry) {
    const res = TEST_VAL;
    expect(input).toHaveValue(res);
    return res;
  } else {
    const res = TEST_VAL.slice(0, 3) + " " + TEST_VAL.slice(3, 6) + " " + TEST_VAL.slice(6, 10);
    expect(input).not.toHaveValue(TEST_VAL);
    expect(input).toHaveValue(res);
    return res;
  }
};

describe("<Input.Tel />", () => {
  test("default behaviour", () => {
    render(<Input.Tel />);
    const container = screen.getByTestId("input-tel-container");
    const selectContainer = screen.getByTestId("select-container");
    const selectBtn = screen.getByTestId("select-btn");
    const selectFilter = screen.getByTestId("select-filter");
    const selectFilterFieldContainer = screen.getAllByTestId("outer-field-container")[0];
    const input = screen.getByTestId("input");

    expect(container).toBeVisible();
    expect(container).toHaveAttribute("class");
    expect(container.children).toHaveLength(2);
    expect(container).toContainElement(input);
    expect(container).toContainElement(selectContainer);

    expect(selectContainer).toBeVisible();
    expect(selectContainer).toContainElement(selectBtn);
    expect(selectContainer).toContainElement(selectFilter);
    expect(selectBtn).toHaveStyle("width: 5.35em");
    expect(selectBtn).toHaveTextContent("Code");
    expect(selectFilter).not.toHaveAttribute("placeholder");
    expect(selectFilter).toHaveAttribute("data-hasfloatingplaceholder", "true");
    expect(selectFilterFieldContainer).toContainElement(selectFilter);
    expect(selectFilterFieldContainer.children).toHaveLength(2);
    expect(selectFilterFieldContainer.children[1]).toHaveTextContent("Country");

    expect(input).toBeVisible();
    expect(input).toHaveAttribute("type", "tel");
  });
  test("onChange", () => {
    const onChange = jest.fn(e => e.target.value);
    render(<Input.Tel defaultCountry="GREECE" inputProps={{ onChange }} />);
    const input = screen.getByTestId("input");

    userEvent.type(input, TEST_VAL);

    const res = checkVal();

    const valLength = TEST_VAL.length;
    expect(onChange).toHaveBeenCalledTimes(valLength);
    expect(onChange.mock.results[valLength - 1].value).toBe(res);
  });
  test.each([true, false])(
    "onSelect & disabled",
    async disabled => {
      const onSelect = jest.fn((items: SelectedItems[]) => items.find(item => item.selected)?.content);
      render(<Input.Tel selectProps={{ defaultOpen: true, onSelect }} inputProps={{ disabled }} />);
      const modal = screen.getByTestId("select-modal");

      await waitFor(() => {
        expect(modal).toBeVisible();
      });

      const testCountry = COUNTRIES["GREECE"];
      const testCountryName = testCountry.name;

      const item = screen
        .getAllByTestId("select-item")
        .find(item => item.children[1].children[1].textContent?.includes(testCountryName));

      item?.click();

      await waitFor(() => {
        expect(modal).not.toBeVisible();
      });

      expect(screen.getByTestId("select-btn")).toHaveTextContent("+" + testCountry.callingCode);
      if (disabled) {
        expect(onSelect).toHaveBeenCalledTimes(0);
      } else {
        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(onSelect).toHaveNthReturnedWith(1, expect.stringContaining(testCountryName));
      }
    },
    5500
  );
  describe("defaultCountry, defaltValue, value", () => {
    test("with defaultCountry", () => {
      const defaultCountry: COUNTRIES_LITERAL_TYPE = "GREECE";
      render(<Input.Tel defaultCountry={defaultCountry} />);

      expect(screen.getByTestId("select-btn")).toHaveTextContent("+" + COUNTRIES[defaultCountry].callingCode);
    });
    test.each([true, false])("with defaultValue and value", isDefault => {
      render(<Input.Tel inputProps={{ defaultValue: isDefault ? TEST_VAL : undefined, value: isDefault ? undefined : TEST_VAL }} />);

      checkVal(true);
    });
    test.each([true, false])("with defaultCountry & defaultValue and value", isDefault => {
      const defaultCountry: COUNTRIES_LITERAL_TYPE = "GREECE";
      render(
        <Input.Tel
          defaultCountry={defaultCountry}
          inputProps={{ defaultValue: isDefault ? TEST_VAL : undefined, value: isDefault ? undefined : TEST_VAL }}
        />
      );

      checkVal();
      expect(screen.getByTestId("select-btn")).toHaveTextContent("+" + COUNTRIES[defaultCountry].callingCode);
    });
  });
});
