import { render, screen } from "@testing-library/react";
import userEvent, { specialChars } from "@testing-library/user-event";
import Input from "../index";
import { OpenEye } from "../__icons__";

describe("<Input.DigitSequence />", () => {
  test("default behaviour", () => {
    render(<Input.DigitSequence numberOfDigits={4} focusOnRender />);
    const inputs = screen.queryAllByTestId("input-digit");

    expect(inputs).toHaveLength(4);
    expect(document.activeElement).toBe(inputs[0]);
    inputs.forEach(input => {
      expect(input).toHaveValue("");
      expect(input).not.toHaveClass("error");
    });
  });
  test("onChange basic functionality", () => {
    const onChange = jest.fn((val: string) => val);
    render(<Input.DigitSequence onChange={val => onChange(val)} numberOfDigits={4} />);
    const inputs = screen.queryAllByTestId("input-digit");

    inputs.forEach((input, i) => {
      if (i + 1 !== inputs.length) {
        userEvent.type(input, "A");
        expect(input).toHaveValue("A");
      }
    });

    const times = inputs.length - 1;
    const mockResults = onChange.mock.results;

    // Check onChange.mock.results
    expect(onChange).toHaveBeenCalledTimes(times + 1);
    expect(mockResults[mockResults.length - 1].value).toBe("AAA");
    expect(document.activeElement).toBe(inputs[times]);
    expect(inputs.map(input => input.getAttribute("value")).join("")).toBe("AAA");
  });
  test("with helptext(+ icon)", () => {
    render(<Input.DigitSequence helptext={{ value: "Test", icon: <OpenEye /> }} />);
    const helptext = screen.getByTestId("input-digit-sequence-help-text");

    expect(helptext).toBeVisible();
    expect(helptext).toHaveTextContent("Test");
    expect(helptext).toMatchSnapshot();
    expect(helptext.hasChildNodes()).toBe(true);
    expect(helptext.childNodes).toHaveLength(2);
    // Only <svg /> (icon) is measured as a childElement
    expect(helptext.childElementCount).toBe(1);
    expect(screen.getByTestId("icon")).toBeVisible();
  });
  test("with error={true}", () => {
    render(<Input.DigitSequence error />);

    screen.queryAllByTestId("input-digit").forEach(input => expect(input).toHaveClass("error"));
  });
  test("with error={true} & helptext", () => {
    render(<Input.DigitSequence error helptext={{ value: "Test", error: true }} />);

    screen.queryAllByTestId("input-digit").forEach(input => expect(input).toHaveClass("error"));
    expect(screen.getByTestId("input-digit-sequence-help-text")).toHaveClass("error");
  });
  test("paste value from clipboard", () => {
    render(<Input.DigitSequence numberOfDigits={4} />);
    const inputs = screen.queryAllByTestId("input-digit");

    userEvent.type(inputs[0], "0");
    userEvent.paste(inputs[1], "tes");

    expect(inputs.map(input => input.getAttribute("value")).join("")).toBe("0tes");
  });
  test("backspace to move to previous input, if currentTarget.value.length < 1", () => {
    const onChange = jest.fn(val => val);
    render(<Input.DigitSequence numberOfDigits={4} onChange={val => onChange(val)} />);
    const inputs = screen.queryAllByTestId("input-digit");

    userEvent.type(inputs[0], "0");
    userEvent.paste(inputs[1], "tes");

    expect(inputs.map(input => input.getAttribute("value")).join("")).toBe("0tes");

    userEvent.type(inputs[3], specialChars.backspace);
    userEvent.type(inputs[3], specialChars.backspace);

    expect(inputs[3]).toHaveValue("");
    expect(inputs[2]).toHaveValue("");
    expect(inputs.map(input => input.getAttribute("value")).join("")).toBe("0t");
  });
});
