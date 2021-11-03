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

    expect(element).toBeVisible();
    expect(element).toHaveTextContent("Help text");
    expect(element).toHaveAttribute("class");
    expect(element).not.toHaveClass("error");
    expect(element).not.toHaveClass("transparent");
  });
  test("with children", () => {
    inputCustomRender(
      <HelpTextContainer>
        <PasswordBoxes strengthBoxes={["md", "md", "md"]} />
      </HelpTextContainer>
    );
    const element = screen.getByTestId("help-text-container");

    expect(element).toBeVisible();
    expect(element.children).toHaveLength(3);
  });
  test("with error={true}", () => {
    inputCustomRender(<HelpTextContainer helptext={{ ...TEST_HELP_TEXT, error: true }} />);
    const element = screen.getByTestId("help-text-container");

    expect(element).toBeVisible();
    expect(element).toHaveClass("error");
  });
  test("with transparent={true}", () => {
    inputCustomRender(<HelpTextContainer helptext={{ ...TEST_HELP_TEXT, transparent: true }} />);
    const element = screen.getByTestId("help-text-container");

    expect(element).toBeVisible();
    expect(element).toHaveClass("transparent");
  });
  test("with transparent={true} & error={true}", () => {
    inputCustomRender(<HelpTextContainer helptext={{ ...TEST_HELP_TEXT, error: true, transparent: true }} />);
    const element = screen.getByTestId("help-text-container");

    expect(element).toBeVisible();
    expect(element).toHaveClass("error");
    expect(element).toHaveClass("transparent");
  });
  test("with second={true}", () => {
    inputCustomRender(<HelpTextContainer helptext={TEST_HELP_TEXT} second />);
    const element = screen.getByTestId("help-text-container");

    expect(element).toBeVisible();
    expect(element).toHaveClass("second");
  });
});
