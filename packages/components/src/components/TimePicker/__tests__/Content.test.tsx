import { render, screen } from "@testing-library/react";
import TimePicker from "../index";

describe("<TimePicker.Content />", () => {
  test("default behaviour", () => {
    render(<TimePicker.Content />);
    const contentContainer = screen.getByTestId("time-picker-content-container");
    const labelsContainer = screen.getByTestId("time-picker-labels-container");
    const labels = screen.getAllByTestId("time-picker-label");
    const timePickerContainer = screen.getByTestId("time-picker-container");
    const activeBox = screen.getByTestId("time-picker-active-box");
    const dotsContainer = screen.getAllByTestId("time-picker-dots-container");

    expect(contentContainer).toBeVisible();
    expect(contentContainer).toHaveAttribute("class");
    expect(contentContainer.children).toHaveLength(2);
    expect(contentContainer).toContainElement(labelsContainer);
    expect(contentContainer).toContainElement(timePickerContainer);

    expect(labelsContainer).toHaveAttribute("class");
    expect(labelsContainer.children).toHaveLength(3);
    expect(labels).toHaveLength(3);
    labels.forEach((label, i) => {
      expect(labelsContainer).toContainElement(label);
      switch (i) {
        case 0:
          expect(label).toHaveTextContent("Hours");
          break;
        case 1:
          expect(label).toHaveTextContent("Minutes");
          break;
        case 2:
          expect(label).toHaveTextContent("Seconds");

        default:
          break;
      }
    });

    expect(timePickerContainer).toBeVisible();
    expect(timePickerContainer).toHaveAttribute("class");
    expect(timePickerContainer).toContainElement(activeBox);
    expect(timePickerContainer.children).toHaveLength(1);

    expect(activeBox).toBeVisible();
    expect(activeBox).toHaveAttribute("class");
    expect(activeBox.children).toHaveLength(2);
    expect(dotsContainer).toHaveLength(2);
    dotsContainer.forEach(dotContainer => {
      expect(activeBox).toContainElement(dotContainer);
    });
  });
  test("with children", () => {
    render(
      <TimePicker.Content>
        <TimePicker.Minutes />
      </TimePicker.Content>
    );
    const timePickerContainer = screen.getByTestId("time-picker-container");
    const timePicker = screen.getByTestId("time-picker");

    expect(timePickerContainer.children).toHaveLength(2);
    expect(timePickerContainer).toContainElement(timePicker);
  });
  test.each([
    { hasHours: true, hasMinutes: false, hasSeconds: false },
    { hasHours: false, hasMinutes: true, hasSeconds: false },
    { hasHours: false, hasMinutes: false, hasSeconds: true },
    { hasHours: true, hasMinutes: true, hasSeconds: false },
    { hasHours: false, hasMinutes: true, hasSeconds: true },
    { hasHours: true, hasMinutes: false, hasSeconds: true },
  ])("with showLabels", showLabels => {
    render(<TimePicker.Content showLabels={showLabels} />);
    const labelsContainer = screen.getByTestId("time-picker-labels-container");
    const labels = screen.getAllByTestId("time-picker-label");
    const activeBox = screen.getByTestId("time-picker-active-box");
    const dotsContainer = screen.queryAllByTestId("time-picker-dots-container");

    const shown = Object.entries(showLabels).filter(label => label[1] === true);
    const shownLength = shown.length;
    expect(labelsContainer).toHaveAttribute("class");
    expect(labelsContainer.children).toHaveLength(shownLength);
    expect(labels).toHaveLength(shownLength);
    const dotsLength = shownLength - 1;
    if (dotsLength > 0) {
      expect(dotsContainer).toHaveLength(dotsLength);
      expect(activeBox.children).toHaveLength(dotsLength);
    } else {
      expect(dotsContainer).toHaveLength(0);
      expect(activeBox.children).toHaveLength(0);
    }
    labels.forEach((label, i) => {
      expect(labelsContainer).toContainElement(label);
      expect(label).toHaveTextContent(shown[i][0].replace("has", ""));
    });
  });
});
