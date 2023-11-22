import React from "react";
import { FlipCardList } from "./FlipCardList.js";
import { NavBar } from "./NavBar.js";
import { Footer } from "./Footer.js";

export function FlipCardPage(props) {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main>
        <div>
          <h1>Flip Cards</h1>
          <p>Practice your skills</p>
        </div>
        <FlipCardList flipCards={props.wordsData} />
      </main>
      <Footer />
    </div>
  );
}
