import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import dayjs from "dayjs";
import DatePicker from "../../index";
import { DefaultDatePicker } from "../index";

describe("DatePicker <OperationButton />", () => {
  test("default behaviour", async () => {
    render(<DefaultDatePicker />);
    const btns = screen.getAllByTestId("date-picker-operation-btn");

    expect(btns).toHaveLength(2);

    await waitFor(() => {
      expect(screen.getByTestId("select-modal")).toBeVisible();
    });

    btns.forEach((btn, i) => {
      expect(btn).toBeVisible();
      expect(btn).toHaveAttribute("class");
      expect(btn.onclick).toBeDefined();
      expect(btn.children).toHaveLength(1);
      expect(btn).toContainElement(screen.getAllByTestId("icon")[i]);
    });
  });
  test('with defaultMode="months" => disabled', async () => {
    render(<DefaultDatePicker defaultMode="months" />);
    const btns = screen.getAllByTestId("date-picker-operation-btn");

    await waitFor(() => {
      expect(screen.getByTestId("select-modal")).toBeVisible();
    });

    btns.forEach((btn, i) => {
      expect(btn).toBeDisabled();
      expect(btn).toHaveClass("disabled");
    });
  })
  test.each([0, 1])('onClick, on "subtract" and "add" btn', async i => {
    render(<DefaultDatePicker />);
    const subtractBtn = screen.getAllByTestId("date-picker-operation-btn")[i];
    const monthsContainer = screen.getByTestId("date-picker-months-container");
    const month = screen.getByTestId("date-picker-months-container-date-month");
    const year = screen.getByTestId("date-picker-months-container-date-year");

    await waitFor(() => {
      expect(monthsContainer).toBeVisible();
    });

    userEvent.click(subtractBtn);

    if (i === 0) {
      expect(month).toHaveTextContent("December");
      expect(year).toHaveTextContent("2020");
    } else {
      expect(month).toHaveTextContent("February");
      expect(year).toHaveTextContent("2021");
    }
  });
});
