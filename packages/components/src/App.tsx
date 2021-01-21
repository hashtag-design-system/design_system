/* spell-checker: disable */
// TODO: Remove afterwards removing the <Checkbox /> label Prop
import React, { useEffect, useRef, useState } from "react";
import "./App.scss";
import Animated from "./components/Animated";
import BottomSheet from "./components/BottomSheet";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";
import Dialog from "./components/Dialog";
import Input from "./components/Input";

// https://stackoverflow.com/questions/44497388/typescript-array-to-string-literal-type

function App() {
  const [isChecked, setIsChecked] = useState(true);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.focus();
    }
  });

  return (
    <div className="App">
      {/* <Button pill onClick={() => setIsChecked(!isChecked)}> */}
      <button style={{ padding: "1em 2em" }} onClick={() => setIsChecked(true)}>
        Click me
      </button>
      <Button pill>Button</Button>
      {/* <BottomSheet isShown={isChecked} onDismiss={() => setIsChecked(false)}> */}
      <BottomSheet
        isShown={isChecked}
        onDismiss={() => {
          console.log("hey");

          setIsChecked(false);
        }}
        onChange={(e, info) => console.log(e, info)}
        // state="expanded"
        // allowedPositions={{ expanded: true, middle: false }}
      >
        {({ dismiss }) => (
          <>
            <BottomSheet.ScrollBar />
            <Dialog.Content>
              {/* <div style={{ maxHeight: "100px", overflow: "scroll" }}> */}
              <div style={{ maxHeight: "100px", overflow: "hidden" }}>
                georgekraxfsdsfd<p>dfdfd</p>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
              </div>
              <Button pill onClick={async () => await dismiss()}>
                Button
              </Button>
            </Dialog.Content>
          </>
        )}
      </BottomSheet>
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
