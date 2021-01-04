import { render, screen } from "@testing-library/react";
import Dialog from "../index";

describe("<Dialog.Title />", () => {
  test("default behaviour", () => {
    render(<Dialog.Title />);
    const title = screen.getByTestId("dialog-title");

    expect(title).toBeVisible();
    expect(title.tagName.toLowerCase()).toBe("h6");
    expect(title).toHaveAttribute("class");
  });
  test("with children", () => {
    render(
      <Dialog.Title>
        <code>print("hello world!")</code> How are you?
      </Dialog.Title>
    );
    const title = screen.getByTestId("dialog-title");

    expect(title).toHaveTextContent('print("hello world!") How are you?');
    expect(title.children).toHaveLength(1);
    expect(title.children[0]).toHaveTextContent('print("hello world!")');
  });
});
