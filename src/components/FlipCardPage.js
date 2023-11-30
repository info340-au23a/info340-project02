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
          <h2>Practice your skills</h2>
        </div>
        <FlipCardList flipCards={props.wordsData} />
      </main>
      <Footer imageRef="Flipcard sample photos originally from Pexels.com | 
      Audio pronunciations created by Brittanica.com" />
    </div>
  );
}