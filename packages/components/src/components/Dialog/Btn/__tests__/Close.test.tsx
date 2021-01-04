import { screen } from "@testing-library/react";
import Dialog from "../../index";
import { dialogCustomRender } from "../../__helpers__";

describe("<Dialog.Btn.Close />", () => {
  test("default behaviour", () => {
    dialogCustomRender(<Dialog.Btn.Close />, { providerProps: { handleDismiss: () => void true } });
    const closeBtn = screen.getByTestId("dialog-btn-close");

    expect(closeBtn).toBeVisible();
    expect(closeBtn).toHaveAttribute("class");
    expect(closeBtn.onclick).toBeDefined();

    const children = closeBtn.children;
    const firstChild = closeBtn.children[0];
    expect(children).toHaveLength(1);
    expect(firstChild).toHaveClass("icon");
    expect(firstChild).toHaveAttribute("data-testid", "icon");
    expect(firstChild.tagName.toLowerCase()).toBe("svg");
  });
});
