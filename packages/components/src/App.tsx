// TODO: Remove afterwards removing the <Checkbox /> label Prop
import React, { useEffect, useRef, useState } from "react";
import "./App.scss";
import Animated from "./components/Animated";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";
import Input from "./components/Input";
import TimePicker from "./components/TimePicker";

// https://stackoverflow.com/questions/44497388/typescript-array-to-string-literal-type

function App() {
  const [isChecked, setIsChecked] = useState(false);
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
      <TimePicker
        bottomSheetProps={{
          isShown: isChecked,
          onDismiss: () => setIsChecked(false),
        }}
      >
        <TimePicker.Content showLabels={{ hasHours: true, hasMinutes: true, hasSeconds: true }}>
          <TimePicker.Hours inputProps={{ onFocus: () => console.log("focus"), onBlur: () => console.log("Blur") }} />
          <TimePicker.Minutes />
          <TimePicker.Seconds onSlideChange={swiper => console.log(swiper.realIndex)} />
        </TimePicker.Content>
      </TimePicker>
      {/* <BottomSheet defaultY={400} hugContentsHeight={false} isShown>
        <Dialog.Content>
          <Input placeholder="Hey" />
        </Dialog.Content>
      </BottomSheet> */}
      <Button pill>Button</Button>
      <Checkbox
        // state="disabled|checked"
        // defaultChecked={true}
        checked={isChecked}
        onChange={e => setIsChecked(e.currentTarget.value === "true" ? false : true)}
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
