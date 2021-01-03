/* spell-checker: disable */
// TODO: Remove afterwards removing the <Checkbox /> label Prop
import React, { useEffect, useRef } from "react";
import "./App.scss";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";
import Form from "./components/Form";
import Input from "./components/Input";
import Switch from "./components/Switch";

// https://stackoverflow.com/questions/44497388/typescript-array-to-string-literal-type

function App() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.focus();
    }
  });

  return (
    <div className="App">
      <Button pill>Button</Button>
      <Checkbox
        // incheck={isChecked => console.log(isChecked)}
        label={{
          value:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, voluptates. Doloremque nemo, earum corporis error eum vero nostrum nesciunt, reiciendis dolorum tempora vitae voluptatum reprehenderit nam fuga beatae temporibus dolores!",
        }}
      />
      <Switch />
      <Form onSubmit={d => console.log(d)} defaultValues={{ text: "georgerkax", number: 5 }}>
        <Input name="text" placeholder="Placeholder" floatingplaceholder={true} />
        <Input.Number name="number" state="default" />
        <Button type="submit">Submit</Button>
      </Form>
      <div>
        <Form.Header withBorder={false}>HEADER</Form.Header>
        <Form.Group>
          <Input.Number label="Label" state="default" />
        </Form.Group>
      </div>
    </div>
  );
}

export default App;
