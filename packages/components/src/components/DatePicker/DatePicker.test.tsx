import { MONTHS } from "@georgekrax-hashtag/common";
import { getByTestId, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DialogDismissInfoType } from "../Dialog";
import { DatePickerOnChangeInfo, DefaultDatePicker, TestDatePickerButton, TEST_DEFAULT_DATE } from "./__helpers__";

describe("<DatePicker />", () => {
  test("default behaviour", async () => {
    render(<DefaultDatePicker />);
    const datePicker = screen.getByTestId("date-picker");
    const modal = screen.getByTestId("select-modal");

    await waitFor(() => {
      expect(modal).toBeVisible();
    });
    expect(datePicker).toHaveAttribute("class");
    expect(datePicker).toHaveAttribute("open");
    expect(datePicker).toHaveAttribute("data-ismobile");
    expect(datePicker.children).toHaveLength(1);
    expect(datePicker).toContainElement(modal);
    expect(datePicker).not.toContainElement(screen.queryByTestId("dialog-content"));
  });
  test("onToggle and with selectBtn and with width", async () => {
    const onToggle = jest.fn(e => e.target.open);
    const testWidth = 160;
    render(
      <DefaultDatePicker
        defaultOpen={false}
        onToggle={e => onToggle(e)}
        width={testWidth}
        selectBtn={({ selectedDate }) => <TestDatePickerButton selectedDate={selectedDate} />}
      />
    );
    const datePicker = screen.getByTestId("date-picker");
    const modal = screen.getByTestId("select-modal");
    const btn = screen.getByTestId("select-btn");

    expect(btn).toBeVisible();
    expect(btn).toHaveTextContent(TEST_DEFAULT_DATE.format("DD/MM/YYYY"));
    expect(btn).toHaveStyle(`width: ${testWidth}px`);
    expect(modal).not.toBeVisible();
    expect(datePicker).not.toHaveAttribute("open");
    expect(datePicker.children).toHaveLength(2);

    userEvent.click(btn);

    await waitFor(() => {
      expect(modal).toBeVisible();
    });

    expect(datePicker).toHaveAttribute("open");
    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveReturnedWith(true);

    userEvent.click(btn);

    await waitFor(() => {
      expect(modal).not.toBeVisible();
    });

    expect(datePicker).not.toHaveAttribute("open");
    expect(onToggle).toHaveBeenCalledTimes(2);
    expect(onToggle).toHaveReturnedWith(false);
  });
  test("with mobileView", async () => {
    render(<DefaultDatePicker mobileView />);
    const datePickers = screen.getAllByTestId("date-picker");

    await waitFor(() => {
      datePickers.forEach(picker => {
        expect(picker).toBeInTheDocument();
      });
    });

    expect(datePickers).toHaveLength(2);
    datePickers.forEach((picker, i) => {
      expect(picker).toHaveAttribute("data-ismobile", "true");
      if (i === 1) {
        expect(picker).toHaveAttribute("open");
      }
    });

    const bottomSheet = datePickers[0];
    expect(bottomSheet).toHaveAttribute("style");
    expect(bottomSheet).toHaveClass("bottom-sheet");
    expect(bottomSheet).toContainElement(screen.getByTestId("bottom-sheet-scroll-bar"));
    expect(bottomSheet).toContainElement(screen.getByTestId("dialog-content"));
  });
  test("with defaultCalendarDate", async () => {
    render(<DefaultDatePicker defaultCalendarDate={TEST_DEFAULT_DATE.add(1, "month")} disabledDays={undefined} />);
    const dateMonth = screen.getByTestId("date-picker-months-container-date-month");
    const dateYear = screen.getByTestId("date-picker-months-container-date-year");

    await waitFor(() => {
      expect(screen.getByTestId("select-modal")).toBeVisible();
    });

    expect(dateMonth).toBeVisible();
    expect(dateYear).toBeVisible();

    expect(dateMonth).toHaveTextContent(MONTHS[TEST_DEFAULT_DATE.month() + 1]);
    expect(dateYear).toHaveTextContent(TEST_DEFAULT_DATE.year().toString());
  });
  describe("with onChange and with onDismiss", () => {
    test("with mobileView={false}", async () => {
      const onDismiss = jest.fn(({ cancel }: DialogDismissInfoType) => cancel);
      const onChange = jest.fn(({ isShown }: DatePickerOnChangeInfo) => isShown);
      render(<DefaultDatePicker onDismiss={info => onDismiss(info)} onChange={info => onChange(info)} />);
      const testTd = screen.getAllByTestId("date-picker-tbody-td")[30];

      userEvent.click(testTd);

      expect(testTd).toHaveClass("selected");
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveReturnedWith(false);
      expect(onDismiss).toHaveReturnedWith(false);
    });
    test("with mobileView={true}", async () => {
      const onDismiss = jest.fn(({ cancel }: DialogDismissInfoType) => cancel);
      render(<DefaultDatePicker onDismiss={info => onDismiss(info)} mobileView />);
      const date = screen.getByTestId("date-picker-months-container-date");

      userEvent.click(date);

      expect(onDismiss).toHaveBeenCalledTimes(0);
    });
  });
  describe("onClick, select date", () => {
    test.each([true, false])("default functionality", async (dismissOnClick) => {
      render(<DefaultDatePicker dismissOnClick={dismissOnClick} />);
      const tds = screen.getAllByTestId("date-picker-tbody-td");
      const modal = screen.getByTestId("select-modal");

      await waitFor(() => {
        expect(modal).toBeVisible();
      });

      expect(tds).toHaveLength(42);
      const testTd = tds[30];

      userEvent.click(testTd);

      expect(testTd).toHaveClass("selected");
      if (dismissOnClick) {
        expect(modal).not.toBeVisible();
      } else {
        expect(modal).toBeVisible();
      }
    });
    test("default functionality, with mobileView={true}", async () => {
      render(<DefaultDatePicker mobileView />);
      const tds = screen.getAllByTestId("date-picker-tbody-td");
      const datePicker = screen.getAllByTestId("date-picker")[0];

      await waitFor(() => {
        expect(datePicker).toBeVisible();
      });

      expect(tds).toHaveLength(42);
      const testTd = tds[30];

      userEvent.click(testTd);

      expect(testTd).toHaveClass("selected");

      await waitFor(() => {
        expect(datePicker).not.toBeVisible();
      });
    });
    test.each([true, false])("with isRange={true}", async (dismissOnClick) => {
      render(<DefaultDatePicker isRange defaultDates={undefined} dismissOnClick={dismissOnClick} />);
      const tds = screen.getAllByTestId("date-picker-tbody-td");
      const modal = screen.getByTestId("select-modal");

      await waitFor(() => {
        expect(modal).toBeVisible();
      });

      expect(tds).toHaveLength(42);
      const firstTd = tds[32];
      const lastTd = tds[34];

      userEvent.click(firstTd);

      expect(firstTd).toHaveClass("selected");
      expect(modal).toBeVisible();

      userEvent.click(lastTd);

      expect(firstTd).toHaveClass("first");
      expect(lastTd).toHaveClass("selected");
      expect(lastTd).toHaveClass("last");

      if (dismissOnClick) {
        expect(modal).not.toBeVisible();
      } else {
        expect(modal).toBeVisible();
      }
    });
  });
});
