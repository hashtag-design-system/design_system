import { screen } from "@testing-library/react";
import Dialog from "../../index";
import { dialogCustomRender } from "../../__helpers__";

describe("<Dialog.Btn />", () => {
  test("default behaviour", () => {
    dialogCustomRender(<Dialog.Btn />, { providerProps: { handleDismiss: () => void true } });
    const btn = screen.getByTestId("dialog-btn");

    expect(btn).toBeVisible();
    expect(btn).toHaveAttribute("class");
    expect(btn.className).toContain("secondary");
    expect(btn.onclick).toBeDefined();
  });
  test("with children", () => {
    dialogCustomRender(<Dialog.Btn>Confirm</Dialog.Btn>, { providerProps: { handleDismiss: () => void true } });
    const btn = screen.getByTestId("dialog-btn");

    // not a HTMLElement
    expect(btn.children).toHaveLength(0);
    expect(btn).toHaveTextContent("Confirm");
  });
  test("with confirm={true}", () => {
    dialogCustomRender(<Dialog.Btn confirm>Confirm</Dialog.Btn>, { providerProps: { handleDismiss: () => void true } });
    const btn = screen.getByTestId("dialog-btn");

    expect(btn.className).toContain("primary");
  });
  describe("with loading", () => {
    test("with confirm={true} & loading={true}", () => {
      dialogCustomRender(<Dialog.Btn confirm>Confirm</Dialog.Btn>, {
        providerProps: { handleDismiss: () => void true, loading: true },
      });
      const btn = screen.getByTestId("dialog-btn");

      expect(btn).toHaveClass("loading");
      expect(btn).toHaveClass("dismiss-onloading");
    });
    test.each([true, false])("with loading={true} & allowDismissOnLoading={bool}", bool => {
      dialogCustomRender(<Dialog.Btn>Confirm</Dialog.Btn>, {
        providerProps: { handleDismiss: () => void true, loading: true, allowDismissOnLoading: bool },
      });
      const btn = screen.getByTestId("dialog-btn");

      expect(btn).toHaveClass("loading")
      if (bool) {
        expect(btn).not.toHaveClass("dismiss-onloading");
      } else {
        expect(btn).toHaveClass("dismiss-onloading");
      }
    });
  });
});
