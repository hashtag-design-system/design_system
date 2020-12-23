import { render, screen } from "@testing-library/react";
import userEvent, { specialChars } from "@testing-library/user-event";
import Input from "../index";
import { InputStates } from "../Input";

const TEST_DEFAULT_VALUE = "Hey!\nHow are you?";

describe("<Input.Multiline />", () => {
  test("default behaviour", () => {
    render(<Input.Multiline />);
    const textarea = screen.getByTestId("input-multiline");

    expect(textarea).toBeInTheDocument();
    expect(textarea.getAttribute("value")).toBeNull();
    expect(textarea).not.toHaveAttribute("placeholder");
    expect(textarea.getAttribute("id")).toHaveLength(5);
    expect(textarea.getAttribute("data-hasfloatingplaceholder")).toBeTruthy();
    expect(textarea.getAttribute("cols")).toBe("28");
    expect(textarea.getAttribute("rows")).toBe("5");
  });
  test("onChange <Base /> input", () => {
    const onChange = jest.fn(e => e.target.value);
    render(<Input.Multiline onChange={e => onChange(e)} />);
    const textarea = screen.getByTestId("input-multiline");

    userEvent.type(textarea, TEST_DEFAULT_VALUE.replace("\n", specialChars.enter));

    const onChangeResults = onChange.mock.results;

    const resultsArrLength = onChangeResults.length;
    expect(textarea).toHaveValue(TEST_DEFAULT_VALUE);
    expect(onChange).toHaveBeenCalledTimes(TEST_DEFAULT_VALUE.length);
    expect(onChangeResults[resultsArrLength - 1].value).toBe(TEST_DEFAULT_VALUE);
  });
  test("defaultValue Prop", () => {
    render(<Input.Multiline defaultValue={TEST_DEFAULT_VALUE} />);
    const textarea = screen.getByTestId("input-multiline");

    expect(textarea).toHaveValue(TEST_DEFAULT_VALUE);
  });
  test("floatingplaceholder={false}", () => {
    render(<Input.Multiline floatingplaceholder={false} />);
    const textarea = screen.getByTestId("input-multiline");

    expect(textarea.getAttribute("data-hasfloatingplaceholder")).toBe("false");
    expect(textarea).toHaveAttribute("placeholder");
  });
  test.each(InputStates)("state", state => {
    if (state !== "default") {
      render(<Input.Multiline state={state} />);
      expect(screen.getByTestId("input-multiline").className).toContain(state);
    }
  });
  test("onFocus", () => {
    render(<Input.Multiline />);
    const textarea = screen.getByTestId("input-multiline");

    textarea.focus();

    expect(document.activeElement).toBe(textarea);
  });
  // test("overrideOnChange", () => {
  //   const onChange = jest.fn((e: React.ChangeEvent<HTMLTextAreaElement>) => e.preventDefault());
  //   render(<Input.Multiline overrideOnChange onChange={onChange} />);
  //   const textarea = screen.getByTestId("input-multiline");
  //   const newVal = "test@gmail.com";

  //   userEvent.type(textarea, newVal);

  //   expect(textarea).toHaveValue("");
  //   // The value will not change, but the function `onChange` will be called each time
  //   expect(onChange).toHaveBeenCalledTimes(newVal.length);
  // });
  describe("disabled", () => {
    test('state="disabled"', () => {
      render(<Input.Multiline state="disabled" />);
      const textarea = screen.getByTestId("input-multiline");

      expect(textarea).toHaveClass("disabled");
      expect(textarea).toBeDisabled();
      expect(textarea.getAttribute("aria-disabled")).toBeTruthy();
    });
    test('"aria-disabled"=true', () => {
      render(<Input.Multiline aria-disabled={true} />);
      const textarea = screen.getByTestId("input-multiline");

      expect(textarea).toBeDisabled();
      expect(textarea.getAttribute("aria-disabled")).toBeTruthy();
    });
    test("disabled=true", () => {
      render(<Input.Multiline disabled={true} />);
      const textarea = screen.getByTestId("input-multiline");

      expect(textarea).toBeDisabled();
      expect(textarea.getAttribute("aria-disabled")).toBeTruthy();
    });
  });
});
