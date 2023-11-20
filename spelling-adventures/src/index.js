import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/App";
import "./components/data/words-data.json"

// import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
