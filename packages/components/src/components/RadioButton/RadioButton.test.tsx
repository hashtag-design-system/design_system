import { render, screen, waitFor } from "@testing-library/react";
import userEvent, { specialChars } from "@testing-library/user-event";
import RadioButton from "./index";

describe("<RadioButton />", () => {
  test("default behaviour", () => {
    render(<RadioButton />);
    const radioBtn = screen.getByTestId("radio-btn");
    const selectionInput = screen.getByTestId("selection-input-base");

    expect(radioBtn).toBeVisible();
    expect(selectionInput).toBeInTheDocument();
    expect(selectionInput).toHaveAttribute("type", "radio");
    expect(selectionInput).toHaveAttribute("value", "false");
    expect(radioBtn).toHaveAttribute("aria-checked", "false");
    expect(radioBtn).toHaveAttribute("tabindex", "0");
    expect(radioBtn.getAttribute("for")).toHaveLength(5);
    expect(radioBtn.getAttribute("ischecked")).toBeFalsy();
    expect(radioBtn.onclick).toBeDefined();
  });
  test("onClick functionality", () => {
    render(<RadioButton />);
    const radioBtn = screen.getByTestId("radio-btn");
    const selectionInput = screen.getByTestId("selection-input-base");

    userEvent.click(radioBtn);

    expect(radioBtn).toHaveAttribute("aria-checked", "true");
    expect(selectionInput.getAttribute("value")).toBeTruthy();

    userEvent.click(radioBtn);

    expect(radioBtn).toHaveAttribute("aria-checked", "false");
    expect(selectionInput.getAttribute("value")).toBe("false");

    userEvent.click(radioBtn);

    expect(radioBtn).toHaveAttribute("aria-checked", "true");
    expect(selectionInput.getAttribute("value")).toBeTruthy();
  });
  test("double click functionality", () => {
    render(<RadioButton />);
    const radioBtn = screen.getByTestId("radio-btn");

    userEvent.dblClick(radioBtn);

    expect(radioBtn).toHaveAttribute("aria-checked", "false");
  });
  test("hit spacebar", () => {
    render(<RadioButton />);
    const radioBtn = screen.getByTestId("radio-btn");

    userEvent.type(radioBtn, specialChars.space);

    expect(radioBtn).toHaveAttribute("aria-checked", "true");
  });
  test("defaultChecked={true}", () => {
    render(<RadioButton defaultChecked />);

    expect(screen.getByTestId("radio-btn")).toHaveAttribute("aria-checked", "true");
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

    expect(radioBtn).toHaveClass("disabled");

    rerender(<RadioButton state="disabled|unchecked" />);
    expect(radioBtn).toHaveClass("disabled");

    rerender(<RadioButton aria-disabled="true" />);
    expect(radioBtn).toHaveClass("disabled");

    rerender(<RadioButton disabled />);
    expect(radioBtn).toHaveClass("disabled");
    expect(radioBtn).toHaveAttribute("tabindex", "-1");
  });
  test("disabled state, with isChecked={false}", () => {
    render(<RadioButton state="disabled|unchecked" />);

    expect(screen.getByTestId("radio-btn")).toHaveAttribute("aria-checked", "false");
  });
  test("disabled state, with isChecked={true}", () => {
    render(<RadioButton state="disabled|checked" />);

    expect(screen.getByTestId("radio-btn")).toHaveAttribute("aria-checked", "true");
  });
});
