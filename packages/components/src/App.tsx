import "@hashtag-design-system/primitives/src/globals.scss";
import React, { useEffect, useRef, useState } from "react";
import Animated from "./components/Animated";
import BottomSheet from "./components/BottomSheet";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";
import ConfigProvider, { ConfigProviderFProps } from "./components/ConfigProvider";
import CreditCard from "./components/CreditCard";
import Dialog from "./components/Dialog";
import Form from "./components/Form";
import Input from "./components/Input";
import RadioButton from "./components/RadioButton";
import Switch from "./components/Switch";
import Table from "./components/Table";
import "./index.scss";
import { useSelectionInput } from "./utils";

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
  const { ref: selectionInputRef, onClick, inputs } = useSelectionInput({
    type: "radio",
    inputsLength: 5,
    defaultChecked: [true, true],
  });
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.focus();
    }
  });

  return (
    <div className="App">
      <ConfigProvider<ConfigProviderFProps<{ hey: string }>> colors={{ hey: "50" }}>
        <RadioButton onValue={val => console.log(val)} />
        <Switch />
        <Input.Number placeholder="Month" floatingplaceholder none onChange={e => console.log(e.target.value)} />
        <Input.Multiline placeholder="Month" floatingplaceholder onChange={e => console.log(e.target.value)} />
        <Dialog isShown={false} overlayProps={{ background: { color: "light" } }}>
          <Dialog.Btn.Close />
          <Dialog.Content>
            {/* <Dialog.Title>Are you sure you want to cancel your reservation?</Dialog.Title> */}
            <Dialog.Title>
              Dialog content here. Dialog content here. Dialog content here. Dialog content here. Dialog content here. Dialog content
              here. Dialog content here. Dialog content here. Dialog content here.
            </Dialog.Title>
          </Dialog.Content>
          <Dialog.Btn.Group>
            <Dialog.Btn>Cancel</Dialog.Btn>
            <Dialog.Btn confirm>Confirm</Dialog.Btn>
          </Dialog.Btn.Group>
        </Dialog>
        <div
          style={{
            width: "fit-content",
            height: "fit-content",
            padding: "1em",
            background: "linear-gradient(to right, #ec008c, #fc6767)",
          }}
        >
          <CreditCard brand="AMEX" creditNum="8878" ownerName="George Krachtopoulos" expirationDate="03/22" />
        </div>
        <Form.Group as="form">
          <Input
            label="Label"
            placeholder="Password"
            secondhelptext={{ value: undefined, error: true }}
            // floatingplaceholder={true}
            forwardref={ref}
          />
        </Form.Group>
        <Button variant="secondary">Click me</Button>
        {/* <Autosuggest onChange={value => console.log(value)} placeholder="Filter"> */}
        {/* <Select.Item id="hey_george" content="Hey_george" htmlContent={{ after: <div>Hey</div> }} />
        <Select.Item id="amsterdamgeorge" content="Amsterdam george" />
        <Select.Item id="amsterdam" content="Amsterdam" />
        <Select.Item id="hey" content="Hey" />
        <Select.Item id="me" content="Me" />
        <Select.Item id="me2" content="Me2" /> */}
        {/* <Select.Countries /> */}
        {/* <Select.Item id="georgekrax4" content="Me3" />
            <Select.Item id="georgekrax4" content="Me3" />
            <Select.Item id="georgekrax5" content="Me4" />
            <Select.Item id="georgekrax6" content="Me5" />
            <Select.Item id="georgekrax7" content="Me7" />
            <Select.Item id="georgekrax8" content="Me8" />
            <Select.Item id="georgekrax9" content="Me9" /> */}
        {/* </Autosuggest> */}
        <Button pill>Button</Button>
        <form>
          <Input.Number defaultValue={0} onChange={e => console.log(e.target.value)} />
          <Input.IncrDcr onValue={e => console.log(e)} />
          <button type="submit">Submit</button>
        </form>
        {/* <BottomSheet isShown={isChecked} hugContentsHeight={false} onDismiss={() => setIsChecked(false)}>
          {({ dismiss }) => (
            <>
              <Button onClick={async () => await dismiss()}>Click me</Button>
              <div>hey</div>
              <div>hey</div>
              <div>hey</div>
            </>
          )}
        </BottomSheet> */}
        <BottomSheet isShown={isChecked} onDismiss={() => setIsChecked(false)}>
          {({ dismiss }) => (
            <Dialog.Content>
              <Button onClick={async () => await dismiss()}>Button</Button>
              <Button onClick={async () => await dismiss()}>Button</Button>
              <Button onClick={async () => await dismiss()}>Button</Button>
              <Button onClick={async () => await dismiss()}>Button</Button>
              <Button onClick={async () => await dismiss()}>Button</Button>
              <Button onClick={async () => await dismiss()}>Button</Button>
              <Button onClick={async () => await dismiss()}>Button</Button>
              <Button onClick={async () => await dismiss()}>Button</Button>
            </Dialog.Content>
          )}
        </BottomSheet>
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
              /* cspell: disable-next-line */
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, voluptates. Doloremque nemo, earum corporis error eum vero nostrum nesciunt, reiciendis dolorum tempora vitae voluptatum reprehenderit nam fuga beatae temporibus dolores!",
          }}
        />
        <div>
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
        </div>
        {/* <div>
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
      </div> */}
        <Animated.Loading.Dots />
      </ConfigProvider>
    </div>
  );
}

export default App;
