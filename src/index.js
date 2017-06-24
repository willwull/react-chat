import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import App from "./components/App";
import "./stylesheets/index.css";

var root = document.getElementById("root");
var fullscreen = root.dataset.fullscreen;

ReactDOM.render(
  <App fullscreen={fullscreen} />,
  document.getElementById("root")
);
registerServiceWorker();
