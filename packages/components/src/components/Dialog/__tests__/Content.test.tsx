import { screen } from "@testing-library/react";
import Dialog from "../index";
import { dialogCustomRender } from "../__helpers__";

describe("<Dialog.Content />", () => {
  test("default behaviour", () => {
    dialogCustomRender(<Dialog.Content>Content</Dialog.Content>);
    const content = screen.getByTestId("dialog-content");

    expect(content).toBeVisible();
    expect(content).toHaveAttribute("class");
    expect(content).not.toHaveAttribute("style");
    // As no HTMLElement
    expect(content.children).toHaveLength(0);
    expect(content).toHaveTextContent("Content");
  });
  test("with children", () => {
    dialogCustomRender(
      <Dialog.Content>
        <code>Jest.js</code> Content
      </Dialog.Content>
    );
    const content = screen.getByTestId("dialog-content");

    expect(content.children).toHaveLength(1);
    expect(content.children[0]).toHaveTextContent("Jest.js");
    expect(content).toHaveTextContent("Jest.js Content");
  });
  test("with confirm={true}", () => {
    dialogCustomRender(
      <Dialog.Content>
        <code>Jest.js</code> Content
      </Dialog.Content>,
      { providerProps: { confirm: true } }
    );
    const content = screen.getByTestId("dialog-content");

    expect(content).toHaveAttribute("style");
    expect(content.style.padding).toBeDefined();
  });
  test("with hasBtnGroup={true}", () => {
    dialogCustomRender(
      <Dialog.Content>
        <code>Jest.js</code> Content
      </Dialog.Content>,
      { providerProps: { hasBtnGroup: true } }
    );
    const content = screen.getByTestId("dialog-content");

    expect(content).toHaveAttribute("style");
    expect(content.style.padding).toBeDefined();
  });
});
