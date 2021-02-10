import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MONTHS } from "@the_hashtag/common";
import { getDecade } from "../../../../utils";
import { DatePickerProps } from "../../index";
import { DefaultDatePicker, TEST_DEFAULT_DATE } from "../index";
import { DatePickerModes } from "../types";

describe("DatePicker <MonthsAndYears />", () => {
  test("default behaviour", () => {
    render(<DefaultDatePicker />);
    const container = screen.queryByTestId("date-picker-tbody-years-container");

    expect(container).toBeNull();
  });
  test.each<{ length: number } & Pick<DatePickerProps, "defaultMode"> & Required<Pick<DatePickerProps, "yearsBeforeAfter">>>([
    { defaultMode: "months", length: 12, yearsBeforeAfter: 3 },
    { defaultMode: "years", length: 16, yearsBeforeAfter: 3 },
    { defaultMode: "years", length: 16, yearsBeforeAfter: 4 },
  ])('with defaultMode="months" and defaultMode="years" and yearsBeforeAfter', async ({ defaultMode, length, yearsBeforeAfter }) => {
    render(<DefaultDatePicker defaultMode={defaultMode as "months" | "years"} yearsBeforeAfter={yearsBeforeAfter} />);
    const monthsContainer = screen.getByTestId(`date-picker-tbody-${defaultMode}-container`);
    const btns = screen.getAllByTestId(`date-picker-tbody-${defaultMode}-container-btn`);
    const date = screen.getByTestId("date-picker-months-container-date");

    await waitFor(() => {
      expect(monthsContainer).toBeVisible();
    });

    const isMonths = defaultMode === "months";
    const decade = getDecade(TEST_DEFAULT_DATE);
    if (isMonths) {
      expect(date.children).toHaveLength(1);
      const dateYear = screen.getByTestId("date-picker-months-container-date-year");
      expect(date).toContainElement(dateYear);
      expect(dateYear).toHaveTextContent(TEST_DEFAULT_DATE.year().toString());
    } else {
      expect(date.children).toHaveLength(3);
      const dateYearsFirst = screen.getByTestId("date-picker-months-container-date-years-first");
      const dateYearsLast = screen.getByTestId("date-picker-months-container-date-years-last");
      const dateYearsDash = screen.getByTestId("date-picker-months-container-date-years-dash");
      expect(date).toContainElement(dateYearsFirst);
      expect(date).toContainElement(dateYearsLast);
      expect(date).toContainElement(dateYearsDash);

      expect(dateYearsDash).toHaveTextContent("–");
      expect(dateYearsFirst).toHaveTextContent(decade.toString());
      expect(dateYearsLast).toHaveTextContent(String(decade + (yearsBeforeAfter === 4 ? 7 : 9)));
    }

    expect(monthsContainer.className).toContain(defaultMode);
    expect(monthsContainer.children).toHaveLength(length);
    expect(btns).toHaveLength(length);
    btns.forEach((btn, i) => {
      expect(btn).toBeVisible();
      if (i === 0 && isMonths) {
        expect(btn).toHaveClass("selected");
      } else if (!isMonths && (i <= 2 || i >= 13)) {
        expect(btn).toHaveClass("other-year");
        expect(btn).not.toHaveStyle("opacity: 1");
      } else {
        expect(btn).toHaveAttribute("class");
      }
      expect(btn.onmousedown).toBeDefined();
      if (isMonths) {
        expect(btn).toHaveTextContent(MONTHS[i]);
      } else {
        const year = String(decade - yearsBeforeAfter + i);
        expect(btn).toHaveTextContent(String(year));
      }
    });
  });
  test.each(DatePickerModes.slice(1, 3))("onClick container", async defaultMode => {
    render(<DefaultDatePicker defaultMode={defaultMode} />);

    const container = screen.getByTestId(`date-picker-tbody-${defaultMode}-container`);
    const btns = screen.getAllByTestId(`date-picker-tbody-${defaultMode}-container-btn`);

    await waitFor(() => {
      expect(container).toBeVisible();
    });

    const isMonths = defaultMode === "months";
    expect(btns).toHaveLength(isMonths ? 12 : 16);

    userEvent.click(btns[isMonths ? 1 : 5]);

    if (isMonths) {
      await waitFor(() => {
        expect(container).not.toBeVisible();
      }, { timeout: 2500 });
      const dateMonth = screen.getByTestId(`date-picker-months-container-date-month`);
      expect(dateMonth).toHaveTextContent("February");
    } else {
      expect(container).toBeVisible();
      const dateYear = screen.getByTestId("date-picker-months-container-date-year");
      expect(dateYear).toHaveTextContent("2022");
    }
  });
  test('with disabledDays and defaultMode="months"', async () => {
    render(
      <DefaultDatePicker
        defaultMode="months"
        disabledDays={{
          from: { date: TEST_DEFAULT_DATE },
          till: {
            date: TEST_DEFAULT_DATE.add(2, "month"),
          },
        }}
      />
    );

    const container = screen.getByTestId("date-picker-tbody-months-container");
    const btns = screen.getAllByTestId("date-picker-tbody-months-container-btn");
    const operationBtns = screen.getAllByTestId("date-picker-operation-btn");

    await waitFor(() => {
      expect(container).toBeVisible();
    });

    operationBtns.forEach(btn => {
      expect(btn).toBeDisabled();
    });

    btns.forEach((btn, i) => {
      if (i <= 2) {
        expect(btn).not.toBeDisabled();
      } else {
        expect(btn).toBeDisabled();
        expect(btn).not.toHaveStyle("opacity: 1");
      }
    });

    const testClickBtn = btns[3];
    userEvent.click(testClickBtn);

    expect(container).toBeVisible();
    expect(btns[0]).toHaveClass("selected");
    expect(testClickBtn).not.toHaveClass("selected");
  });
  test('with disabledDays and defaultMode="years"', async () => {
    render(
      <DefaultDatePicker
        defaultMode="years"
        disabledDays={{
          from: { date: TEST_DEFAULT_DATE },
          till: {
            date: TEST_DEFAULT_DATE.add(5, "years"),
          },
        }}
      />
    );

    const container = screen.getByTestId("date-picker-tbody-years-container");
    const btns = screen.getAllByTestId("date-picker-tbody-years-container-btn");
    const operationBtns = screen.getAllByTestId("date-picker-operation-btn");

    await waitFor(() => {
      expect(container).toBeVisible();
    });

    operationBtns.forEach(btn => {
      expect(btn).toBeDisabled();
    });

    btns.forEach((btn, i) => {
      if (i >= 4 && i <= 9) {
        expect(btn).not.toBeDisabled();
      } else {
        expect(btn).toBeDisabled();
        expect(btn).toHaveClass("other-year");
        expect(btn).not.toHaveStyle("opacity: 1");
      }
    });

    const testClickBtn = btns[10];
    userEvent.click(testClickBtn);

    expect(container).toBeVisible();
    expect(btns[4]).toHaveClass("selected");
    expect(testClickBtn).not.toHaveClass("selected");
  });
});
