import { render, screen } from "@testing-library/react";
import Input from "../../Input";
import Form from "../index";

describe("<Form.Group />", () => {
  test("default behaviour", () => {
    render(
      <Form.Group>
        <Input name="text" placeholder="Placeholder" />
        <Input.Number label="Label" state="default" />
      </Form.Group>
    );
    const group = screen.getByTestId("form-group");

    expect(group).toBeVisible();
    expect(group).toHaveAttribute("class");
    expect(group.children).toHaveLength(2);
  });
});
