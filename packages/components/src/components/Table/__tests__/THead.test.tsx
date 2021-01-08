import { render, screen } from "@testing-library/react";
import Table from "../index";

describe("<Table.THead />", () => {
  test("default behaviour", () => {
    render(
      <Table>
        <Table.THead />
      </Table>
    );
    const thead = screen.getByTestId("table-thead");

    expect(thead).toBeVisible();
    expect(thead).toHaveAttribute("class");
    expect(thead.tagName.toLowerCase()).toBe("thead");
  });
  test("with children", () => {
    render(
      <Table>
        <Table.THead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Amount</Table.Th>
            <Table.Th>Test</Table.Th>
            <Table.Th>Username</Table.Th>
          </Table.Tr>
        </Table.THead>
      </Table>
    );
    const thead = screen.getByTestId("table-thead");

    expect(thead.children).toHaveLength(1);

    const firstChild = thead.children[0];
    expect(firstChild.tagName.toLowerCase()).toBe("tr");

    const firstChildChildren = firstChild.children;
    expect(firstChild.children).toHaveLength(4);
    Array.from(firstChildChildren).forEach(child => {
      expect(child.tagName.toLowerCase()).toBe("th");
    });
  });
});
