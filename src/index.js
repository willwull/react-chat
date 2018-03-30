import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import App from "./components/App";
import "./stylesheets/index.scss";

const root = document.getElementById("root");

ReactDOM.render(<App />, root);
registerServiceWorker();
