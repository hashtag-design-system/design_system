import React from "react";
import "./App.scss";
import Checkbox from "./components/Checkbox";
import Input from "./components/Input";

// https://stackoverflow.com/questions/44497388/typescript-array-to-string-literal-type

function App() {
  return (
    <div className="App">
      {/* <Button>Login</Button> */}
      <Input placeholder="hey" />
      <Input.IncrDcr />
      <Input.Number prefix="Kg" placeholder="Quantity" />
      <Checkbox
        label={{
          value:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, voluptates. Doloremque nemo, earum corporis error eum vero nostrum nesciunt, reiciendis dolorum tempora vitae voluptatum reprehenderit nam fuga beatae temporibus dolores!",
        }}
      />
      <Checkbox label={{ value: "Pay here", position: "right" }} />
    </div>
  );
}

export default App;
