/* spell-checker: disable */
// TODO: Remove afterwards removing the <Checkbox /> label Prop
import React, { useEffect, useRef } from "react";
import "./App.scss";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";
import Input from "./components/Input";
import RadioButton from "./components/RadioButton";
import Select from "./components/Select";
import Switch from "./components/Switch";

// https://stackoverflow.com/questions/44497388/typescript-array-to-string-literal-type

function App() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref && ref.current) {
      console.log(ref.current);

      ref.current.focus();
    }
  });

  return (
    <div className="App">
      <RadioButton label={{ value: "Label" }} />
      <Button pill>Button</Button>
      <Checkbox
        // incheck={isChecked => console.log(isChecked)}
        label={{
          value:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, voluptates. Doloremque nemo, earum corporis error eum vero nostrum nesciunt, reiciendis dolorum tempora vitae voluptatum reprehenderit nam fuga beatae temporibus dolores!",
        }}
      />
      <Switch />
      {/* <Select multiSelectable={false} placeholder="Projects" onSelect={e => console.log(e)}> */}
      <Select defaultOpen multiSelectable mobileView placeholder="Projects" onSelect={items => console.log(items)}>
        <Select.Button style={{ width: "200px" }}>Project</Select.Button>
        <Select.Modal>
          <Select.Header value="header" />
          <Select.Filter placeholder="Filter" floatingplaceholder={false} />
          <Select.Options>
            <Select.Item id="hey_george">Hey george</Select.Item>
            <Select.Item id="amsterda,">
              Amsterdam<p>george</p>
            </Select.Item>
            <Select.Item id="georgekrax">georgekrax</Select.Item>
            <Select.Item id="georgekrax2">georgekrachropou;os</Select.Item>
            <Select.Item id="test_id">
              <strong>NL</strong>Amsterdam
            </Select.Item>
          </Select.Options>
          {/* </Select.Header> */}
        </Select.Modal>
      </Select>
      <RadioButton state="disabled|unchecked" label={{ value: "Label", position: "top" }} />
      <Input
        // label="Label"
        // helptext={{ value: "Help text" }}
        // secondhelptext={{ value: "2nd Help text" }}
        // characterLimit
        // maxLength={30}
        // state="disabled"
        placeholder="Placeholder"
        floatingplaceholder={false}
        // defaultValue="georgekraxt@gmail.com"
        // prefix="€"
        // prefix={<OpenEye />}
        // suffix="€"
        // suffix={<OpenEye />}
        // forwardref={ref}
      />
      {/* <Input.Password label="Label" placeholder="Password" /> */}
      {/* <Input.Multiline label="Label" placeholder="Multiline" onChange={e => console.log(e.target.value)} /> */}
      {/* <Input.IncrDcr state="default" /> */}
      {/* <Input.Digit state="error" /> */}
      {/* <Input.DigitSequence numberOfDigits={6} helptext={{ value: "george", icon: <OpenEye /> }} /> */}
      <Input.Number state="default" />
    </div>
  );
}

export default App;
