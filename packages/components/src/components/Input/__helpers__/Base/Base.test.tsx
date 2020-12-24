import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { InputStates } from "../../Input";
import { inputCustomRender } from "../utils";
import { Base } from "./Base";

// afterEach(cleanup);
// https://kentcdodds.com/blog/common-mistakes-with-react-testing-library

describe("Input <Base />", () => {
  test("default render", () => {
    inputCustomRender(<Base />);
    const input = screen.getByTestId("input");

    expect(input).toHaveAttribute("id");
    expect(input.id).toHaveLength(5);
    expect(input).toHaveAttribute("class");
    expect(input).toHaveValue("");
    expect(input).toHaveClass("input");
    expect(input).not.toBeDisabled();
    // expect(input).toMatchSnapshot({id: expect.any(String)})
    expect(input).not.toHaveAttribute("placeholder");
    expect(input).not.toHaveAttribute("forwardref");
    expect(input.getAttribute("data-hasfloatingplaceholder")).toBeTruthy();
    expect(input.getAttribute("aria-label")).toBe("Placeholder");
  });
  test("have placeholder, with floatingplaceholder=true", () => {
    inputCustomRender(<Base />, { providerProps: { floatingplaceholder: false } });
    const input = screen.getByTestId("input");

    expect(input.getAttribute("placeholder")).toBe("Placeholder");
    expect(input.getAttribute("data-hasfloatingplaceholder")).toBe("false");
  });
  test.each(InputStates)("state", state => {
    if (state !== "default") {
      inputCustomRender(<Base />, { providerProps: { state } });
      expect(screen.getByTestId("input").className).toContain(state);
    }
  });
  test("defaultValue Prop", () => {
    inputCustomRender(<Base />, { providerProps: { defaultValue: "test" } });
    const input = screen.getByTestId("input");

    expect(input).toHaveValue("test");
  });
  test("floatingplaceholder={false}", () => {
    inputCustomRender(<Base />, { providerProps: { floatingplaceholder: false } });
    const input = screen.getByTestId("input");

    expect(input.getAttribute("data-hasfloatingplaceholder")).toBe("false");
    expect(input).toHaveAttribute("placeholder");
  });
  test("onFocus", () => {
    inputCustomRender(<Base />);
    const input = screen.getByTestId("input");

    input.focus();
    expect(document.activeElement).toBe(input);

    expect(input).toHaveFocus();
  });
  test("onChange <Base /> input", () => {
    const onChange = jest.fn(e => e.target.value);
    inputCustomRender(<Base />, { providerProps: { onChange } });
    const input = screen.getByTestId("input");
    const newVal = "test@gmail.com";

    userEvent.type(input, newVal);

    const onChangeResults = onChange.mock.results;

    const resultsArrLength = onChangeResults.length;
    expect(input).toHaveValue(newVal);
    expect(onChange).toHaveBeenCalledTimes(newVal.length);
    expect(onChangeResults[resultsArrLength - 1].value).toBe(newVal);
  });
  test("value length > maxLength", () => {
    inputCustomRender(<Base />, { providerProps: { maxLength: 1 } });
    const input = screen.getByTestId("input");

    userEvent.type(input, "Ab");

    expect(input).toHaveValue("A");
  });
});
