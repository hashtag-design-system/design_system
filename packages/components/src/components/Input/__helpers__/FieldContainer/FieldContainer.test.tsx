import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ClosedEye } from "../../__icons__/ClosedEye";
import { OpenEye } from "../../__icons__/OpenEye";
import { inputCustomRender } from "../utils";
import { FieldContainer } from "./FieldContainer";

describe("Input <FieldContainer />", () => {
  test("characterLimit & maxLength", async () => {
    const maxLength = 14;
    inputCustomRender(<FieldContainer />, { providerProps: { characterLimit: true, maxLength } });
    const input = screen.getByTestId("input");
    const newVal = "test123@gmail.com";

    expect(input).toBeInTheDocument();

    userEvent.type(input, newVal);
    expect(input).toHaveValue(newVal.substring(0, maxLength));
    expect(input.getAttribute("value")).toHaveLength(maxLength);
  });
  describe("prefix & suffix of string type", () => {
    test("displays prefix", () => {
      inputCustomRender(<FieldContainer />, { providerProps: { prefix: "$" } });

      expect(screen.getByTestId("prefix")).toBeInTheDocument();
    });
    test("displays suffix", () => {
      inputCustomRender(<FieldContainer />, { providerProps: { suffix: "Kg" } });

      expect(screen.getByTestId("suffix")).toBeInTheDocument();
    });
    test("displays both prefix & suffix", () => {
      inputCustomRender(<FieldContainer />, { providerProps: { prefix: "$", suffix: "Kg" } });

      expect(screen.getByTestId("suffix")).toBeInTheDocument();
      expect(screen.getByTestId("prefix")).toBeInTheDocument();
    });
  });
  describe("prefix & suffix of `React.ReactNode` (component - icon) type", () => {
    test("displays prefix component", () => {
      inputCustomRender(<FieldContainer />, { providerProps: { prefix: <OpenEye /> } });
      const prefix = screen.getByTestId("prefix");

      expect(prefix).toBeInTheDocument();
      expect(prefix).toMatchSnapshot();
    });
    test("displays suffix component", () => {
      inputCustomRender(<FieldContainer />, { providerProps: { suffix: <OpenEye /> } });
      const suffix = screen.getByTestId("suffix");

      expect(suffix).toBeInTheDocument();
      expect(suffix).toMatchSnapshot();
    });
    test("displays both prefix & suffix components", () => {
      inputCustomRender(<FieldContainer />, { providerProps: { prefix: <OpenEye />, suffix: <ClosedEye /> } });

      const suffix = screen.getByTestId("suffix");
      const prefix = screen.getByTestId("prefix");

      expect(suffix).toBeInTheDocument();
      expect(suffix).toMatchSnapshot();
      expect(prefix).toBeInTheDocument();
      expect(prefix).toMatchSnapshot();
    });
  });
  describe("<Base /> style", () => {
    test("with prefix", () => {
      inputCustomRender(<FieldContainer />, { providerProps: { prefix: "Kg" } });
      const input = screen.getByTestId("input");
      const paddingLeft = input.style.paddingLeft;

      expect(paddingLeft).toBeDefined();
      expect(typeof paddingLeft).toBe("string");
      expect(paddingLeft).toContain("em");
    });
    test("with suffix", () => {
      inputCustomRender(<FieldContainer />, { providerProps: { suffix: "Kg" } });
      const input = screen.getByTestId("input");
      const paddingRight = input.style.paddingRight;

      expect(paddingRight).toBeDefined();
      expect(typeof paddingRight).toBe("string");
      expect(paddingRight).toContain("em");
    });
  });
  // test("with characterLimit", async () => {
  //     const maxLength = 14;
  //     inputCustomRender(<FieldContainer />, { providerProps: { characterLimit: true, maxLength } });
  //     const input = screen.getByTestId("input");
  //     const newVal = "test123@gmail.com";
  //     const characterLimit = screen.getByTestId("character-limit");

  //     expect(screen.getByTestId("second-help-text-container")).toBeInTheDocument();
  //     expect(input).toBeInTheDocument();
  //     expect(characterLimit).toBeInTheDocument();

  //     await waitFor(() => {
  //       userEvent.type(input, newVal);
  //     });
  //     expect(input).toHaveValue(newVal.substring(0, maxLength));
  //     expect(input.getAttribute("value")).toHaveLength(maxLength);
  //     expect(characterLimit).toHaveTextContent(`${maxLength} / ${maxLength}`);
  //     expect(characterLimit).toHaveClass("medium");
  //   });
});
