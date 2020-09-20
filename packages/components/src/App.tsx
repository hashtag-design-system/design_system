import React from "react";
import "./App.scss";
import Button from "./components/Button/Button";

function App() {
  return (
    <div className="App">
      <Button onClick={() => console.log("clicked")}>Hey me</Button>
    </div>
  );
}

export default App;
