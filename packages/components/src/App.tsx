import React from "react";
import "./App.scss";
import Button from "./components/Button";
import Input from "./components/Input";

// https://stackoverflow.com/questions/44497388/typescript-array-to-string-literal-type

function App() {
  return (
    <div className="App">
      <Button>Login</Button>
      <Input maxLength={5} />
      <Input.IncrDcr />
    </div>
  );
}

export default App;
