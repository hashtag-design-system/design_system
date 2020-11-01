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
      {/* <Input.IncrDcr max={100} /> */}
      <Input.Number prefix="Kg" placeholder="Quantity" />
      <Checkbox></Checkbox>
    </div>
  );
}

export default App;
