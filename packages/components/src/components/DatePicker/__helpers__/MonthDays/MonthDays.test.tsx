import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MONTHS } from "@the_hashtag/common";
import dayjs from "dayjs";
import { DatePickerOnClickInfo } from "../../index";
import { DefaultDatePicker, TestDatePickerButton, TEST_DEFAULT_DATE } from "../index";

describe("DatePicker <MonthDays />", () => {
  test("default behaviour", async () => {
    render(<DefaultDatePicker />);
    const tbody = screen.getByTestId("date-picker-tbody");
    const tds = screen.getAllByTestId("date-picker-tbody-td");

    await waitFor(() => {
      expect(tbody).toBeVisible();
    });
    expect(tbody).toHaveAttribute("class");
    expect(tbody.children).toHaveLength(42);

    tds.forEach((td, i) => {
      expect(td).toBeVisible();
      expect(td).toHaveAttribute("class");
      if (i <= 4 || i >= 36) {
        expect(td).toHaveClass("other-day");
        if (i <= 4) {
          expect(td).toHaveTextContent(String(31 - 4 + i));
        } else {
          expect(td).toHaveTextContent(String(i - 35));
        }
      } else {
        expect(td).not.toHaveClass("other-day");
        expect(td).toHaveTextContent(String(i - 4));
      }
      expect(tbody).toContainElement(td);
    });

    userEvent.click(tds[34]);

    await waitFor(() => {
      expect(tbody).not.toBeVisible();
    });
  }, 7500);
  test("today td", () => {
    render(<DefaultDatePicker defaultCalendarDate={dayjs()} />);
    const tds = screen.getAllByTestId("date-picker-tbody-td");

    const todayTd = tds.find(
      ({ className, textContent }) => !className.includes("other-day") && textContent === dayjs().date().toString()
    );
    if (todayTd) {
      expect(todayTd.children).toHaveLength(1);
      expect(todayTd.children[0]).toHaveTextContent("Today");
    }
  });
  test("with calendarWeeks={7}", async () => {
    const calendarWeeks = 7;
    render(<DefaultDatePicker calendarWeeks={calendarWeeks} />);
    const tbody = screen.getByTestId("date-picker-tbody");

    await waitFor(() => {
      expect(tbody).toBeVisible();
    });
    expect(tbody).toHaveAttribute("class");
    expect(tbody.children).toHaveLength(7 * calendarWeeks);
  });
  test("with isRange={true} and defaultDates", async () => {
    render(<DefaultDatePicker isRange defaultDates={[TEST_DEFAULT_DATE, TEST_DEFAULT_DATE.add(3, "day")]} />);
    const tds = screen.getAllByTestId("date-picker-tbody-td");

    await waitFor(() => {
      expect(screen.getByTestId("select-modal")).toBeVisible();
    });

    const selectedTds = tds.filter(td => td.className.includes("selected"));
    expect(selectedTds).toHaveLength(4);
    selectedTds.forEach((td, i) => {
      if (i === 0) {
        expect(td).toHaveClass("first");
      } else if (i === selectedTds.length - 1) {
        expect(td).toHaveClass("last");
      } else {
        expect(td).toHaveClass("middle");
      }
    });
  });
  test("with disabledDays", () => {
    render(
      <DefaultDatePicker
        disabledDays={{
          days: [TEST_DEFAULT_DATE.set("date", 30)],
          from: { date: TEST_DEFAULT_DATE },
          till: {
            date: TEST_DEFAULT_DATE.add(20, "days"),
          },
        }}
        defaultCalendarDate={TEST_DEFAULT_DATE}
      />
    );
    const tbody = screen.getByTestId("date-picker-tbody");
    const tds = screen.getAllByTestId("date-picker-tbody-td");
    const dateMonth = screen.getByTestId("date-picker-months-container-date-month");
    const operationBtns = screen.getAllByTestId("date-picker-operation-btn");
    const firstOperationBtn = operationBtns[0];
    const secondOperationBtn = operationBtns[1];

    // For the selected month (January), dates till the TEST_DEFAULT_DATE
    // and the one specified in the disabledDays.days Array
    expect(tds.filter(td => td.className.includes("disabled"))).toHaveLength(31);

    userEvent.click(tds[10]);

    expect(tbody).not.toBeVisible();
    expect(firstOperationBtn).toBeDisabled();
    expect(secondOperationBtn).not.toBeDisabled();

    userEvent.click(firstOperationBtn);
    expect(dateMonth).toHaveTextContent("January");

    userEvent.click(secondOperationBtn);
    expect(dateMonth).toHaveTextContent("February");

    const notDisabledTds = tds.filter(td => !td.className.includes("disabled"));
    expect(notDisabledTds).toHaveLength(16);
    const last = notDisabledTds.length - 1;
    expect(notDisabledTds[notDisabledTds.length - 1]).toHaveTextContent(last.toString());

    expect(firstOperationBtn).not.toBeDisabled();
    expect(secondOperationBtn).toBeDisabled();
  });
  describe("onClick", () => {
    test("default functioncality", async () => {
      const onClick = jest.fn(({ dayInCalendar, otherDay }: DatePickerOnClickInfo) => ({ dayInCalendar, otherDay }));
      render(
        <DefaultDatePicker onClick={onClick} selectBtn={({ selectedDate }) => <TestDatePickerButton selectedDate={selectedDate} />} />
      );
      const tds = screen.getAllByTestId("date-picker-tbody-td");
      const selectBtn = screen.getByTestId("select-btn");
      const modal = screen.getByTestId("select-modal");

      await waitFor(() => {
        expect(modal).toBeVisible();
      });
      expect(selectBtn).toHaveTextContent(TEST_DEFAULT_DATE.format("DD/MM/YYYY"));

      const testTd = tds[28];
      userEvent.click(testTd);

      expect(testTd).toHaveClass("selected");

      await waitFor(() => {
        expect(modal).not.toBeVisible();
      });
      const date = testTd.textContent;
      expect(selectBtn).toHaveTextContent(date + TEST_DEFAULT_DATE.format("/MM/YYYY"));
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick.mock.results[0].value).toStrictEqual({
        dayInCalendar: TEST_DEFAULT_DATE.date(parseInt(date!)),
        otherDay: undefined,
      });
    });
    test("other day", async () => {
      const onClick = jest.fn(({ dayInCalendar, otherDay }: DatePickerOnClickInfo) => ({ dayInCalendar, otherDay }));
      render(<DefaultDatePicker dismissOnClick={false} onClick={onClick} />);
      const tds = screen.getAllByTestId("date-picker-tbody-td");
      const dateMonth = screen.getByTestId("date-picker-months-container-date-month");

      const testMonth = TEST_DEFAULT_DATE.month();
      expect(dateMonth).toHaveTextContent(MONTHS[testMonth]);

      userEvent.click(tds[tds.length - 1]);

      await waitFor(() => {
        expect(screen.getByTestId("select-modal")).toBeVisible();
      });

      const newMonth = testMonth + 1;
      expect(dateMonth).toHaveTextContent(MONTHS[newMonth]);
      const selectedTd = screen.getAllByTestId("date-picker-tbody-td")[6];
      expect(selectedTd).toHaveClass("selected");
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick.mock.results[0].value).toStrictEqual({
        dayInCalendar: TEST_DEFAULT_DATE.month(newMonth).date(parseInt(selectedTd.textContent!)),
        otherDay: "next",
      });
    });
    test.each([true, false])("with isRange={true}", async reverse => {
      render(<DefaultDatePicker isRange defaultDates={undefined} />);
      const modal = screen.getByTestId("select-modal");
      const tds = screen.getAllByTestId("date-picker-tbody-td");

      await waitFor(() => {
        expect(modal).toBeVisible();
      });

      const testTdFirst = tds.find(td => !td.className.includes("other-day") && td.textContent?.includes(reverse ? "30" : "27"));
      expect(testTdFirst).toBeDefined();
      userEvent.click(testTdFirst!);

      expect(testTdFirst).toHaveClass("selected");
      expect(testTdFirst).not.toHaveClass("first");

      const testTdSecond = tds.find(td => !td.className.includes("other-day") && td.textContent?.includes(reverse ? "27" : "30"));
      expect(testTdSecond).toBeDefined();
      userEvent.click(testTdSecond!);

      await waitFor(() => {
        expect(modal).not.toBeVisible();
      });

      expect(testTdSecond).toHaveClass("selected");
      expect(reverse ? testTdFirst : testTdSecond).toHaveClass("last");
      expect(reverse ? testTdSecond : testTdFirst).toHaveClass("first");

      const testTdsMiddle = tds.filter(td => !td.className.includes("other-day") && td.className.includes("middle"));
      expect(testTdsMiddle).toHaveLength(2);
      testTdsMiddle.forEach(middleTd => {
        expect(middleTd).toHaveClass("selected");
      });
    });
    test("with isRange={true} and otherDay", async () => {
      render(<DefaultDatePicker isRange defaultDates={undefined} />);
      const modal = screen.getByTestId("select-modal");
      let tds = screen.getAllByTestId("date-picker-tbody-td");

      await waitFor(() => {
        expect(modal).toBeVisible();
      });

      // screen.debug(tds);
      let testTdFirst = tds.find(({ className, textContent }) => !className.includes("other-day") && textContent?.includes("27"));
      expect(testTdFirst).toBeDefined();
      userEvent.click(testTdFirst!);

      expect(testTdFirst).toHaveClass("selected");
      expect(testTdFirst).not.toHaveClass("first");

      let testTdSecond = tds.find(({ className, textContent }) => className.includes("other-day") && textContent?.includes("5"));
      expect(testTdSecond).toBeDefined();
      userEvent.click(testTdSecond!);

      await waitFor(() => {
        expect(modal).not.toBeVisible();
      });

      tds = screen.getAllByTestId("date-picker-tbody-td");
      testTdSecond = tds.find(({ className, textContent }) => !className.includes("other-day") && textContent?.includes("5"));
      expect(testTdSecond).toHaveClass("selected");
      expect(testTdSecond).toHaveClass("last");

      const testTdsMiddle = tds.filter(td => td.className.includes("middle"));
      // In new months tbody (panel) only
      expect(testTdsMiddle).toHaveLength(5);
      expect(screen.getByTestId("date-picker-months-container-date-month")).toHaveTextContent(MONTHS[TEST_DEFAULT_DATE.month() + 1]);
      testTdsMiddle.forEach(middleTd => {
        expect(middleTd).toHaveClass("selected");
      });
    });
  });
});
