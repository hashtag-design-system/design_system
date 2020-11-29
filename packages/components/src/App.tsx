/* spell-checker: disable */
// TODO: Remove afterwards removing the <Checkbox /> label Prop
import React from "react";
import "./App.scss";
import Checkbox from "./components/Checkbox";
import Dropdown from "./components/Dropdown";
import Input from "./components/Input";
import RadioButton from "./components/RadioButton";
import Select from "./components/Select";
import Slider from "./components/Slider";

// https://stackoverflow.com/questions/44497388/typescript-array-to-string-literal-type

const options = [
  { value: "amsterdam", label: "George Krachtopoulos frff rwf rfw rfwrff r frf f rrf fwrf f ff ffjdkfjjfkdsjfk" },
  { value: "colombia", label: "Colombia" },
  { value: "sweden", label: "Sweden" },
];

function App() {
  return (
    <div className="App">
      <Checkbox
        label={{
          value:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, voluptates. Doloremque nemo, earum corporis error eum vero nostrum nesciunt, reiciendis dolorum tempora vitae voluptatum reprehenderit nam fuga beatae temporibus dolores!",
        }}
      />
      {/* TODO: Configure the Todo Tree extension */}
      <RadioButton label={{ value: "Label" }} />
      <Input placeholder="Placeholder" inchange={value => console.log(value)} />
      <Select
        helptext={{ value: "hey" }}
        label="Label"
        placeholder="Placeholder"
        floatingplaceholder={false}
        inselect={(option: string) => console.log(option)}
      >
        <Dropdown.OptionsBox maxHeight={150}>
          {options.map((option, i) => (
            <Dropdown.Item key={i} id={option.value}>
              {option.label}
            </Dropdown.Item>
          ))}
          <Dropdown.ItemGroup value="Group name">
            <Dropdown.Item id="hey">hey</Dropdown.Item>
            <Dropdown.Item id="hey">hey</Dropdown.Item>
          </Dropdown.ItemGroup>
        </Dropdown.OptionsBox>
      </Select>
      <Slider />
      <Input.Multiline placeholder="Placeholder" />
    </div>
  );
}

export default App;
