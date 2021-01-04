/* spell-checker: disable */
// TODO: Remove afterwards removing the <Checkbox /> label Prop
import React, { useEffect, useRef, useState } from "react";
import "./App.scss";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";
import Dialog from "./components/Dialog";
import Input from "./components/Input";

// https://stackoverflow.com/questions/44497388/typescript-array-to-string-literal-type

function App() {
  const [isShown, setIsShown] = useState(false);
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
      <Button onClick={() => setIsShown(true)}>Click me</Button>
      <Dialog isShown={isShown} bgColor="light" onDismiss={() => setIsShown(false)}>
        <Dialog.Btn.Close />
        <Dialog.Content>
          {/* <Dialog.Title>Are you sure you want to cancel your reservation?</Dialog.Title> */}
          <Dialog.Title>
            Dialog content here. Dialog content here. Dialog content here. Dialog content here. Dialog content here. Dialog content
            here. Dialog content here. Dialog content here. Dialog content here.
          </Dialog.Title>
        </Dialog.Content>
        <Dialog.Btn.Group>
          <Dialog.Btn variant="secondary">Cancel</Dialog.Btn>
          <Dialog.Btn>Confirm</Dialog.Btn>
        </Dialog.Btn.Group>
      </Dialog>
      <Input
        // label="Label"
        secondhelptext={{ value: "2nd Help text", error: true }}
        // floatingplaceholder={true}
        placeholder="Placeholder"
      />
      <Input.Number />
    </div>
  );
}

export default App;
