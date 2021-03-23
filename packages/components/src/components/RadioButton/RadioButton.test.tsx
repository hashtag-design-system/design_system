import { render, screen } from "@testing-library/react";
import userEvent, { specialChars } from "@testing-library/user-event";
import { checkSelectionInputDisabled, checkSelectionInputValue } from "../Checkbox/Checkbox.test";
import RadioButton from "./index";

describe("<RadioButton />", () => {
  test("default behaviour", () => {
    render(<RadioButton />);
    const radioBtn = screen.getByTestId("radio-btn");

    expect(radioBtn).toBeVisible();
    expect(radioBtn.id).toHaveLength(5);
    expect(radioBtn).toHaveAttribute("type", "radio");
    expect(radioBtn).toHaveAttribute("tabindex", "0");
    expect(radioBtn.onclick).toBeDefined();

    checkSelectionInputValue(radioBtn, false, true);
  });
  test("onClick functionality with onValue", () => {
    const onValue = jest.fn(newVal => newVal);
    render(<RadioButton onValue={onValue} />);
    const radioBtn = screen.getByTestId("radio-btn");

    userEvent.click(radioBtn);

    checkSelectionInputValue(radioBtn, true, true);
    // +1 in useEffect
    expect(onValue).toHaveBeenCalledTimes(2);
    expect(onValue).toHaveLastReturnedWith(true);

    userEvent.click(radioBtn);

    checkSelectionInputValue(radioBtn, false, true);
    expect(onValue).toHaveBeenCalledTimes(3);
    expect(onValue).toHaveLastReturnedWith(false);

    userEvent.click(radioBtn);

    checkSelectionInputValue(radioBtn, true, true);
    expect(onValue).toHaveBeenCalledTimes(4);
    expect(onValue).toHaveLastReturnedWith(true);
  });
  test("double click functionality", () => {
    render(<RadioButton />);
    const radioBtn = screen.getByTestId("radio-btn");

    userEvent.dblClick(radioBtn);

    checkSelectionInputValue(radioBtn, false, true);
  });
  test("hit spacebar", () => {
    render(<RadioButton />);
    const radioBtn = screen.getByTestId("radio-btn");

    userEvent.type(radioBtn, specialChars.space);

    checkSelectionInputValue(radioBtn, "true ", true);
  });
  test("defaultChecked={true}", () => {
    render(<RadioButton defaultChecked />);

    checkSelectionInputValue(screen.getByTestId("radio-btn"), true, true);
  });
  // Check aslo the SelectionInput <LabelContainer /> helper component
  test("with label", () => {
    render(<RadioButton label={{ value: "Label" }} />);
    const selectionInput = screen.getByTestId("selection-input-label");

    expect(selectionInput).toBeVisible();
    expect(selectionInput).toHaveTextContent("Label");
  });
  test("disabled state", async () => {
    const { rerender } = render(<RadioButton state="disabled|checked" />);
    const radioBtn = screen.getByTestId("radio-btn");

    checkSelectionInputDisabled(radioBtn);

    rerender(<RadioButton state="disabled|unchecked" />);

    checkSelectionInputDisabled(radioBtn);

    rerender(<RadioButton aria-disabled="true" />);

    checkSelectionInputDisabled(radioBtn);

    rerender(<RadioButton disabled />);

    checkSelectionInputDisabled(radioBtn);
    expect(radioBtn).toHaveAttribute("tabindex", "-1");
  });
  test("disabled state, with isChecked={false}", () => {
    render(<RadioButton state="disabled|unchecked" />);
    const radioBtn = screen.getByTestId("radio-btn");

    expect(radioBtn).toHaveAttribute("aria-checked", "false");
    checkSelectionInputDisabled(radioBtn);
  });
  test("disabled state, with isChecked={true}", () => {
    render(<RadioButton state="disabled|checked" />);

    expect(screen.getByTestId("radio-btn")).toHaveAttribute("aria-checked", "true");
  });
});
