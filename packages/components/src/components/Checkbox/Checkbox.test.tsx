import { render, screen } from "@testing-library/react";
import userEvent, { specialChars } from "@testing-library/user-event";
import Checkbox from "./index";

export const checkSelectionInputValue = (checkbox: HTMLElement, bool: boolean | string, radio = false) => {
  const strBool = String(bool);
  expect(checkbox).toHaveAttribute("value", strBool);
  expect(checkbox).toHaveAttribute("aria-checked", strBool.trim());
  if (!radio) expect(checkbox).toHaveAttribute("data-ischecked", strBool.trim());
};

export const checkSelectionInputDisabled = (checkbox: HTMLElement) => {
  expect(checkbox).toHaveClass("disabled");
  expect(checkbox).toHaveAttribute("aria-disabled", "true");
};

describe("<Checkbox />", () => {
  test("default behaviour", () => {
    render(<Checkbox />);
    const checkbox = screen.getByTestId("checkbox");

    expect(checkbox).toBeVisible();
    expect(checkbox).toHaveAttribute("value", "false");
    expect(checkbox).toHaveAttribute("class");
    expect(checkbox).toHaveAttribute("type", "checkbox");
    expect(checkbox).toHaveAttribute("aria-checked", "false");
    expect(checkbox).toHaveAttribute("data-ischecked", "false");
    expect(checkbox).toHaveAttribute("tabindex", "0");
    expect(checkbox.onchange).toBeDefined();
    expect(checkbox.children).toHaveLength(0);
    expect(screen.getByTestId("animated-checkmark")).toBeVisible();

    const labelContainer = screen.getByTestId("checkbox-label-container");
    expect(labelContainer).toBeVisible();
    expect(labelContainer).toHaveAttribute("class");
    expect(labelContainer.children).toHaveLength(2);
    expect(labelContainer).toContainElement(checkbox);
  });
  test("onClick functionality", async () => {
    render(<Checkbox />);
    const checkbox = screen.getByTestId("checkbox");

    userEvent.click(checkbox);

    checkSelectionInputValue(checkbox, true);

    userEvent.click(checkbox);

    checkSelectionInputValue(checkbox, false);

    userEvent.click(checkbox);

    checkSelectionInputValue(checkbox, true);
  });
  test("double click functionality", () => {
    render(<Checkbox />);
    const checkbox = screen.getByTestId("checkbox");

    userEvent.dblClick(checkbox);

    checkSelectionInputValue(checkbox, false);
  });
  test("hit spacebar", () => {
    render(<Checkbox />);
    const checkbox = screen.getByTestId("checkbox");

    userEvent.type(checkbox, specialChars.space);

    checkSelectionInputValue(checkbox, "true ");
  });
  test("defaultChecked={true}", () => {
    render(<Checkbox defaultChecked />);

    checkSelectionInputValue(screen.getByTestId("checkbox"), true);
  });
  // Check aslo the SelectionInput <LabelContainer /> helper component
  test("with label", () => {
    render(<Checkbox label={{ value: "Label" }} />);
    const selectionInput = screen.getByTestId("selection-input-label");

    expect(selectionInput).toBeVisible();

    expect(selectionInput).toHaveTextContent("Label");
  });
  test('state="indeterminate"', () => {
    render(<Checkbox state="indeterminate" />);

    expect(screen.getByTestId("animated-checkmark-children-prop")).toBeVisible();
    expect(screen.getByTestId("checkbox")).toHaveAttribute("aria-checked", "mixed");
  });
  test("disabled state", () => {
    const { rerender } = render(<Checkbox state="disabled|checked" />);
    const checkbox = screen.getByTestId("checkbox");

    checkSelectionInputDisabled(checkbox);

    rerender(<Checkbox state="disabled|unchecked" />);

    checkSelectionInputDisabled(checkbox);

    rerender(<Checkbox aria-disabled="true" />);

    checkSelectionInputDisabled(checkbox);

    rerender(<Checkbox disabled />);

    checkSelectionInputDisabled(checkbox);
    expect(checkbox).toHaveAttribute("tabindex", "-1");
  });
  test.each(["disabled|unchecked", "disabled|checked"])('state="disabled|unchecked" && state="disabled|checked"', async state => {
    const { rerender } = render(<Checkbox state={state as any} />);
    const checkbox = screen.getByTestId("checkbox");

    checkSelectionInputDisabled(checkbox);
    if (state.includes("un")) expect(checkbox).toHaveAttribute("value", "false");
    else expect(checkbox).toHaveAttribute("value", "true");
  });
});
