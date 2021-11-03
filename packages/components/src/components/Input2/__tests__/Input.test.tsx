import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "../index";

describe("<Input />", () => {
  test("overrideOnChange", () => {
    const onChange = jest.fn((e: React.ChangeEvent<HTMLInputElement>) => e.preventDefault());
    render(<Input overrideOnChange onChange={onChange} />);
    const input = screen.getByTestId("input");
    const newVal = "test@gmail.com";

    userEvent.type(input, newVal);

    // The value will not change, but the function `onChange` will be called each time
    expect(input).toHaveValue("");
    expect(onChange).toHaveBeenCalledTimes(newVal.length);
  });
});
