import { screen } from "@testing-library/react";
import { TEST_HELP_TEXT } from "../HelpTextContainer/HelpTextContainer.test";
import { PasswordBoxes } from "../index";
import { inputCustomRender } from "../utils";
import { InputContainer } from "./InputContainer";

describe("Input <InputContainer />", () => {
  describe("help text & label container", () => {
    test("with optional", () => {
      inputCustomRender(<InputContainer />, { providerProps: { optional: true } });

      expect(screen.getAllByTestId("help-text-container")[0]).toHaveTextContent("Optional");
    });

    test("with label", () => {
      inputCustomRender(<InputContainer />, { providerProps: { label: "Label" } });
      const label = screen.getByTestId("input-label");
      const labelContainer = screen.getByTestId("input-label-container");

      expect(labelContainer).toBeInTheDocument();

      expect(labelContainer.style.justifyContent).toBe("space-between");
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent("Label");
      expect(label.getAttribute("for")).toHaveLength(5);
    });
    test("with helptext", () => {
      inputCustomRender(<InputContainer />, { providerProps: { helptext: TEST_HELP_TEXT } });
      const helptext = screen.getByTestId("help-text-container");

      expect(screen.getByTestId("input-label-container")).toBeInTheDocument();
      expect(helptext).toBeInTheDocument();
      expect(helptext).toHaveTextContent(TEST_HELP_TEXT.value);
    });
    test("with passwordboxes", () => {
      inputCustomRender(<InputContainer />, {
        providerProps: { passwordboxes: <PasswordBoxes strengthBoxes={["md", "md", "md"]} /> },
      });
      const helptext = screen.getByTestId("help-text-container");

      expect(screen.getByTestId("input-label-container")).toBeInTheDocument();
      expect(helptext).toBeInTheDocument();
      expect(helptext.children).toHaveLength(3);
    });
  });
  describe("second help text & character limit container", () => {
    test("with helptext", () => {
      inputCustomRender(<InputContainer />, { providerProps: { secondhelptext: TEST_HELP_TEXT } });
      const helptext = screen.getByTestId("help-text-container");
      const secondhelptextContainer = screen.getByTestId("second-help-text-container");

      expect(secondhelptextContainer).toBeInTheDocument();
      expect(secondhelptextContainer.style.justifyContent).toBe("space-between");
      expect(helptext).toBeInTheDocument();
      expect(helptext).toHaveTextContent(TEST_HELP_TEXT.value);
    });
    test("with characterLimit & maxLength", async () => {
      const maxLength = 14;
      inputCustomRender(<InputContainer />, { providerProps: { characterLimit: true, maxLength } });
      const characterLimit = screen.getByTestId("character-limit");

      expect(characterLimit).toBeInTheDocument();

      expect(characterLimit).toHaveTextContent(`0 / ${maxLength}`);
      expect(screen.getByTestId("second-help-text-container").style.justifyContent).toBe("flex-end");
    });
  });
});
