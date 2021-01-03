import { render, screen } from "@testing-library/react";
import { AnchorLink } from "./AnchorLink";

describe("Pagination <AnchorLink />", () => {
  test("default behaviour", () => {
    render(<AnchorLink pageNum={1} />);
    const link = screen.getByTestId("pagination-link");

    expect(link).toBeVisible();
    expect(link).toHaveAttribute("class");
    expect(link).toHaveAttribute("href");
    expect(link.getAttribute("href")).toBe("#1");
    expect(link.children).toHaveLength(0);
    expect(link.tagName.toLowerCase()).toBe("a");
  });
  test("with spread={true}", () => {
    render(<AnchorLink pageNum={1} spread />);
    const link = screen.getByTestId("pagination-link");

    expect(link.tagName.toLowerCase()).toBe("span");
    expect(link).toHaveAttribute("aria-hidden", "true");
    expect(link).toHaveTextContent("...");
  });
  test("with href", () => {
    render(<AnchorLink pageNum={1} href="https://www.test.com/page/1" />);

    expect(screen.getByTestId("pagination-link")).toHaveAttribute("href", "https://www.test.com/page/1");
  });
  test("with children", () => {
    render(<AnchorLink pageNum={2}>2</AnchorLink>);
    const link = screen.getByTestId("pagination-link");

    expect(link).toHaveTextContent("2");
    // We don't pass a HTMLElement, but simple string text
    expect(link.children).toHaveLength(0);
  });
});
