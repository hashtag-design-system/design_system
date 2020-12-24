import { render, screen } from "@testing-library/react";
import userEvent, { specialChars } from "@testing-library/user-event";
import { OpenEye } from "../Input/__icons__";
import Switch from "./index";

describe("<Switch />", () => {
  test("default behaviour", () => {
    render(<Switch />);
    const switchBtn = screen.getByTestId("switch-btn");
    const selectionInput = screen.getByTestId("selection-input-base");

    expect(switchBtn).toBeVisible();
    expect(selectionInput).toBeInTheDocument();
    expect(selectionInput).toHaveAttribute("type", "checkbox");
    expect(selectionInput).toHaveAttribute("value", "false");
    expect(switchBtn).toHaveAttribute("aria-checked", "false");
    expect(switchBtn).toHaveAttribute("data-ison", "false");
    expect(switchBtn).toHaveAttribute("tabindex", "0");
    expect(switchBtn.getAttribute("for")).toHaveLength(5);
    expect(switchBtn.getAttribute("ischecked")).toBeFalsy();
    expect(switchBtn.onclick).toBeDefined();
    expect(screen.queryByTestId("switch-inside-text")).toBeNull();
  });
  test("onClick functionality", () => {
    render(<Switch />);
    const switchBtn = screen.getByTestId("switch-btn");
    const selectionInput = screen.getByTestId("selection-input-base");

    userEvent.click(switchBtn);

    expect(switchBtn).toHaveAttribute("aria-checked", "true");
    expect(switchBtn).toHaveAttribute("data-ison", "true");
    expect(selectionInput.getAttribute("value")).toBeTruthy();

    userEvent.click(switchBtn);

    expect(switchBtn).toHaveAttribute("aria-checked", "false");
    expect(switchBtn).toHaveAttribute("data-ison", "false");
    expect(selectionInput.getAttribute("value")).toBe("false");

    userEvent.click(switchBtn);

    expect(switchBtn).toHaveAttribute("aria-checked", "true");
    expect(switchBtn).toHaveAttribute("data-ison", "true");
    expect(selectionInput.getAttribute("value")).toBeTruthy();
  });
  test("double click functionality", () => {
    render(<Switch />);
    const switchBtn = screen.getByTestId("switch-btn");

    userEvent.dblClick(switchBtn);

    expect(switchBtn).toHaveAttribute("aria-checked", "false");
    expect(switchBtn).toHaveAttribute("data-ison", "false");
  });
  test("hit spacebar", () => {
    render(<Switch />);
    const switchBtn = screen.getByTestId("switch-btn");

    userEvent.type(switchBtn, specialChars.space);

    expect(switchBtn).toHaveAttribute("aria-checked", "true");
    expect(switchBtn).toHaveAttribute("data-ison", "true");
  });
  test("defaultChecked={true}", () => {
    render(<Switch defaultChecked />);
    const switchBtn = screen.getByTestId("switch-btn");

    expect(switchBtn).toHaveAttribute("aria-checked", "true");
    expect(switchBtn).toHaveAttribute("data-ison", "true");
  });
  // Check aslo the SelectionInput <LabelContainer /> helper component
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
  test("disabled state", async () => {
    const { rerender } = render(<Switch state="disabled|on" />);
    const switchBtn = screen.getByTestId("switch-btn");

    expect(switchBtn).toHaveClass("disabled");

    render(<Switch state="disabled|off" />);
    expect(switchBtn).toHaveClass("disabled");

    rerender(<Switch aria-disabled="true" />);
    expect(switchBtn).toHaveClass("disabled");

    rerender(<Switch disabled />);
    expect(switchBtn).toHaveClass("disabled");
    expect(switchBtn).toHaveAttribute("tabindex", "-1");
  });
  test("disabled state, with isChecked={false}", () => {
    render(<Switch state="disabled|off" />);
    const switchBtn = screen.getByTestId("switch-btn");

    expect(switchBtn).toHaveAttribute("aria-checked", "false");
    expect(switchBtn).toHaveAttribute("data-ison", "false");
  });
  test("disabled state, with isChecked={true}", () => {
    render(<Switch state="disabled|on" />);
    const switchBtn = screen.getByTestId("switch-btn");

    expect(switchBtn).toHaveAttribute("aria-checked", "true");
    expect(switchBtn).toHaveAttribute("data-ison", "true");
  });
});
