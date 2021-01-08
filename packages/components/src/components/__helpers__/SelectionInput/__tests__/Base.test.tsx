import { render, screen } from "@testing-library/react";
import { Base } from "../Base";

describe("SelectionInput <Base />", () => {
  test("default behaviour", () => {
    render(<Base />);
    const inputContainer = screen.getByTestId("selection-input__container");

    expect(inputContainer).toBeInTheDocument();
    expect(inputContainer.children).toHaveLength(0);
  });
  describe("input container", () => {
    test("with width Prop", () => {
      render(<Base style={{ width: 56 }} />);

      expect(screen.getByTestId("selection-input__container").style.width).toBe("56px");
    });
    test('typeof label === "string"', () => {
      render(<Base label="Label" />);
      const selectionInputContainer = screen.getByTestId("selection-input__container");

      expect(selectionInputContainer.children).toHaveLength(1);
      expect(selectionInputContainer.style.flexDirection).toBe("");
      expect(selectionInputContainer.style.gap).toBe("");
    });
    test('typeof label === "object"', () => {
      const { rerender } = render(<Base label={{ value: "Label" }} />);
      const selectionInputContainer = screen.getByTestId("selection-input__container");

      expect(selectionInputContainer.children).toHaveLength(1);
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
