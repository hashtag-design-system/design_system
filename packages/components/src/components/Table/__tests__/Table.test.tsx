import { render, screen } from "@testing-library/react";
import { SortDirection } from "../../../typings";
import { useSortableData } from "../../../utils/hooks";
import Table, { TableFProps, TableThProps, TableTrFProps } from "../index";

export type TableTestInitialDataType = {
  id: number;
  amount: number;
  test: boolean;
  username: string;
};
export const tableTestInitialData: TableTestInitialDataType[] = [
  { id: 1, amount: 0.75, test: true, username: "#hashtag" },
  { id: 2, amount: 1.0, test: false, username: "me" },
  { id: 3, amount: 0.65, test: false, username: "skg" },
  { id: 4, amount: 1.5, test: true, username: "spoon" },
  { id: 5, amount: 1.25, test: false, username: "georgekrax" },
];

export type TableTestWrapperFProps = Omit<TableFProps, "onClick"> & TableThProps & { header?: boolean } & Pick<TableTrFProps, "state">;

export const TableTestWrapper: React.FC<TableTestWrapperFProps> = ({
  state = "default",
  header = true,
  sort = true,
  extraColumn,
  onClick,
  ...props
}) => {
  const { data, setSort } = useSortableData<TableTestInitialDataType>(tableTestInitialData);

  const handleClick = (
    e: React.MouseEvent<HTMLTableHeaderCellElement>,
    direction: SortDirection,
    key: keyof TableTestInitialDataType
  ) => {
    if (sort) {
      setSort({ direction, key });
    }
    if (onClick) onClick(e, { direction });
  };

  return (
    <Table
      extraColumn={
        extraColumn ? { ...extraColumn, selectedRows: row => extraColumn.selectedRows && extraColumn.selectedRows(row) } : undefined
      }
      {...props}
    >
      {header && (
        <Table.THead>
          <Table.Tr>
            <Table.Th sort={sort} onClick={(e, { direction }) => handleClick(e, direction, "id")}>
              ID
            </Table.Th>
            <Table.Th>Amount</Table.Th>
            <Table.Th sort={sort} onClick={(e, { direction }) => handleClick(e, direction, "test")}>
              Test
            </Table.Th>
            <Table.Th sort={sort} onClick={(e, { direction }) => handleClick(e, direction, "username")}>
              Username
            </Table.Th>
          </Table.Tr>
        </Table.THead>
      )}
      <Table.TBody>
        {data.map(({ id, amount, test, username }, i) => {
          return (
            <Table.Tr state={i === 1 ? state : undefined} key={i}>
              <Table.Td>{id}</Table.Td>
              <Table.Td>{amount}</Table.Td>
              <Table.Td>{String(test)}</Table.Td>
              <Table.Td>{username}</Table.Td>
            </Table.Tr>
          );
        })}
      </Table.TBody>
    </Table>
  );
};

describe("<Table />", () => {
  test("default behaviour", () => {
    render(<Table />);
    const table = screen.getByTestId("table");

    expect(table).toBeVisible();
    expect(table).toHaveAttribute("class");
    expect(table.tagName.toLowerCase()).toBe("table");
    expect(table.children).toHaveLength(0);
  });
  test("with children", () => {
    render(<TableTestWrapper />);
    const table = screen.getByTestId("table");

    expect(table).toMatchSnapshot();

    const children = table.children;
    const thead = screen.getByTestId("table-thead");
    const tbody = screen.getByTestId("table-tbody");

    expect(children).toHaveLength(2);
    expect(children).toContain(thead);
    expect(children).toContain(tbody);

    expect(thead.children).toHaveLength(1);
    expect(tbody.children).toHaveLength(5);
  });
});
