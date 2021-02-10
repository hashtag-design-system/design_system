import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Components
export * from "./components/Animated";
export * from "./components/Autosuggest";
export * from "./components/BottomSheet";
export * from "./components/Button";
export * from "./components/Checkbox";
export * from "./components/CreditCard";
export * from "./components/DatePicker";
export * from "./components/Dialog";
export * from "./components/Dropdown";
export * from "./components/Form";
export * from "./components/Input";
export * from "./components/Pagination";
export * from "./components/RadioButton";
export * from "./components/Select";
export * from "./components/Slider";
export * from "./components/Switch";
export * from "./components/Table";
export * from "./components/TimePicker";
export * from "./components/__helpers__";
export * from "./components/ConfigProvider";

// Config
export * from "./config";

// Utils
export * from "./utils";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
