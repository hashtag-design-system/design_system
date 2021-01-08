import { render, screen } from "@testing-library/react";
import userEvent, { specialChars } from "@testing-library/user-event";
import { checkSelectionInputDisabled } from "../Checkbox/Checkbox.test";
import { OpenEye } from "../Input/__icons__";
import Switch from "./index";

const checkValue = (switchBtn: HTMLElement, bool: boolean | string) => {
  const strBool = String(bool);
  expect(switchBtn).toHaveAttribute("value", strBool);
  expect(switchBtn).toHaveAttribute("aria-checked", strBool.trim());
};

describe("<Switch />", () => {
  test("default behaviour", () => {
    render(<Switch />);
    const switchBtn = screen.getByTestId("switch-btn");

    const handlerContainer = screen.getByTestId("switch-handler-container");
    expect(handlerContainer).toBeVisible();
    expect(handlerContainer).toHaveAttribute("class");
    expect(handlerContainer.children).toHaveLength(1);
    expect(handlerContainer).toMatchSnapshot();

    const container = screen.getByTestId("switch-container");
    expect(container).toBeVisible();
    expect(container).toHaveAttribute("class");
    expect(container.children).toHaveLength(2);
    expect(container).toContainElement(switchBtn);
    expect(container).toContainElement(handlerContainer);

    expect(switchBtn).toBeVisible();
    expect(switchBtn.id).toHaveLength(5);
    expect(switchBtn).toHaveAttribute("tabindex", "0");
    expect(switchBtn).toHaveAttribute("value", "false");
    expect(switchBtn).toHaveAttribute("type", "checkbox");
    expect(switchBtn).toHaveAttribute("aria-checked", "false");
    expect(switchBtn).toHaveAttribute("data-state", "default");
    expect(switchBtn).toHaveAttribute("data-insidetext", "false");
    expect(switchBtn.onclick).toBeDefined();
    expect(screen.queryByTestId("switch-inside-text")).toBeNull();
  });
  test("onClick functionality", () => {
    render(<Switch />);
    const switchBtn = screen.getByTestId("switch-btn");

    userEvent.click(switchBtn);

    checkValue(switchBtn, true);

    userEvent.click(switchBtn);

    checkValue(switchBtn, false);

    userEvent.click(switchBtn);

    checkValue(switchBtn, true);
  });
  test("double click functionality", () => {
    render(<Switch />);
    const switchBtn = screen.getByTestId("switch-btn");

    userEvent.dblClick(switchBtn);

    checkValue(switchBtn, false);
  });
  test("hit spacebar", () => {
    render(<Switch />);
    const switchBtn = screen.getByTestId("switch-btn");

    userEvent.type(switchBtn, specialChars.space);

    checkValue(switchBtn, "true ");
  });
  test("with defaultChecked={true}", () => {
    render(<Switch defaultChecked />);
    const switchBtn = screen.getByTestId("switch-btn");

    checkValue(switchBtn, true);
  });
  // Check also the SelectionInput <LabelContainer /> helper component
  test("with label", () => {
    render(<Switch label={{ value: "Label" }} />);
    const selectionInput = screen.getByTestId("selection-input-label");

    expect(selectionInput).toBeVisible();
    expect(selectionInput).toHaveTextContent("Label");
  });
  describe("with inside values", () => {
    test("with insideText", () => {
      render(<Switch insideText={{ value: "test" }} />);
      const insideText = screen.getByTestId("switch-inside-text");

      expect(insideText).toBeVisible();
      expect(insideText).toHaveTextContent("test");
      expect(insideText).toMatchSnapshot();
    });
    test("with insideText & position", () => {
      const { rerender } = render(<Switch insideText={{ value: "test", position: "right" }} />);
      expect(screen.getByTestId("switch-inside-text")).toHaveAttribute("data-position", "right");
      expect(screen.getByTestId("switch-inside-text")).toMatchSnapshot();

      rerender(<Switch insideText={{ value: "test", position: "toggle" }} />);
      expect(screen.getByTestId("switch-inside-text")).toHaveAttribute("data-position", "toggle");
      expect(screen.getByTestId("switch-inside-text")).toMatchSnapshot();
    });
    test("with icon", () => {
      render(<Switch icon={{ component: <OpenEye /> }} />);
      const icon = screen.getByTestId("switch-inside-icon");

      expect(icon).toBeVisible();
      expect(icon).toMatchSnapshot();
    });
    test("with icon & position", () => {
      const { rerender } = render(<Switch icon={{ component: <OpenEye />, position: "right" }} />);
      expect(screen.getByTestId("switch-inside-icon")).toHaveAttribute("data-position", "right");
      expect(screen.getByTestId("switch-inside-icon")).toMatchSnapshot();

      rerender(<Switch icon={{ component: <OpenEye />, position: "toggle" }} />);
      expect(screen.getByTestId("switch-inside-icon")).toHaveAttribute("data-position", "toggle");
      expect(screen.getByTestId("switch-inside-icon")).toMatchSnapshot();
    });
  });
  describe("disabled state", () => {
    test("with state Prop", async () => {
      const { rerender } = render(<Switch state="disabled|on" />);
      const switchBtn = screen.getByTestId("switch-btn");

      expect(switchBtn).toBeDisabled();
      checkSelectionInputDisabled(switchBtn);

      render(<Switch state="disabled|off" />);
      checkSelectionInputDisabled(switchBtn);

      rerender(<Switch aria-disabled="true" />);
      checkSelectionInputDisabled(switchBtn);

      rerender(<Switch disabled />);
      checkSelectionInputDisabled(switchBtn);
      expect(switchBtn).toHaveAttribute("tabindex", "-1");
    });
    test('with state="disabled|off", with isChecked={false}', () => {
      render(<Switch state="disabled|off" />);
      const switchBtn = screen.getByTestId("switch-btn");

      checkValue(switchBtn, false);
    });
    test('with state="disabled|on", with isChecked={true}', () => {
      render(<Switch state="disabled|on" />);
      const switchBtn = screen.getByTestId("switch-btn");

      checkValue(switchBtn, true);
    });
  });
});
