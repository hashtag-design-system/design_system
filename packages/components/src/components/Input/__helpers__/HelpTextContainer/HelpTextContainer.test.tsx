import { screen } from "@testing-library/react";
import { InputHelpTextType } from "../../Input";
import { PasswordBoxes } from "../index";
import { inputCustomRender } from "../utils";
import { HelpTextContainer } from "./HelpTextContainer";

export const TEST_HELP_TEXT: InputHelpTextType = { value: "Help text" };

describe("Input <HelpTextContainer />", () => {
  test("default behaviour", () => {
    inputCustomRender(<HelpTextContainer helptext={TEST_HELP_TEXT} />);
    const element = screen.getByTestId("help-text-container");

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent("Help text");
  });
  test("with children", () => {
    inputCustomRender(
      <HelpTextContainer>
        <PasswordBoxes strengthBoxes={["md", "md", "md"]} />
      </HelpTextContainer>
    );
    const element = screen.getByTestId("help-text-container");

    expect(element).toBeInTheDocument();
    expect(element.children).toHaveLength(3);
  });
  test('state="error"', () => {
    inputCustomRender(<HelpTextContainer helptext={TEST_HELP_TEXT} />, { providerProps: { state: "error" } });
    const element = screen.getByTestId("help-text-container");

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("error");
  });
  test("second=true", () => {
    inputCustomRender(<HelpTextContainer helptext={TEST_HELP_TEXT} second />);
    const element = screen.getByTestId("help-text-container");
    
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("second");
  });
});
