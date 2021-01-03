/* spell-checker: disable */
// TODO: Remove afterwards removing the <Checkbox /> label Prop
import React, { useEffect, useRef } from "react";
import "./App.scss";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";
import Input from "./components/Input";
import Pagination from "./components/Pagination";
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
      <Pagination
        totalPages={1}
        hideIfOne={false}
        // currentPage={2}
        // surroundingPageCount={3}
        // hrefBuilder={page => `https://georgekrax.com/${page}`}
        // onPageChanged={(_, page) => {
        //   console.log(page);

        //   // e.preventDefault();
        //   // console.log(page);
        // }}
      />
      <Input placeholder="Placeholder" floatingplaceholder={false} />
      <Input.Number state="default" />
    </div>
  );
}

export default App;
