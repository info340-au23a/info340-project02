import React, { UseState } from "react";

import { NavBar } from "./NavBar";
import { HomeCardList } from "./HomeCard";
import { ListBuilderView } from "./ListBuilderView.js";
// import "../index.css";

const appViews =  [""]

export function App(props) {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main className="container">
        <HomeCardList />
      </main>
    </div>
  );
}
