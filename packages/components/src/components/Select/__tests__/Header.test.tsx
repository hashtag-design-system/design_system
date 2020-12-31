import { render, screen } from "@testing-library/react";
import Select from "../index";

describe("<Select.Header />", () => {
  test("default behaviour", () => {
    render(<Select.Header value="Test header" />);
    const header = screen.getByTestId("select-header");

    expect(header).toBeVisible();
    expect(header).toHaveAttribute("class");
    expect(header).toHaveAttribute("data-children", "false");
    expect(header).toMatchSnapshot();

    const children = header.children;

    expect(children).toHaveLength(1);
    expect(children[0].tagName.toLowerCase()).toBe("h6");
    expect(children[0]).toHaveTextContent("Test header");

    expect(screen.getByTestId("select-hr")).toBeVisible();
  });
});
