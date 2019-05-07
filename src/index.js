import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import { App } from "./App";

process.versions.node = '10';

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
