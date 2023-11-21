import React from "react";
import { NavBar } from "./NavBar.js";
import { HomeCardList } from "./HomeCardList.js";

export function HomePage(props) {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main>
        <div className="welcome">
          <h1>
            Welcome to <img src="./img/logo.png" alt="Spelling Adventures" />
          </h1>
        </div>
        <HomeCardList />
      </main>
    </div>
  );
}
