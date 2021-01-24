import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import toObject from "dayjs/plugin/toObject";
import minMax from "dayjs/plugin/minMax";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

dayjs.extend(isToday);
dayjs.extend(toObject);
dayjs.extend(minMax);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
