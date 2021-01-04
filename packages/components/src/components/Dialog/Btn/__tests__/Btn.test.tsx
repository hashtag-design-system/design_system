import { screen } from "@testing-library/react";
import Dialog from "../../index";
import { dialogCustomRender } from "../../__helpers__";

describe("<Dialog.Btn />", () => {
  test("default behaviour", () => {
    dialogCustomRender(<Dialog.Btn />, { providerProps: { handleDismiss: () => void true } });
    const btn = screen.getByTestId("dialog-btn");

    expect(btn).toBeVisible();
    expect(btn).toHaveAttribute("class");
    expect(btn.onclick).toBeDefined();
  });
  test("with children", () => {
    dialogCustomRender(<Dialog.Btn>Confirm</Dialog.Btn>, { providerProps: { handleDismiss: () => void true } });
    const btn = screen.getByTestId("dialog-btn");

    // not a HTMLElement
    expect(btn.children).toHaveLength(0);
    expect(btn).toHaveTextContent("Confirm");
  });
});
