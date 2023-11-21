import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/App";
import WORDS_DATA from "./components/data/words-data.json";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App data={WORDS_DATA}/>);
