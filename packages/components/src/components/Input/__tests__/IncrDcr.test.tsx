import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent, { specialChars } from "@testing-library/user-event";
import React from "react";
import Input from "../index";

describe("<Input.IncrDcr />", () => {
  test("default behaviour", () => {
    render(<Input.IncrDcr />);
    const input = screen.getByTestId("input-incr-dcr");
    const decreaseBtn = screen.getByTestId("input-incr-dcr-decrease");
    const increaseBtn = screen.getByTestId("input-incr-dcr-increase");

    expect(input).toBeInTheDocument();
    expect(input).not.toHaveAttribute("placeholder");
    expect(input.getAttribute("value")).toBe("1");
    expect(input.getAttribute("type")).toBe("number");
    expect(input.getAttribute("data-hasfloatingplaceholder")).toBe("false");
    expect(input.getAttribute("min")).toBe("1");
    expect(input.getAttribute("max")).toBe("9999");
    expect(input.getAttribute("step")).toBe("1");
    expect(input.getAttribute("aria-valuemin")).toBe("1");
    expect(input.getAttribute("aria-valuemax")).toBe("9999");
    expect(input.getAttribute("aria-valuenow")).toBe("1");
    expect(input.getAttribute("width")).toBeDefined();
    expect(decreaseBtn).toBeInTheDocument();
    expect(decreaseBtn).toBeDisabled();
    expect(increaseBtn).toBeInTheDocument();
    expect(increaseBtn).not.toBeDisabled();
  });
  test("onFocus", async () => {
    render(<Input.IncrDcr />);
    const input = screen.getByTestId("input-incr-dcr");

    fireEvent.focus(input);

    expect(input.getAttribute("value")).toBe("");
    expect(input.getAttribute("aria-valuenow")).toBe("");
  });
  // * Default state changes (eg. className) happen in the <Input.Base /> component tests
  test('state="active"', async () => {
    render(<Input.IncrDcr state="active" />);

    expect(screen.getByTestId("input-incr-dcr-decrease")).not.toBeDisabled();
    expect(screen.getByTestId("input-incr-dcr-increase")).not.toBeDisabled();
  });
  test('state="active|decrease"', async () => {
    render(<Input.IncrDcr state="active|decrease" />);

    expect(screen.getByTestId("input-incr-dcr-decrease")).not.toBeDisabled();
    expect(screen.getByTestId("input-incr-dcr-increase")).toBeDisabled();
  });
  test('state="active|increase"', async () => {
    render(<Input.IncrDcr state="active|increase" />);

    expect(screen.getByTestId("input-incr-dcr-decrease")).toBeDisabled();
    expect(screen.getByTestId("input-incr-dcr-increase")).not.toBeDisabled();
  });
  test('state="hover|decrease"', async () => {
    render(<Input.IncrDcr state="hover|decrease" />);
    const decreaseBtn = screen.getByTestId("input-incr-dcr-decrease");
    expect(decreaseBtn).toHaveClass("hover");
  });
  test('state="hover|decrease", with max={9999} & defaultValue={9999}', async () => {
    render(<Input.IncrDcr state="hover|decrease" max={9999} defaultValue={9999} />);
    const decreaseBtn = screen.getByTestId("input-incr-dcr-decrease");
    expect(decreaseBtn).toHaveClass("hover");
  });
  test('state="hover|increase"', async () => {
    render(<Input.IncrDcr state="hover|increase" />);
    const decreaseBtn = screen.getByTestId("input-incr-dcr-decrease");
    const increaseBtn = screen.getByTestId("input-incr-dcr-increase");

    expect(decreaseBtn).toBeDisabled();
    expect(increaseBtn).not.toBeDisabled();
    expect(increaseBtn).toHaveClass("hover");
  });
  test('state="hover|increase", with defaultValue={2}', async () => {
    render(<Input.IncrDcr defaultValue={2} state="hover|increase" />);

    expect(screen.getByTestId("input-incr-dcr-decrease")).not.toBeDisabled();
    expect(screen.getByTestId("input-incr-dcr-increase")).not.toBeDisabled();
  });
  test('state="focus-visible|increase"', async () => {
    render(<Input.IncrDcr state="focus-visible|increase" />);

    expect(screen.getByTestId("input-incr-dcr-increase")).toHaveClass("focus-visible");
  });
  test('state="focus-visible|decrease"', async () => {
    render(<Input.IncrDcr state="focus-visible|decrease" />);

    expect(screen.getByTestId("input-incr-dcr-decrease")).toHaveClass("focus-visible");
  });
  test('state="disabled"', async () => {
    render(<Input.IncrDcr state="disabled" />);

    expect(screen.getByTestId("input-incr-dcr")).toBeDisabled();
    expect(screen.getByTestId("input-incr-dcr-decrease")).toBeDisabled();
    expect(screen.getByTestId("input-incr-dcr-increase")).toBeDisabled();
  });
  describe("number input onChange functionality", () => {
    test("onChange basic functionality", () => {
      render(<Input.IncrDcr />);
      const input = screen.getByTestId("input-incr-dcr");

      userEvent.type(input, "452");

      expect(input).toHaveValue(452);
    });
    test("non-numeric value", async () => {
      render(<Input.IncrDcr />);
      const input = screen.getByTestId("input-incr-dcr");

      userEvent.type(input, "test");

      expect(input).toHaveValue(null);
    });
    test("value (length) > max (length)", () => {
      render(<Input.IncrDcr />);
      const input = screen.getByTestId("input-incr-dcr");

      userEvent.type(input, "99999");

      // One digit less, as it is more than the max value length
      expect(input).toHaveValue(9999);
    });
    test("value > max, by ⬆️", () => {
      render(<Input.IncrDcr />);
      const input = screen.getByTestId("input-incr-dcr");

      userEvent.type(input, "99999");

      userEvent.type(input, specialChars.arrowUp);

      expect(input).toHaveValue(9999);
    });
    test("value < min, by ⬇️", () => {
      render(<Input.IncrDcr />);
      const input = screen.getByTestId("input-incr-dcr");

      userEvent.type(input, specialChars.arrowDown);

      expect(input).toHaveValue(1);
    });
    test.each([
      { defaultValue: 0, expected: 2 },
      { defaultValue: 10, expected: 9 },
    ])("increment with ⬆️ & decrement with ⬇️", async ({ defaultValue, expected }) => {
      const onValue = jest.fn(value => value);
      render(<Input.IncrDcr defaultValue={defaultValue} onValue={onValue} />);
      const input = screen.getByTestId("input-incr-dcr");

      userEvent.type(input, defaultValue < expected ? specialChars.arrowUp : specialChars.arrowDown);

      await waitFor(() => {
        expect(input).toHaveValue(expected);
      });
      expect(onValue).toHaveBeenCalled();
      expect(onValue).toHaveLastReturnedWith(expected);
    });
    test.each([{ defaultValue: 0 }, { defaultValue: 20 }])(
      "increment with Shift+⬆️ & decrement with Shift+⬇️",
      async ({ defaultValue }) => {
        const expected = 10;
        render(<Input.IncrDcr defaultValue={defaultValue} />);
        const input = screen.getByTestId("input-incr-dcr");

        userEvent.type(input, `{shift}${defaultValue < expected ? specialChars.arrowUp : specialChars.arrowDown}`);

        await waitFor(() => {
          expect(input).toHaveValue(expected);
        });
      }
    );
    test("increment with Shift+⬆️, with defaultValue={1}", async () => {
      render(<Input.IncrDcr />);
      const input = screen.getByTestId("input-incr-dcr");

      userEvent.type(input, `{shift}${specialChars.arrowUp}`);

      await waitFor(() => {
        expect(input).toHaveValue(10);
      });
    });
    test("number input related attributes", () => {
      render(<Input.Number min={4} max={10} step={2} />);
      const input = screen.getByTestId("input-number");

      expect(input.getAttribute("min")).toBe("4");
      expect(input.getAttribute("aria-valuemin")).toBe("4");

      expect(input.getAttribute("max")).toBe("10");
      expect(input.getAttribute("aria-valuemax")).toBe("10");

      expect(input.getAttribute("step")).toBe("2");
    });
    describe("btn control", () => {
      test("default behaviour", async () => {
        render(<Input.IncrDcr />);
        const input = screen.getByTestId("input-incr-dcr");
        const increaseBtn = screen.getByTestId("input-incr-dcr-increase");
        const decreaseBtn = screen.getByTestId("input-incr-dcr-decrease");

        userEvent.click(increaseBtn);

        expect(increaseBtn.onclick).toBeDefined();
        expect(input).toHaveValue(2);
        expect(input.getAttribute("aria-valuenow")).toBe("2");

        userEvent.click(decreaseBtn);
        expect(increaseBtn.onclick).toBeDefined();
        expect(input).toHaveValue(1);
        expect(input.getAttribute("aria-valuenow")).toBe("1");
      });
      test("increment, when max", async () => {
        render(<Input.IncrDcr max={9999} />);
        const input = screen.getByTestId("input-incr-dcr");

        userEvent.type(input, "9999");
        userEvent.click(screen.getByTestId("input-incr-dcr-increase"));

        expect(input).toHaveValue(9999);
      });
      test("decrement, when min", async () => {
        render(<Input.IncrDcr min={1} />);
        const input = screen.getByTestId("input-incr-dcr");

        userEvent.click(screen.getByTestId("input-incr-dcr-decrease"));

        expect(input).toHaveValue(1);
      });
    });
  });
});
