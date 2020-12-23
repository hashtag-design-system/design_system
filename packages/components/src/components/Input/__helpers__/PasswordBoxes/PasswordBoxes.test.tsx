import { render, screen } from "@testing-library/react";
import { passwordBoxesClassNameContains } from "./boxClassName";
import { PasswordBoxes, PasswordBoxesProps } from "./PasswordBoxes";

export const TEST_STRENGTH_BOXES: PasswordBoxesProps["strengthBoxes"] = ["lg", "md", "md"];

describe("Input <PasswordBoxes />", () => {
  test("default behaviour", () => {
    render(<PasswordBoxes strengthBoxes={TEST_STRENGTH_BOXES} />);

    const elements = screen.getAllByTestId("password-box");
    expect(elements).toHaveLength(TEST_STRENGTH_BOXES.length);
    passwordBoxesClassNameContains(elements);
  });
});
