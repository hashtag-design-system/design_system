import { render, screen } from "@testing-library/react";
import Table from "../index";

const Wrapper: React.FC = ({ children }) => {
  return (
    <Table>
      <Table.TBody><Table.Tr idx={0}>{children}</Table.Tr></Table.TBody>
    </Table>
  );
};

describe("<Table.Td >", () => {
  test("default behaviour", () => {
    render(
      <Wrapper>
        <Table.Td />
      </Wrapper>
    );
    const td = screen.getByTestId("table-td");

    expect(td).toBeVisible();
    expect(td).toHaveAttribute("class");
    expect(td.tagName.toLowerCase()).toBe("td");
  });
  test("with children", () => {
    render(
      <Wrapper>
        <Table.Td>test</Table.Td>
      </Wrapper>
    );
    const td = screen.getByTestId("table-td");

    expect(td).toHaveTextContent("test");
    expect(td.children).toHaveLength(0);
  });
});
