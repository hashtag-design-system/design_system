import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "../index";
import { StrengthBoxesSecureLevel } from "../Password";
import { passwordBoxesClassNameContains } from "../__helpers__/PasswordBoxes/boxClassName";

const TEST_PASSWORD_STRENGTH: {
  password: string;
  strength: StrengthBoxesSecureLevel;
  length: number;
}[] = [
  { password: "pass", strength: "md", length: 1 },
  { password: "password", strength: "md", length: 2 },
  { password: "password123", strength: "md", length: 3 },
  { password: "pasword123", strength: "lg", length: 1 },
  { password: "pasword123^&", strength: "lg", length: 2 },
  { password: "pasword123^&SK", strength: "lg", length: 3 },
];

const queryStrengthBoxes = (secureLevel: StrengthBoxesSecureLevel) => {
  return screen
    .queryAllByTestId("password-box")
    .map(box => box.className)
    .filter(className => className.includes(secureLevel));
};

describe("<Input.Password />", () => {
  test("default behaviour", () => {
    render(<Input.Password />);
    const input = screen.getByTestId("input-password");

    expect(input).toBeInTheDocument();
    expect(screen.getByTestId("help-text-container")).toBeInTheDocument();
    expect(input.getAttribute("type")).toBe("password");
    expect(input.getAttribute("value")).toBe("");
    expect(input.getAttribute("data-hasfloatingplaceholder")).toBeTruthy();
    expect(input.getAttribute("suffix")).toBeDefined();
    passwordBoxesClassNameContains(screen.queryAllByTestId("password-box"), "sm");
  });
  test('form="sign-up"', () => {
    render(<Input.Password form="sign-up" />);
    const input = screen.getByTestId("input-password");

    expect(input.getAttribute("autoComplete")).toBe("new-password");
  });
  test('form="login"', () => {
    render(<Input.Password form="login" />);
    const input = screen.getByTestId("input-password");

    expect(input.getAttribute("autoComplete")).toBe("current-password");
  });
  test("visibilityToggle=true", () => {
    render(<Input.Password visibilityToggle />);
    const input = screen.getByTestId("input-password");

    expect(input.getAttribute("suffix")).toBeDefined();
  });
  describe("password strength", () => {
    test.each(TEST_PASSWORD_STRENGTH)("measure strength while typing", ({ password, strength, length }) => {
      render(<Input.Password />);
      const input = screen.getByTestId("input-password");

      userEvent.type(input, password);

      expect(input).toHaveValue(password);
      expect(queryStrengthBoxes(strength)).toHaveLength(length);
    });
    test("defaultValue strength", () => {
      render(<Input.Password />);
      const input = screen.getByTestId("input-password");
      const { password, strength, length } = TEST_PASSWORD_STRENGTH[3];

      userEvent.type(input, password);

      expect(input).toHaveValue(password);
      expect(queryStrengthBoxes(strength)).toHaveLength(length);
    });
    test("helptext container style", () => {
      render(<Input.Password />);
      const container = screen.getByTestId("help-text-container");

      expect(container.style.gap).toBeDefined();
    });
  });
});
