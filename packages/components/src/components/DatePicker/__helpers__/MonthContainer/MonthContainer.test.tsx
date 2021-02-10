import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MONTHS } from "@the_hashtag/common";
import { getDecade } from "../../../../utils";
import { DefaultDatePicker } from "../index";
import { TEST_DEFAULT_DATE } from "../utils";

type NullHtmlElement = HTMLElement | null;

// Disabled <OperationButton /> components, have been tested for disabledDays at the
// <MonthDays />
describe("DatePicker <MonthContainer />", () => {
  test("default behaviour", async () => {
    render(<DefaultDatePicker />);
    const container = screen.getByTestId("date-picker-months-container");
    const date = screen.getByTestId("date-picker-months-container-date");
    const dateMonth = screen.getByTestId("date-picker-months-container-date-month");
    const dateYear = screen.getByTestId("date-picker-months-container-date-year");
    const operationBtns = screen.getAllByTestId("date-picker-operation-btn");

    await waitFor(() => {
      expect(container).toBeVisible();
    });
    expect(container).toHaveAttribute("class");
    expect(container).toContainElement(date);
    expect(container.children).toHaveLength(3);

    expect(operationBtns).toHaveLength(2);
    operationBtns.forEach((btn, i) => {
      expect(container).toContainElement(btn);
      expect(btn.children).toHaveLength(1);
      expect(btn).toContainElement(screen.getAllByTestId("icon")[i]);
    });

    expect(date).toHaveAttribute("class");
    expect(date.onmousedown).toBeDefined();
    expect(date.children).toHaveLength(2);
    expect(date).toContainElement(dateMonth);
    expect(date).toContainElement(dateYear);
    expect(dateMonth).toHaveTextContent(MONTHS[TEST_DEFAULT_DATE.month()]);
    expect(dateYear).toHaveTextContent(TEST_DEFAULT_DATE.year().toString());
  });
  describe("onMouseDown", () => {
    test("default functionality", async () => {
      render(<DefaultDatePicker />);
      const container = screen.getByTestId("date-picker-months-container");
      const date = screen.getByTestId("date-picker-months-container-date");
      let dateMonth: NullHtmlElement = screen.getByTestId("date-picker-months-container-date-month");
      let dateYear: NullHtmlElement = screen.getByTestId("date-picker-months-container-date-year");
      const operationBtns = screen.getAllByTestId("date-picker-operation-btn");

      await waitFor(() => {
        expect(container).toBeVisible();
      });

      userEvent.click(date);

      expect(dateMonth).toBeVisible();
      expect(dateYear).toBeVisible();

      dateMonth = screen.queryByTestId("date-picker-months-container-date-month");
      dateYear = screen.getByTestId("date-picker-months-container-date-year");

      expect(dateMonth).toBeNull();
      expect(dateYear).toBeVisible();
      expect(dateYear).toHaveTextContent(TEST_DEFAULT_DATE.year().toString());
      operationBtns.forEach(btn => {
        expect(btn).toBeDisabled();
      });

      userEvent.click(date);

      let firstYear: NullHtmlElement = screen.getByTestId("date-picker-months-container-date-years-first");
      let lastYear: NullHtmlElement = screen.getByTestId("date-picker-months-container-date-years-last");
      let dash: NullHtmlElement = screen.getByTestId("date-picker-months-container-date-years-dash");
      const decade = getDecade(TEST_DEFAULT_DATE);
      dateMonth = screen.queryByTestId("date-picker-months-container-date-month");
      dateYear = screen.queryByTestId("date-picker-months-container-date-year");

      expect(dateMonth).toBeNull();
      expect(dateYear).toBeNull();
      expect(firstYear).toBeVisible();
      expect(lastYear).toBeVisible();
      expect(dash).toBeVisible();
      expect(firstYear).toHaveTextContent(decade.toString());
      expect(lastYear).toHaveTextContent((decade + 9).toString());
      expect(dash).toHaveTextContent("–");
      operationBtns.forEach(btn => {
        expect(btn).not.toBeDisabled();
      });

      userEvent.click(date);

      firstYear = screen.queryByTestId("date-picker-months-container-date-years-first");
      lastYear = screen.queryByTestId("date-picker-months-container-date-years-last");
      dash = screen.queryByTestId("date-picker-months-container-date-years-dash");
      expect(firstYear).toBeVisible();
      expect(lastYear).toBeVisible();
      expect(dash).toBeVisible();
    });
    describe("with allowedModes", () => {
      test("allowedModes={{ calendar: true, months: false, years: false }}", async () => {
        render(<DefaultDatePicker allowedModes={{ calendar: true, months: false, years: false }} />);
        const container = screen.getByTestId("date-picker-months-container");
        const date = screen.getByTestId("date-picker-months-container-date");
        let dateMonth: NullHtmlElement = screen.getByTestId("date-picker-months-container-date-month");
        let dateYear: NullHtmlElement = screen.getByTestId("date-picker-months-container-date-year");

        await waitFor(() => {
          expect(container).toBeVisible();
        });

        userEvent.click(date);

        expect(dateMonth).toBeVisible();
        expect(dateYear).toBeVisible();

        dateMonth = screen.queryByTestId("date-picker-months-container-date-month");
        dateYear = screen.getByTestId("date-picker-months-container-date-year");

        expect(dateMonth).not.toBeNull();
        expect(dateYear).toBeVisible();
      });
      test("allowedModes={{ calendar: false, months: true, years: false }}", async () => {
        render(<DefaultDatePicker defaultMode="months" allowedModes={{ calendar: false, months: true, years: false }} />);
        const container = screen.getByTestId("date-picker-months-container");
        const date = screen.getByTestId("date-picker-months-container-date");
        let dateMonth: NullHtmlElement = screen.queryByTestId("date-picker-months-container-date-month");
        let dateYear: NullHtmlElement = screen.getByTestId("date-picker-months-container-date-year");

        await waitFor(() => {
          expect(container).toBeVisible();
        });

        expect(dateMonth).toBeNull();
        expect(dateYear).toBeVisible();

        userEvent.click(date);

        dateMonth = screen.queryByTestId("date-picker-months-container-date-month");
        dateYear = screen.getByTestId("date-picker-months-container-date-year");

        expect(dateMonth).toBeNull();
        expect(dateYear).toBeVisible();
      });
      test("allowedModes={{ calendar: false, months: false, years: true }}", async () => {
        render(<DefaultDatePicker defaultMode="years" allowedModes={{ calendar: false, months: false, years: true }} />);
        const container = screen.getByTestId("date-picker-months-container");
        const date = screen.getByTestId("date-picker-months-container-date");
        let dateMonth: NullHtmlElement = screen.queryByTestId("date-picker-months-container-date-month");
        let dateYear: NullHtmlElement = screen.queryByTestId("date-picker-months-container-date-year");
        let firstYear: NullHtmlElement = screen.getByTestId("date-picker-months-container-date-years-first");
        let lastYear: NullHtmlElement = screen.getByTestId("date-picker-months-container-date-years-last");
        let dash: NullHtmlElement = screen.getByTestId("date-picker-months-container-date-years-dash");

        await waitFor(() => {
          expect(container).toBeVisible();
        });

        expect(dateMonth).toBeNull();
        expect(dateYear).toBeNull();
        expect(firstYear).toBeVisible();
        expect(lastYear).toBeVisible();
        expect(dash).toBeVisible();

        userEvent.click(date);

        dateMonth = screen.queryByTestId("date-picker-months-container-date-month");
        dateYear = screen.queryByTestId("date-picker-months-container-date-year");
        firstYear = screen.getByTestId("date-picker-months-container-date-years-first");
        lastYear = screen.getByTestId("date-picker-months-container-date-years-last");
        dash = screen.getByTestId("date-picker-months-container-date-years-dash");

        expect(dateMonth).toBeNull();
        expect(dateYear).toBeNull();
        expect(firstYear).toBeVisible();
        expect(lastYear).toBeVisible();
        expect(dash).toBeVisible();
      });
      test("allowedModes={{ calendar: true, months: true, years: false }}", async () => {
        render(<DefaultDatePicker allowedModes={{ calendar: true, months: true, years: false }} />);
        const container = screen.getByTestId("date-picker-months-container");
        const date = screen.getByTestId("date-picker-months-container-date");
        let dateMonth: NullHtmlElement = screen.getByTestId("date-picker-months-container-date-month");
        let dateYear: NullHtmlElement = screen.getByTestId("date-picker-months-container-date-year");

        await waitFor(() => {
          expect(container).toBeVisible();
        });

        // Double click to check
        for (let i = 0; i <= 1; i++) {
          userEvent.click(date);

          if (i === 0) {
            expect(dateMonth).toBeVisible();
          } else {
            expect(dateMonth).toBeNull();
          }
          expect(dateYear).toBeVisible();

          dateMonth = screen.queryByTestId("date-picker-months-container-date-month");
          dateYear = screen.getByTestId("date-picker-months-container-date-year");

          if (i === 0) {
            expect(dateMonth).toBeNull();
          } else {
            expect(dateMonth).toBeVisible();
          }
          expect(dateYear).toBeVisible();
        }
      });
      test("allowedModes={{ calendar: true, months: false, years: true }}", async () => {
        render(<DefaultDatePicker allowedModes={{ calendar: true, months: false, years: true }} />);
        const container = screen.getByTestId("date-picker-months-container");
        const date = screen.getByTestId("date-picker-months-container-date");
        let dateMonth: NullHtmlElement = screen.getByTestId("date-picker-months-container-date-month");
        let dateYear: NullHtmlElement = screen.getByTestId("date-picker-months-container-date-year");
        let firstYear = screen.queryByTestId("date-picker-months-container-date-years-first");
        let lastYear = screen.queryByTestId("date-picker-months-container-date-years-last");
        let dash = screen.queryByTestId("date-picker-months-container-date-years-dash");

        await waitFor(() => {
          expect(container).toBeVisible();
        });

        // Double click to check
        for (let i = 0; i <= 1; i++) {
          userEvent.click(date);

          if (i === 0) {
            expect(dateMonth).toBeVisible();
            expect(dateYear).toBeVisible();
            expect(firstYear).toBeNull();
            expect(lastYear).toBeNull();
            expect(dash).toBeNull();
          } else {
            expect(dateMonth).toBeNull();
            expect(dateYear).toBeNull();
            expect(firstYear).toBeVisible();
            expect(lastYear).toBeVisible();
            expect(dash).toBeVisible();
          }

          dateMonth = screen.queryByTestId("date-picker-months-container-date-month");
          dateYear = screen.queryByTestId("date-picker-months-container-date-year");
          firstYear = screen.getByTestId("date-picker-months-container-date-years-first");
          lastYear = screen.getByTestId("date-picker-months-container-date-years-last");
          dash = screen.getByTestId("date-picker-months-container-date-years-dash");

          expect(dateMonth).toBeNull();
          expect(dateYear).toBeNull();
          expect(firstYear).toBeVisible();
          expect(lastYear).toBeVisible();
          expect(dash).toBeVisible();
        }
      });
      test("allowedModes={{ calendar: false, months: true, years: true }}", async () => {
        render(<DefaultDatePicker defaultMode="months" allowedModes={{ calendar: false, months: true, years: true }} />);
        const container = screen.getByTestId("date-picker-months-container");
        const date = screen.getByTestId("date-picker-months-container-date");
        let dateMonth: NullHtmlElement = screen.queryByTestId("date-picker-months-container-date-month");
        let dateYear: NullHtmlElement = screen.getByTestId("date-picker-months-container-date-year");
        let firstYear = screen.queryByTestId("date-picker-months-container-date-years-first");
        let lastYear = screen.queryByTestId("date-picker-months-container-date-years-last");
        let dash = screen.queryByTestId("date-picker-months-container-date-years-dash");

        await waitFor(() => {
          expect(container).toBeVisible();
        });

        // Double click to check
        for (let i = 0; i <= 1; i++) {
          userEvent.click(date);

          if (i === 0) {
            expect(dateMonth).toBeNull();
            expect(dateYear).toBeVisible();
            expect(firstYear).toBeNull();
            expect(lastYear).toBeNull();
            expect(dash).toBeNull();
          } else {
            expect(dateMonth).toBeNull();
            expect(dateYear).toBeNull();
            expect(firstYear).toBeVisible();
            expect(lastYear).toBeVisible();
            expect(dash).toBeVisible();
          }

          dateMonth = screen.queryByTestId("date-picker-months-container-date-month");
          dateYear = screen.queryByTestId("date-picker-months-container-date-year");
          firstYear = screen.getByTestId("date-picker-months-container-date-years-first");
          lastYear = screen.getByTestId("date-picker-months-container-date-years-last");
          dash = screen.getByTestId("date-picker-months-container-date-years-dash");

          expect(dateMonth).toBeNull();
          expect(dateYear).toBeNull();
          expect(firstYear).toBeVisible();
          expect(lastYear).toBeVisible();
          expect(dash).toBeVisible();
        }
      });
    });
  });
  describe("with defaultMode", () => {
    test("months", async () => {
      render(<DefaultDatePicker defaultMode="months" />);
      const dateMonth = screen.queryByTestId("date-picker-months-container-date-month");
      const dateYear = screen.getByTestId("date-picker-months-container-date-year");
      const operationBtns = screen.getAllByTestId("date-picker-operation-btn");

      await waitFor(() => {
        expect(screen.getByTestId("date-picker-months-container")).toBeVisible();
      });

      expect(dateMonth).toBeNull();
      expect(dateYear).toHaveTextContent(TEST_DEFAULT_DATE.year().toString());
      operationBtns.forEach(btn => {
        expect(btn).toBeDisabled();
      });
    });
    test("years", async () => {
      render(<DefaultDatePicker defaultMode="years" />);
      const dateMonth = screen.queryByTestId("date-picker-months-container-date-month");
      const dateYear = screen.queryByTestId("date-picker-months-container-date-year");
      const firstYear = screen.getByTestId("date-picker-months-container-date-years-first");
      const lastYear = screen.getByTestId("date-picker-months-container-date-years-last");
      const dash = screen.getByTestId("date-picker-months-container-date-years-dash");

      await waitFor(() => {
        expect(screen.getByTestId("date-picker-months-container")).toBeVisible();
      });

      expect(dateMonth).toBeNull();
      expect(dateYear).toBeNull();

      const decade = getDecade(TEST_DEFAULT_DATE);
      expect(firstYear).toHaveTextContent(decade.toString());
      expect(lastYear).toHaveTextContent((decade + 9).toString());
      expect(dash).toHaveTextContent("–");
    });
  });
});
