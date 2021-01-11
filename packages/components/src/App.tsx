/* spell-checker: disable */
// TODO: Remove afterwards removing the <Checkbox /> label Prop
import React, { useEffect, useRef, useState } from "react";
import "./App.scss";
import Animated from "./components/Animated";
import Autosuggest from "./components/Autosuggest";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";
import Input from "./components/Input";
import Select from "./components/Select";

// https://stackoverflow.com/questions/44497388/typescript-array-to-string-literal-type

function App() {
  const [isChecked, setIsChecked] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.focus();
    }
  });

  return (
    <div className="App">
      <Button pill onClick={() => setIsChecked(!isChecked)}>
        Button
      </Button>
      <Autosuggest placeholder="Filter" />
      <Select placeholder="Projects" onSelect={items => console.log(items)}>
        <Select.Button style={{ width: "200px" }}>Project</Select.Button>
        <Select.Modal>
          <Select.Header value="header">
            <Select.Filter placeholder="Filter" floatingplaceholder={false} />
            <Select.Options>
              <Select.Item id="hey_george" content="Hey_george" />
              <Select.Item id="amsterdam" content="Amsterdam george" />
              <Select.Item id="amsterdamstrong" content="Amsterdam" />
              <Select.Item id="georgekrax" content="Hey" />
              <Select.Item id="georgekrax2" content="Me" />
              <Select.Item id="georgekrax3" content="Me3" />
              <Select.Item id="georgekrax4" content="Me4" />
              <Select.Item id="georgekrax5" content="Me5" />
              <Select.Item id="georgekrax6" content="Me6" />
              <Select.Item id="georgekrax7" content="Me7" />
              <Select.Item id="georgekrax8" content="Me8" />
            </Select.Options>
          </Select.Header>
        </Select.Modal>
      </Select>
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
      <Animated.Loading.Dots />
      {/* <Input
        // label="Label"
        secondhelptext={{ value: "2nd Help text", error: true }}
        // floatingplaceholder={true}
        placeholder="Placeholder"
      /> */}
      <Input.Number />
    </div>
  );
}

export default App;
