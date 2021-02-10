import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent, { specialChars } from "@testing-library/user-event";
import React from "react";
import Input from "../index";

describe("<Input.Number />", () => {
  test("default behaviour", async () => {
    render(<Input.Number />);
    const input = screen.getByTestId("input-number");

    expect(input).toBeInTheDocument();
    expect(input).not.toHaveAttribute("placeholder");
    expect(input.getAttribute("value")).toBe("0");
    expect(input.getAttribute("type")).toBe("number");
    expect(input.getAttribute("data-hasfloatingplaceholder")).toBe("false");
    expect(input.getAttribute("min")).toBe("0");
    expect(input.getAttribute("max")).toBe("9999999");
    expect(input.getAttribute("step")).toBe("1");
    expect(input.getAttribute("aria-valuemin")).toBe("0");
    expect(input.getAttribute("aria-valuemax")).toBe("9999999");
    expect(input.getAttribute("aria-valuenow")).toBe("0");
    expect(input.getAttribute("width")).toBeDefined();
    expect(input.getAttribute("data-isbtnshown")).toBe("false");
    expect(screen.queryByTestId("input-number-btn-container")).toBeNull();
  });
  test("onFocus", async () => {
    render(<Input.Number />);
    const input = screen.getByTestId("input-number");

    fireEvent.focus(input);

    expect(input.getAttribute("value")).toBe("");
    expect(input.getAttribute("aria-valuenow")).toBe("");
    expect(input.getAttribute("data-isbtnshown")).toBeTruthy;
  });
  test("onHover", async () => {
    render(<Input.Number />);
    const input = screen.getByTestId("input-number");

    userEvent.hover(input);

    await waitFor(() => {
      expect(screen.getByTestId("input-number-btn-container")).toBeVisible();
    });

    expect(input.getAttribute("data-isbtnshown")).toBeTruthy;

    userEvent.unhover(input);

    await waitFor(() => {
      expect(screen.queryByTestId("input-number-btn-container")).toBeNull();
    });
    expect(input.getAttribute("data-isbtnshown")).toBe("false");
  });
  // * Default state changes (eg. className) happen in the <Input.Base /> component tests
  test('state="hover"', async () => {
    render(<Input.Number state="hover" />);

    await waitFor(() => {
      expect(screen.getByTestId("input-number-btn-container")).toBeVisible();
    });
  });
  test('state="focus"', async () => {
    render(<Input.Number state="focus" />);

    await waitFor(() => {
      expect(screen.getByTestId("input-number-btn-container")).toBeVisible();
    });
  });
  test('state="disabled"', async () => {
    render(<Input.Number state="disabled" />);

    expect(screen.getByTestId("input-number").getAttribute("data-isbtnshown")).toBeTruthy();
    expect(screen.getByTestId("input-number-btn-container")).toBeInTheDocument();
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
  test("btns on hover default behaviour", async () => {
    render(<Input.Number />);
    const input = screen.getByTestId("input-number");

    userEvent.hover(input);

    const increaseBtn = screen.getByTestId("input-number-btn-increase");
    const decreaseBtn = screen.getByTestId("input-number-btn-decrease");

    userEvent.hover(increaseBtn);

    expect(parseFloat(increaseBtn.style.height.replace("rem", ""))).toBeGreaterThan(
      parseFloat(decreaseBtn.style.height.replace("rem", ""))
    );

    userEvent.unhover(increaseBtn);
    userEvent.hover(decreaseBtn);

    expect(parseFloat(decreaseBtn.style.height.replace("rem", ""))).toBeGreaterThan(
      parseFloat(increaseBtn.style.height.replace("rem", ""))
    );
  });
  test("with showBtnControl={false}", () => {
    render(<Input.Number showBtnControl={false} />);
    const input = screen.getByTestId("input-number");

    userEvent.hover(input);

    const increaseBtn = screen.queryByTestId("input-number-btn-increase");
    const decreaseBtn = screen.queryByTestId("input-number-btn-decrease");

    expect(increaseBtn).toBeNull();
    expect(decreaseBtn).toBeNull();
  });
  describe("number input onChange functionality", () => {
    test("onChange basic functionality", () => {
      render(<Input.Number />);
      const input = screen.getByTestId("input-number");

      userEvent.type(input, "452");

      expect(input).toHaveValue(452);
    });
    test("non-numeric value", async () => {
      render(<Input.Number />);
      const input = screen.getByTestId("input-number");

      userEvent.type(input, "test");

      expect(input).toHaveValue(null);
    });
    test("value (length) > max (length)", () => {
      render(<Input.Number />);
      const input = screen.getByTestId("input-number");

      userEvent.type(input, "99999999");

      // One digit less, as it is more than the max value length
      expect(input).toHaveValue(9999999);
    });
    test("value > max, by ⬆️", () => {
      render(<Input.Number />);
      const input = screen.getByTestId("input-number");

      userEvent.type(input, "9999999");

      userEvent.type(input, specialChars.arrowUp);

      expect(input).toHaveValue(9999999);
    });
    test("value < min, by ⬇️", () => {
      render(<Input.Number />);
      const input = screen.getByTestId("input-number");

      userEvent.type(input, specialChars.arrowDown);

      expect(input).toHaveValue(0);
    });
    test("increment with ⬆️", async () => {
      render(<Input.Number />);
      const input = screen.getByTestId("input-number");

      userEvent.type(input, specialChars.arrowUp);

      expect(input).toHaveValue(1);
    });
    test("decrement with ⬇️", async () => {
      render(<Input.Number defaultValue={10} />);
      const input = screen.getByTestId("input-number");

      userEvent.type(input, specialChars.arrowDown);

      expect(input).toHaveValue(9);
    });
    test("increment with Shift+⬆️", async () => {
      render(<Input.Number />);
      const input = screen.getByTestId("input-number");

      userEvent.type(input, `{shift}${specialChars.arrowUp}`);

      expect(input).toHaveValue(10);
    });
    test("decrement with Shift+⬇️", async () => {
      render(<Input.Number defaultValue={20} />);
      const input = screen.getByTestId("input-number");

      userEvent.type(input, `{shift}${specialChars.arrowDown}`);

      expect(input).toHaveValue(10);
    });
    test("increment with Shift+⬆️, with defaultValue={1}", async () => {
      render(<Input.Number defaultValue={1} />);
      const input = screen.getByTestId("input-number");

      userEvent.type(input, `{shift}${specialChars.arrowUp}`);

      expect(input).toHaveValue(10);
    });
    describe("btn control", () => {
      test("default behaviour", async () => {
        render(<Input.Number />);
        const input = screen.getByTestId("input-number");

        userEvent.hover(input);

        const increaseBtn = screen.getByTestId("input-number-btn-increase");
        const decreaseBtn = screen.getByTestId("input-number-btn-decrease");

        userEvent.click(increaseBtn);

        expect(increaseBtn.onclick).toBeDefined();
        expect(input).toHaveValue(1);
        expect(input.getAttribute("aria-valuenow")).toBe("1");

        userEvent.click(decreaseBtn);

        expect(decreaseBtn.onclick).toBeDefined();
        expect(input).toHaveValue(0);
        expect(input.getAttribute("aria-valuenow")).toBe("0");
      });
      test("increment, when max", async () => {
        render(<Input.Number max={9999} />);
        const input = screen.getByTestId("input-number");

        userEvent.type(input, "9999");
        userEvent.hover(input);

        const increaseBtn = screen.getByTestId("input-number-btn-increase");

        userEvent.click(increaseBtn);

        expect(increaseBtn.onclick).toBeDefined();
        expect(input).toHaveValue(9999);
        expect(input.getAttribute("aria-valuenow")).toBe("9999");
      });
      test("decrement, when min", async () => {
        render(<Input.Number min={0} />);
        const input = screen.getByTestId("input-number");

        userEvent.hover(input);

        const decreaseBtn = screen.getByTestId("input-number-btn-decrease");

        userEvent.click(decreaseBtn);

        expect(decreaseBtn.onclick).toBeDefined();
        expect(input).toHaveValue(0);
        expect(input.getAttribute("aria-valuenow")).toBe("0");
      });
    });
  });
});
