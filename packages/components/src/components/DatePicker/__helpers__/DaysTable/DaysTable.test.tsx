import { render, screen, waitFor } from "@testing-library/react";
import { DAY_NAMES_ARR } from "@the_hashtag/common";
import { DefaultDatePicker } from "../index";

describe("DatePicker <DaysTable />", () => {
  test("default behaviour", async () => {
    render(<DefaultDatePicker />);
    const daysContainer = screen.getByTestId("date-picker-days-container");
    const thead = screen.getByTestId("date-picker-thead");
    const ths = screen.getAllByTestId("date-picker-thead-th");

    await waitFor(() => {
      expect(daysContainer).toBeVisible();
    });

    expect(daysContainer).toHaveAttribute("class");
    expect(daysContainer.children).toHaveLength(2);
    expect(daysContainer).toContainElement(thead);
    expect(daysContainer).toContainElement(screen.getByTestId("date-picker-tbody"));

    const thsLength = DAY_NAMES_ARR.length;
    expect(thead).toBeVisible();
    expect(thead).toHaveAttribute("class");
    expect(thead.children).toHaveLength(thsLength);

    expect(ths).toHaveLength(thsLength);
    ths.forEach((th, i) => {
      expect(thead).toContainElement(th);
      expect(th).toHaveAttribute("class");
      expect(th.children).toHaveLength(0);
      expect(th).toHaveTextContent(DAY_NAMES_ARR[i].short_abbreviation);
      expect(th.textContent).toHaveLength(2);
    });
  });
});
