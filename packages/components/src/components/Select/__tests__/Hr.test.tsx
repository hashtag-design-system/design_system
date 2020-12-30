import { render, screen } from "@testing-library/react";
import Select from "../index";

describe("<Select.Hr />", () => {
  test("default behaviour", () => {
    render(<Select.Hr />);
    const hr = screen.getByTestId("select-hr");

    expect(hr).toBeVisible();
    expect(hr.tagName.toLowerCase()).toBe("span");
    expect(hr).toHaveAttribute("class");
    expect(hr.children).toHaveLength(0);
  });
  test('with className="custom-className"', () => {
    render(<Select.Hr className="custom-className" />);
    const hr = screen.getByTestId("select-hr");

    expect(hr).toHaveClass("custom-className");
    expect(hr).toMatchSnapshot();
  });
});
