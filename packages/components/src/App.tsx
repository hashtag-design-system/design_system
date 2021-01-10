/* spell-checker: disable */
// TODO: Remove afterwards removing the <Checkbox /> label Prop
import React, { useEffect, useRef, useState } from "react";
import "./App.scss";
import Animated from "./components/Animated";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";
import Dialog from "./components/Dialog";
import Input from "./components/Input";
import Switch from "./components/Switch";

// https://stackoverflow.com/questions/44497388/typescript-array-to-string-literal-type

function App() {
  const [isChecked, setIsChecked] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const [isShown, setIsShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      {/* <Switch insideText={{ value: "hedcsdfsdffsfdsdy", position: "toggle" }} />
      <Switch /> */}
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
      <Switch />
      <Button onClick={() => setIsShown(true)}>Click me</Button>
      <Dialog
        loading={isLoading}
        allowDismissOnLoading={true}
        isShown={isShown}
        overlayProps={{ bgColor: "light" }}
        onDismiss={(e, { cancel }) => {
          if (!cancel) {
            setIsLoading(true);
            setTimeout(() => {
              setIsShown(false);
              setIsLoading(false);
            }, 2000);
          } else {
            if (!cancel) {
              setIsLoading(true);
              setTimeout(() => {
                setIsShown(false);
                setIsLoading(false);
              }, 2000);
            } else {
              if (true) {
                setIsShown(false);
              }
            }
          }
        }}
      >
        <Dialog.Btn.Close />
        <Dialog.Content>
          {/* <Dialog.Title>Are you sure you want to cancel your reservation?</Dialog.Title> */}
          <Dialog.Title>
            Dialog content here. Dialog content here. Dialog content here. Dialog content here. Dialog content here. Dialog content
            here. Dialog content here. Dialog content here. Dialog content here.
          </Dialog.Title>
        </Dialog.Content>
        <Dialog.Btn.Group>
          <Dialog.Btn>Cancel</Dialog.Btn>
          <Dialog.Btn confirm>Confirm</Dialog.Btn>
        </Dialog.Btn.Group>
      </Dialog>
      <Animated.Loading.Dots />
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
