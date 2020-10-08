import React from "react";
import "./App.scss";
import Button from "./components/Button";
import Input from "./components/Input";

// https://stackoverflow.com/questions/44497388/typescript-array-to-string-literal-type

function App() {
  return (
    <div className="App">
      <Button>Login</Button>
      <Input state="disabled" placeholder="Email" />
      <Input.Multiline state="disabled" placeholder="Write here..." />
    </div>
  );
}

export default App;
