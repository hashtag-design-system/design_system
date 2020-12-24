import { render, screen } from "@testing-library/react";
import userEvent, { specialChars } from "@testing-library/user-event";
import Checkbox from "./index";

describe("<Checkbox />", () => {
  test("default behaviour", () => {
    render(<Checkbox />);
    const checkbox = screen.getByTestId("checkbox");
    const selectionInput = screen.getByTestId("selection-input-base");

    expect(checkbox).toBeVisible();
    expect(selectionInput).toBeInTheDocument();
    expect(selectionInput).toHaveAttribute("type", "checkbox");
    expect(selectionInput).toHaveAttribute("value", "false");
    expect(checkbox).toHaveAttribute("aria-checked", "false");
    expect(checkbox).toHaveAttribute("tabindex", "0");
    expect(checkbox.getAttribute("for")).toHaveLength(5);
    expect(checkbox.getAttribute("ischecked")).toBeFalsy();
    expect(checkbox.onclick).toBeDefined();
    expect(checkbox.children).toHaveLength(1);
    expect(screen.getByTestId("animated-checkmark")).toBeVisible();
  });
  test("onClick functionality", async () => {
    render(<Checkbox />);
    const checkbox = screen.getByTestId("checkbox");
    const selectionInput = screen.getByTestId("selection-input-base");

    userEvent.click(checkbox);

    expect(checkbox).toHaveAttribute("aria-checked", "true");
    expect(selectionInput.getAttribute("value")).toBeTruthy();

    userEvent.click(checkbox);

    expect(checkbox).toHaveAttribute("aria-checked", "false");
    expect(selectionInput.getAttribute("value")).toBe("false");

    userEvent.click(checkbox);

    expect(checkbox).toHaveAttribute("aria-checked", "true");
    expect(selectionInput.getAttribute("value")).toBeTruthy();
  });
  test("double click functionality", () => {
    render(<Checkbox />);
    const checkbox = screen.getByTestId("checkbox");

    userEvent.dblClick(checkbox);

    expect(checkbox).toHaveAttribute("aria-checked", "false");
  });
  test("hit spacebar", () => {
    render(<Checkbox />);
    const checkbox = screen.getByTestId("checkbox");

    userEvent.type(checkbox, specialChars.space);

    expect(checkbox).toHaveAttribute("aria-checked", "true");
  });
  test("defaultChecked={true}", () => {
    render(<Checkbox defaultChecked />);

    expect(screen.getByTestId("checkbox")).toHaveAttribute("aria-checked", "true");
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
    const checkbox = screen.getByTestId("checkbox");

    expect(checkbox.children).toHaveLength(1);
    expect(checkbox).toHaveAttribute("aria-checked", "mixed");
  });
  test("disabled state", () => {
    const { rerender } = render(<Checkbox state="disabled|checked" />);
    const checkbox = screen.getByTestId("checkbox");

    expect(checkbox).toHaveClass("disabled");

    rerender(<Checkbox state="disabled|unchecked" />);
    expect(checkbox).toHaveClass("disabled");

    rerender(<Checkbox aria-disabled="true" />);
    expect(checkbox).toHaveClass("disabled");

    rerender(<Checkbox disabled />);
    expect(checkbox).toHaveClass("disabled");
    expect(checkbox).toHaveAttribute("tabindex", "-1");
  });
});
