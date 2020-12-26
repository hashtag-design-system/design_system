/* spell-checker: disable */
// TODO: Remove afterwards removing the <Checkbox /> label Prop
import React, { useEffect, useRef } from "react";
import "./App.scss";
import Checkbox from "./components/Checkbox";
import Input from "./components/Input";
import RadioButton from "./components/RadioButton";
import Slider from "./components/Slider";
import Switch from "./components/Switch";

// https://stackoverflow.com/questions/44497388/typescript-array-to-string-literal-type

function App() {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.focus();
    }
  });

  return (
    <div className="App">
      {/* <Button pill>Button</Button> */}
      <Checkbox
        incheck={isChecked => console.log(isChecked)}
        label={{
          value:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, voluptates. Doloremque nemo, earum corporis error eum vero nostrum nesciunt, reiciendis dolorum tempora vitae voluptatum reprehenderit nam fuga beatae temporibus dolores!",
        }}
      />
      <Switch state="disabled|off" />
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
      <Slider.Double
        marks={[
          { value: 0 },
          { value: 10 },
          { value: 20 },
          { value: 30 },
          { value: 40 },
          { value: 50 },
          { value: 60 },
          { value: 70 },
          { value: 80 },
          { value: 90 },
          { value: 100 },
        ]}
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
      <RadioButton state="disabled|unchecked" label={{ value: "Label", position: "top" }} />
      <Input
        label="Label"
        helptext={{ value: "Help text" }}
        secondhelptext={{ value: "2nd Help text" }}
        characterLimit
        maxLength={30}
        // state="disabled"
        placeholder="Placeholder"
        floatingplaceholder={true}
        // defaultValue="georgekraxt@gmail.com"
        // prefix="€"
        // prefix={<OpenEye />}
        // suffix="€"
        // suffix={<OpenEye />}
        // forwardref={ref}
      />
      <Input.Password label="Label" placeholder="Password" />
      {/* <Input.Multiline label="Label" placeholder="Multiline" onChange={e => console.log(e.target.value)} /> */}
      {/* <Input.IncrDcr state="default" /> */}
      {/* <Input.Digit state="error" /> */}
      {/* <Input.DigitSequence numberOfDigits={6} helptext={{ value: "george", icon: <OpenEye /> }} /> */}
      <Input.Number state="default" />
    </div>
  );
}

export default App;
