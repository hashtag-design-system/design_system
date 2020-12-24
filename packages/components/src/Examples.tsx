import React, { useEffect } from "react";
import Checkbox from "./components/Checkbox";
import Dropdown from "./components/Dropdown";
import RadioButton from "./components/RadioButton";
import Select from "./components/Select";
import Slider from "./components/Slider";

const options = [
  { value: "amsterdam", label: "Amsterdam" },
  { value: "colombia", label: "Colombia" },
  { value: "sweden", label: "Sweden" },
];

const Examples: React.FC = () => {
  const loadData = async () => {
    const res = await fetch("http://ip-api.com/json/");
    const data = await res.json();
    console.log(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Checkbox
        label={{
          value:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, voluptates. Doloremque nemo, earum corporis error eum vero nostrum nesciunt, reiciendis dolorum tempora vitae voluptatum reprehenderit nam fuga beatae temporibus dolores!",
        }}
      />
      <RadioButton label={{ value: "Label" }} />
      <Select placeholder="Placeholder" floatingplaceholder={true}>
        <Dropdown.OptionsBox maxHeight={150}>
          {options.map((option, i) => (
            <Dropdown.Item key={i} id={option.value}>
              {option.label}
            </Dropdown.Item>
          ))}
          <Dropdown.ItemGroup title="Group name">
            <Dropdown.Item id="hey">hey</Dropdown.Item>
            <Dropdown.Item id="hey">hey</Dropdown.Item>
          </Dropdown.ItemGroup>
        </Dropdown.OptionsBox>
      </Select>
      <Slider
        marks={[
          { value: 0, label: "0" },
          { value: 10, label: "10" },
          { value: 20, label: "20" },
          { value: 30, label: "30" },
          { value: 40, label: "40" },
          { value: 50, label: "50" },
          { value: 60, label: "60" },
          { value: 70, label: "70" },
          { value: 80, label: "80" },
          { value: 90, label: "90" },
          { value: 100, label: "100" },
        ]}
        lockOnMarks
        zeroPercentageOnEdgeMarks
        chart={{
          type: "bar",
          data: [
            { value: 1 },
            { value: 2 },
            { value: 3 },
            { value: 4 },
            { value: 5 },
            { value: 6 },
            { value: 7 },
            { value: 8 },
            { value: 9 },
            { value: 10 },
          ],
        }}
      />
    </div>
  );
};
