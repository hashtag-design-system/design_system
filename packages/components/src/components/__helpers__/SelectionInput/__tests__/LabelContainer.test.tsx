import { render, screen } from "@testing-library/react";
import { LabelContainer } from "../LabelContainer";

describe("SelectionInput <LabelContainer />", () => {
  test("default behaviour", () => {
    render(<LabelContainer />);

    expect(screen.queryByTestId("selection-input-label")).toBeNull();
  });
  describe("with label", () => {
    test("with id Prop", () => {
      const testId = "test_id";
      render(<LabelContainer label="Label" id={testId} />);
      const label = screen.getByTestId("selection-input-label");

      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent("Label");
      expect(label).toHaveAttribute("for", testId);
      expect(label.getAttribute("for")).toHaveLength(testId.length);
    });
    test('typeof label==="string"', () => {
      render(<LabelContainer label="Label" />);
      const label = screen.getByTestId("selection-input-label");

      expect(label).toBeVisible();
      expect(label).toHaveTextContent("Label");
    });
    test('typeof label==="object"', () => {
      render(
        <LabelContainer label={{ value: "Label" }}>
          <input data-testid="label-container-children" />
        </LabelContainer>
      );
      const label = screen.getByTestId("selection-input-label");

      expect(label).toBeVisible();
      expect(label).toHaveTextContent("Label");

      expect(screen.getByTestId("label-container-children")).toBeVisible();
    });
  });
});
