import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Table from "../index";
import { tableTestInitialData, TableTestInitialDataType, TableTestWrapper } from "./Table.test";

const Wrapper: React.FC = ({ children }) => {
  return (
    <Table>
      <Table.THead>
        <Table.Tr idx={0}>{children}</Table.Tr>
      </Table.THead>
    </Table>
  );
};

const checkSort = (columnIdx: number, iconIdx: number, dataKey: keyof TableTestInitialDataType) => {
  const onClick = jest.fn((e, direction) => ({ className: e.currentTarget.className, direction }));
  render(<TableTestWrapper onClick={(e, { direction }) => onClick(e, direction)} />);
  const th = screen.getAllByTestId("table-th")[columnIdx];
  const tbodyTrs = Array.from(screen.getByTestId("table-tbody").children);

  tbodyTrs.forEach(tr => expect(tr).toHaveAttribute("data-testid", "table-tr"));
  expect(tbodyTrs).toHaveLength(5);
  tbodyTrs.forEach((tr, i) => {
    expect(tr.children[columnIdx]).toHaveTextContent(tableTestInitialData[i][dataKey].toString());
  });

  userEvent.click(th);

  const results = onClick.mock.results;
  expect(onClick).toHaveBeenCalledTimes(1);
  expect(results).toHaveLength(1);
  expect(results[0].value).toStrictEqual({ className: th.className, direction: "desc" });
  expect(screen.getAllByTestId("icon")[iconIdx]).toHaveClass("chevron_down");

  tbodyTrs.reverse().forEach((tr, i) => {
    expect(tr.children[columnIdx]).toHaveTextContent(
      dataKey === "username" || dataKey === "test"
        ? tableTestInitialData.sort((a, b) => (a[dataKey] < b[dataKey] ? -1 : 1))[i][dataKey].toString()
        : tableTestInitialData[i][dataKey].toString()
    );
  });

  userEvent.click(th);

  expect(onClick).toHaveBeenCalledTimes(2);
  expect(results).toHaveLength(2);
  expect(results[1].value).toStrictEqual({ className: th.className, direction: "asc" });
  expect(screen.getAllByTestId("icon")[iconIdx]).toHaveClass("chevron_up");

  Array.from(screen.getByTestId("table-tbody").children).forEach((tr, i) => {
    expect(tr.children[columnIdx]).toHaveTextContent(tableTestInitialData[i][dataKey].toString());
  });
};

describe("<Table.Th />", () => {
  test("default behaviour", () => {
    render(
      <Wrapper>
        <Table.Th />
      </Wrapper>
    );
    const th = screen.getByTestId("table-th");

    expect(th).toBeVisible();
    expect(th.onclick).toBeDefined();
    expect(th).toHaveAttribute("class");
    expect(th.children).toHaveLength(1);
    expect(th.tagName.toLowerCase()).toBe("th");
    expect(th).toHaveAttribute("aria-sort", "none");

    const child = th.children[0];
    expect(child.tagName.toLowerCase()).toBe("div");
    expect(child.children).toHaveLength(0);
  });
  test("with sort={true}", () => {
    render(
      <Wrapper>
        <Table.Th sort />
      </Wrapper>
    );
    const th = screen.getByTestId("table-th");

    expect(th).toHaveAttribute("aria-sort", "descending");

    const child = th.children[0];
    expect(child.children).toHaveLength(1);

    const icons = screen.getAllByTestId("icon");
    expect(child.children[0]).toContainElement(icons[0]);
    icons.forEach((icon, i) => {
      if (i === 0 || i === 3) {
        expect(icon).toHaveClass("chevron_up_and_down");
      }
    });
  });
  describe("onClick functionality", () => {
    test("with onClick Prop", () => {
      const onClick = jest.fn(e => e.currentTarget.className);
      render(
        <Wrapper>
          <Table.Th onClick={e => onClick(e)} />
        </Wrapper>
      );
      const th = screen.getByTestId("table-th");

      userEvent.click(th);

      const results = onClick.mock.results;
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(results).toHaveLength(1);
      expect(results[0].value).toBe(th.className);
    });
    test("with number sort={true}", async () => {
      checkSort(0, 0, "id");
    });
    test("with string sort={true}", async () => {
      checkSort(3, 2, "username");
    });
    test("with boolean sort={true}", async () => {
      checkSort(2, 1, "test");
    });
  });
});
