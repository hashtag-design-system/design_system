import { render, screen, waitFor } from "@testing-library/react";
import Form from "../index";

describe("<Form.Header />", () => {
  test("default behaviour", () => {
    render(<Form.Header />);
    const header = screen.getByTestId("form-header");

    expect(header).toBeVisible();
    expect(header).toHaveTextContent("");
    expect(header).toHaveAttribute("class");
    expect(header).not.toHaveAttribute("style");
    expect(header.tagName.toLowerCase()).toBe("h6");
  });
  test("with withBorder={false}", async () => {
    render(<Form.Header withBorder={false}>Header</Form.Header>);
    const header = screen.getByTestId("form-header");

    await waitFor(() => {
      expect(header.style).toBeDefined();
      expect(header).toHaveStyle("border: none");
    });
  });
  test("with children", () => {
    render(<Form.Header>Header</Form.Header>);
    const header = screen.getByTestId("form-header");

    expect(header).toHaveTextContent("Header");
    // Due to the fact that not a HTMLElement is passed
    expect(header.children).toHaveLength(0);
  });
});
