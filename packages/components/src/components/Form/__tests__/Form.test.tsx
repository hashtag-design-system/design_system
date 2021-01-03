import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Button from "../../Button";
import Input from "../../Input";
import Form from "../index";

describe("<Form />", () => {
  test("default behaviour", () => {
    render(
      <Form>
        <Input name="text" placeholder="Placeholder" />
        <Input.Number name="number" state="default" />
      </Form>
    );
    const form = screen.getByTestId("form");

    expect(form).toBeVisible();
    expect(form.onsubmit).toBeDefined();
    // <Form.Group /> "container"
    expect(form.children).toHaveLength(1);
    expect(form.children[0].children).toHaveLength(2);

    const input = screen.getByTestId("input");
    expect(input).toHaveAttribute("name", "text");
    expect(input).toHaveValue("");

    const numInput = screen.getByTestId("input-number");
    expect(numInput).toHaveAttribute("name", "number");
    expect(numInput).toHaveValue(0);
  });
  test("with defaultValues", () => {
    render(
      <Form defaultValues={{ text: "test", number: 5 }}>
        <Input name="text" placeholder="Placeholder" />
        <Input.Number name="number" state="default" />
      </Form>
    );

    expect(screen.getByTestId("input")).toHaveValue("test");
    expect(screen.getByTestId("input-number")).toHaveValue(5);
  });
  test("with onSubmit", async () => {
    const onSubmit = jest.fn(data => data);
    render(
      <Form onSubmit={d => onSubmit(d)}>
        <Input name="text" placeholder="Placeholder" />
        <Input.Number name="number" state="default" />
        <Button type="submit">Submit</Button>
      </Form>
    );
    const input = screen.getByTestId("input");
    const numInput = screen.getByTestId("input-number");

    userEvent.type(input, "test");
    expect(input).toHaveValue("test");

    userEvent.type(numInput, "10");
    expect(numInput).toHaveValue(10);

    userEvent.click(screen.getByText("Submit")!);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    expect(onSubmit.mock.results[0].value).toStrictEqual({ text: "test", number: "10" });
  });
});
