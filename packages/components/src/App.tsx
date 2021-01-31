// TODO: Remove afterwards removing the <Checkbox /> label Prop
import React, { useEffect, useRef, useState } from "react";
import "./App.scss";
import Animated from "./components/Animated";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";
import Input from "./components/Input";
import Table from "./components/Table";
import { useSelectionInput } from "./utils/hooks";

// https://stackoverflow.com/questions/44497388/typescript-array-to-string-literal-type

type InitialDataType = {
  id: number;
  amount: number;
  hey: string;
  test: boolean;
  username: string;
};

const data: InitialDataType[] = [
  { id: 1, amount: 0.75, hey: "hey", test: true, username: "georgekrax" },
  { id: 2, amount: 1.0, hey: "hey", test: false, username: "me" },
  { id: 3, amount: 0.65, hey: "hey", test: false, username: "skg" },
  { id: 4, amount: 1.5, hey: "hey", test: true, username: "spoon" },
];

function App() {
  const [isChecked, setIsChecked] = useState(false);
  const { ref: selectionInputRef, onClick, inputs } = useSelectionInput("checkbox", 5);
  const ref = useRef<HTMLElement>(null);
  // console.log(inputs);

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.focus();
    }
  });

  return (
    <div className="App">
      {/* <Button pill onClick={() => setIsChecked(!isChecked)}> */}
      <button style={{ padding: "1em 2em" }} onClick={() => setIsChecked(true)}>
        Click me
      </button>
      <Button pill>Button</Button>
      <Table extraColumn={{ component: "checkbox", withBorderRight: true, totalRows: 5, selectedRows: row => console.log(row) }}>
        <Table.THead>
          <Table.Tr idx={0}>
            <Table.Th>ID</Table.Th>
            <Table.Th>Amount</Table.Th>
            <Table.Th>Hey</Table.Th>
            <Table.Th>Test</Table.Th>
            <Table.Th>Username</Table.Th>
          </Table.Tr>
        </Table.THead>
        <Table.TBody>
          {data.map(({ id, amount, hey, test, username }, i) => {
            return (
              <Table.Tr key={i} idx={i + 1}>
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
      <Checkbox
        // state="disabled|checked"
        // defaultChecked={true}
        checked={isChecked}
        onChange={e => setIsChecked(e.currentTarget.value === "true" ? false : true)}
        label={{
          value:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, voluptates. Doloremque nemo, earum corporis error eum vero nostrum nesciunt, reiciendis dolorum tempora vitae voluptatum reprehenderit nam fuga beatae temporibus dolores!",
        }}
      />
      {/* <div>
        <RadioButton
          checked={inputs[0].isChecked}
          onClick={onClick}
          ref={element => (selectionInputRef.current[0] = element)}
          label={{ value: "Label 1" }}
          // name="header"
        />
        <RadioButton
          checked={inputs[1].isChecked}
          onClick={onClick}
          ref={element => (selectionInputRef.current[1] = element)}
          label={{ value: "Label 2" }}
        />
        <RadioButton
          checked={inputs[2].isChecked}
          onClick={onClick}
          ref={element => (selectionInputRef.current[2] = element)}
          label={{ value: "Label 3" }}
        />
        <RadioButton
          checked={inputs[3].isChecked}
          onClick={onClick}
          ref={element => (selectionInputRef.current[3] = element)}
          label={{ value: "Label 4" }}
        />
        <RadioButton
          checked={inputs[4].isChecked}
          onClick={onClick}
          ref={element => (selectionInputRef.current[4] = element)}
          label={{ value: "Label 5" }}
        />
      </div> */}
      <div>
        <Checkbox
          state={inputs[0].state}
          checked={inputs[0].isChecked}
          onClick={onClick}
          ref={element => (selectionInputRef.current[0] = element)}
          label={{ value: "Label 1" }}
          name="header"
        />
        <Checkbox
          state={inputs[1].state}
          checked={inputs[1].isChecked}
          onClick={onClick}
          ref={element => (selectionInputRef.current[1] = element)}
          label={{ value: "Label 2" }}
        />
        <Checkbox
          state={inputs[2].state}
          checked={inputs[2].isChecked}
          onClick={onClick}
          ref={element => (selectionInputRef.current[2] = element)}
          label={{ value: "Label 3" }}
        />
        <Checkbox
          state={inputs[3].state}
          checked={inputs[3].isChecked}
          onClick={onClick}
          ref={element => (selectionInputRef.current[3] = element)}
          label={{ value: "Label 4" }}
        />
        <Checkbox
          state={inputs[4].state}
          checked={inputs[4].isChecked}
          onClick={onClick}
          ref={element => (selectionInputRef.current[4] = element)}
          label={{ value: "Label 5" }}
        />
      </div>
      <Animated.Loading.Dots />
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
