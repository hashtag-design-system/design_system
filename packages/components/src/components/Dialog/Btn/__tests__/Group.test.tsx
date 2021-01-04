import { render, screen } from "@testing-library/react";
import Button from "../../../Button";
import Dialog from "../../index";

describe("<Dialog.Btn.Group />", () => {
  test("default behaviour", () => {
    render(
      <Dialog.Btn.Group>
        <Button variant="secondary">Cancel</Button>
        <Button>Confirm</Button>
      </Dialog.Btn.Group>
    );
    const group = screen.getByTestId("dialog-btn-group");

    expect(group).toBeVisible();
    expect(group).toHaveAttribute("class");
    expect(group.children).toHaveLength(2);
    Array.from(group.children).forEach(child => {
      expect(child.tagName.toLowerCase()).toBe("button");
    });
    expect(group.children[0]).toHaveTextContent("Cancel");
    expect(group.children[1]).toHaveTextContent("Confirm");
  });
});
