import React from "react";

import { NavBar } from "./NavBar";
import { HomeCardList } from "./HomeCard";

// import "../index.css";

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
