import React from "react";
import ReactDOM from "react-dom";
import { THEMECOLOR, TICKER_SIZE } from "./variables";

import "./scss/style.scss";

import Switcher from "./components/switcher";

const App = function () {
  document.documentElement.style.setProperty("--bg-color", THEMECOLOR);
  if (TICKER_SIZE) {
    document.documentElement.style.setProperty("--ticker-size", TICKER_SIZE);
  }

  return (
    <div>
      <Switcher />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#container"));
