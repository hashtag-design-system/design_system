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
      {/* TODO: Test `floatingplaceholder` Prop */}
      <Select placeholder="Placeholder" floatingplaceholder={false} inselect={(option: string) => console.log(option)}>
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
      <Slider
        marks={[
          { value: 0, label: "0" },
          { value: 10, label: "10" },
          // { value: 15, label: "15" },
          { value: 20, label: "20" },
          // { value: 25, label: "25" },
          { value: 30, label: "30" },
          // { value: 35, label: "35" },
          { value: 40, label: "40" },
          // { value: 45, label: "45" },
          { value: 50, label: "50" },
          // { value: 55, label: "55" },
          { value: 60, label: "60" },
          // { value: 65, label: "65" },
          { value: 70, label: "70" },
          // { value: 75, label: "75" },
          { value: 80, label: "80" },
          // { value: 85, label: "85" },
          { value: 90, label: "90" },
          // { value: 95, label: "95" },
          { value: 100, label: "100" },
        ]}
        // lockOnMarks
        max={100}
        zeroPercentageOnEdgeMarks
        chart={{
          type: "bar",
          data: [
            { value: 1 },
            { value: 1 },
            { value: 1 },
            { value: 1 },
            { value: 1 },
            { value: 1 },
            { value: 1 },
            { value: 1 },
            { value: 1 },
          ],
        }}
      />
    </div>
  );
}

export default App;
