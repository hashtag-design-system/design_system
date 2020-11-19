/* spell-checker: disable */
// TODO: Remove afterwards removing the <Checkbox /> label Prop
import React from "react";
import "./App.scss";
import Checkbox from "./components/Checkbox";
import Dropdown from "./components/Dropdown";
import Input from "./components/Input";
import RadioButton from "./components/RadioButton";
import Select from "./components/Select";

// https://stackoverflow.com/questions/44497388/typescript-array-to-string-literal-type

const options = [
  { value: "amsterdam", label: "George Krachtopoulos frff rwf rfw rfwrff r frf f rrf fwrf f ff ffjdkfjjfkdsjfk" },
  { value: "colombia", label: "Colombia" },
  { value: "sweden", label: "Sweden" },
  { value: "sweden", label: "Sweden" },
  { value: "sweden", label: "Sweden" },
  { value: "sweden", label: "Sweden" },
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
          <Dropdown.Hr />
          <Dropdown.Item id="hey">hey</Dropdown.Item>
        </Dropdown.OptionsBox>
      </Select>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum ullam magni, impedit facilis asperiores facere mollitia harum
        nihil consequatur cumque? Magni voluptatum iste saepe commodi laudantium, aut libero natus reiciendis distinctio voluptate. Ab
        eveniet sapiente voluptas impedit odit, at repudiandae aliquid quia sit, error est nobis. Ea fuga tempora culpa.
      </p>
    </div>
  );
}

export default App;
