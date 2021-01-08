/* spell-checker: disable */
// TODO: Remove afterwards removing the <Checkbox /> label Prop
import React, { useEffect, useRef, useState } from "react";
import "./App.scss";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";
import Input from "./components/Input";
import Pagination from "./components/Pagination";
import Table from "./components/Table";
import { useSortableData } from "./utils/hooks";

// https://stackoverflow.com/questions/44497388/typescript-array-to-string-literal-type

type InitialDataType = {
  id: number;
  amount: number;
  hey: string;
  test: boolean;
  username: string;
};
const initialData: InitialDataType[] = [
  { id: 1, amount: 0.75, hey: "hey", test: true, username: "georgekrax" },
  { id: 2, amount: 1.0, hey: "hey", test: false, username: "me" },
  { id: 3, amount: 0.65, hey: "hey", test: false, username: "skg" },
  { id: 4, amount: 1.5, hey: "hey", test: true, username: "spoon" },
];

function App() {
  const [isChecked, setIsChecked] = useState(false);
  const { data, setSort } = useSortableData<InitialDataType>(initialData);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.focus();
    }
  });
  console.log(isChecked);

  return (
    <div className="App">
      <Button pill onClick={() => setIsChecked(!isChecked)}>
        Button
      </Button>
      {/* <Switch insideText={{ value: "hedcsdfsdffsfdsdy", position: "toggle" }} />
      <Switch /> */}
      <Checkbox
        // state="disabled|checked"
        // defaultChecked={true}
        // checked={isChecked}
        onChange={e => console.log(e.currentTarget.value)}
        label={{
          value:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, voluptates. Doloremque nemo, earum corporis error eum vero nostrum nesciunt, reiciendis dolorum tempora vitae voluptatum reprehenderit nam fuga beatae temporibus dolores!",
        }}
      />
      <Pagination
        totalPages={10}
        // currentPage={page}
        // surroundingPageCount={3}
        // hrefBuilder={page => `https://georgekrax.com/${page}`}
        onPageChange={(e, page) => {
          e.preventDefault();
          console.log(page);
        }}
        // onClick={(e, page) => {
        // e.preventDefault();
        // setPage(page);
        // console.log(page);
        // }}
      />
      <Table extraColumn={{ component: "radio", withBorderRight: true, selectedRows: e => console.log(e) }}>
        <Table.THead>
          <Table.Tr>
            <Table.Th
              sort
              onClick={(_, { direction }) => {
                setSort({ direction, key: "id" });
              }}
            >
              ID
            </Table.Th>
            <Table.Th
              sort
              onClick={(_, { direction }) => {
                setSort({ direction, key: "amount" });
              }}
            >
              Amount
            </Table.Th>
            <Table.Th
              sort
              onClick={(_, { direction }) => {
                setSort({ direction, key: "hey" });
              }}
            >
              Hey
            </Table.Th>
            <Table.Th
              sort
              onClick={(_, { direction }) => {
                setSort({ direction, key: "test" });
              }}
            >
              Test
            </Table.Th>
            <Table.Th
              sort
              onClick={(_, { direction }) => {
                setSort({ direction, key: "username" });
              }}
            >
              Username
            </Table.Th>
          </Table.Tr>
        </Table.THead>
        <Table.TBody>
          {data.map(({ id, amount, hey, test, username }, i) => {
            return (
              <Table.Tr key={i}>
                <Table.Td>{id}</Table.Td>
                <Table.Td>{amount}</Table.Td>
                <Table.Td>{hey}</Table.Td>
                <Table.Td>{String(test).toUpperCase()}</Table.Td>
                <Table.Td>{username}</Table.Td>
              </Table.Tr>
            );
          })}
        </Table.TBody>
      </Table>
      <Input
        // label="Label"
        secondhelptext={{ value: "2nd Help text", error: true }}
        // floatingplaceholder={true}
        placeholder="Placeholder"
      />
      <Input.Number />
    </div>
  );
}

export default App;
