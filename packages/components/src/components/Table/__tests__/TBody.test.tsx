import { render, screen } from "@testing-library/react";
import Table from "../index";

describe("<Table.TBody />", () => {
  test("default behaviour", () => {
    render(
      <Table>
        <Table.TBody />
      </Table>
    );
    const tbody = screen.getByTestId("table-tbody");

    expect(tbody).toBeVisible();
    expect(tbody).toHaveAttribute("class");
    expect(tbody.tagName.toLowerCase()).toBe("tbody");
  });
  test("with children", () => {
    render(
      <Table>
        <Table.TBody>
          <Table.Tr>
            <Table.Td>1</Table.Td>
            <Table.Td>1.5€</Table.Td>
            <Table.Td>Hey</Table.Td>
            <Table.Td>{String(true)}</Table.Td>
            <Table.Td>test</Table.Td>
          </Table.Tr>
        </Table.TBody>
      </Table>
    );
    const tbody = screen.getByTestId("table-tbody");

    expect(tbody.children).toHaveLength(1);

    const firstChild = tbody.children[0];
    expect(firstChild.tagName.toLowerCase()).toBe("tr");

    const firstChildChildren = firstChild.children;
    expect(firstChild.children).toHaveLength(5);
    Array.from(firstChildChildren).forEach(child => {
      expect(child.tagName.toLowerCase()).toBe("td");
    });
  });
});
