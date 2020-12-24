import { render, screen } from "@testing-library/react";
import { Base } from "../Base";

describe("SelectionInput <Base />", () => {
  test("default behaviour", () => {
    render(<Base />);
    const selectionInput = screen.getByTestId("selection-input-base");

    expect(selectionInput).toBeInTheDocument();
    expect(selectionInput).toHaveAttribute("value", "false");
    expect(selectionInput.getAttribute("aria-labelledby")).toHaveLength(5);
  });
  test("defaultChecked={true}", () => {
    render(<Base defaultChecked />);

    expect(screen.getByTestId("selection-input-base").getAttribute("value")).toBeTruthy();
  });
  test("with groupName", () => {
    render(<Base groupName="test_group" />);

    expect(screen.getByTestId("selection-input-base")).toHaveAttribute("name", "test_group");
  });
  test("with type", () => {
    const { rerender } = render(<Base type="checkbox" />);
    const selectionInput = screen.getByTestId("selection-input-base");

    expect(selectionInput).toHaveAttribute("type", "checkbox");

    rerender(<Base type="radio" />);

    expect(selectionInput).toHaveAttribute("type", "radio");
  });
  test('state="disabled|unchecked" && state="disabled|checked"', () => {
    const { rerender } = render(<Base state="disabled|unchecked" />);
    const selectionInput = screen.getByTestId("selection-input-base");

    expect(selectionInput).toBeDisabled();
    expect(selectionInput.getAttribute("value")).toBe("false");

    rerender(<Base state="disabled|checked" />);

    expect(selectionInput).toBeDisabled();
    expect(selectionInput.getAttribute("value")).toBeTruthy();
  });
  describe("input container", () => {
    test("with width Prop", () => {
      const { rerender } = render(<Base width={56} />);
      const selectionInputContainer = screen.getByTestId("selection-input__container");

      expect(selectionInputContainer.style.width).toBe("56px");

      rerender(<Base style={{ width: 56 }} />);

      expect(selectionInputContainer.style.width).toBe("56px");
    });
    test('typeof label === "string"', () => {
      render(<Base label="Label" />);
      const selectionInputContainer = screen.getByTestId("selection-input__container");

      expect(selectionInputContainer.style.flexDirection).toBe("");
      expect(selectionInputContainer.style.gap).toBe("");
    });
    test('typeof label === "object"', () => {
      const { rerender } = render(<Base label={{ value: "Label" }} />);
      const selectionInputContainer = screen.getByTestId("selection-input__container");

      expect(selectionInputContainer.style.flexDirection).toBe("");
      expect(selectionInputContainer.style.gap).toBe("");

      rerender(<Base label={{ value: "Label", gap: 6 }} />);
      expect(selectionInputContainer.style.gap).toBe("6px");

      rerender(<Base label={{ value: "Label", position: "top" }} />);
      expect(selectionInputContainer.style.flexDirection).toBe("column");

      rerender(<Base label={{ value: "Label", position: "right" }} />);
      expect(selectionInputContainer.style.flexDirection).toBe("");
    });
  });
});