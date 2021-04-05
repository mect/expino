import React from "react";
import ReactDOM from "react-dom";
import { THEMECOLOR } from "./variables";

import "./scss/style.scss";

import Switcher from "./components/switcher";

const App = function () {
  document.documentElement.style.setProperty("--bg-color", THEMECOLOR);

  return (
    <div>
      <Switcher />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#container"));
