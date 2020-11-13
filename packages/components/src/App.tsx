/* spell-checker: disable */
// TODO: Remove afterwards removing the <Checkbox /> label Prop
import React from "react";
import "./App.scss";
import Checkbox from "./components/Checkbox";
import RadioButton from "./components/RadioButton";
import Select from "./components/Select";
import Switch from "./components/Switch";
import Option from "./components/__helpers__/Dropdown/Option";

// https://stackoverflow.com/questions/44497388/typescript-array-to-string-literal-type

function App() {
  return (
    <div className="App">
      {/* <Input.Number prefix="Kg" placeholder="Quantity" /> */}
      <Checkbox
        label={{
          value:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, voluptates. Doloremque nemo, earum corporis error eum vero nostrum nesciunt, reiciendis dolorum tempora vitae voluptatum reprehenderit nam fuga beatae temporibus dolores!",
        }}
      />
      {/* TODO: Configure the Todo Tree extension */}
      <RadioButton label={{ value: "Label" }} />
      <Switch insideText={{ value: "georgekrax", position: "right" }} label={{ value: "Label", position: "left" }} />
      <Select
        inselect={(option: string) => console.log(option)}
        placeholder="Placeholder"
        label="Label"
        floatingPlaceholder={false}
        helptext={{ value: "Help text" }}
        secondhelptext={{ value: "2nd Help text" }}
      >
        <Option value="amsterdam">Amsterdam</Option>
        <Option value="colombia">Colombia</Option>
        <Option value="north_korea">North Korea</Option>
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
