import React from "react";
import { NavBar } from "./NavBar.js";
import { Footer } from "./Footer.js";
import { ListBuilderView } from "./ListBuilderView.js";

export function ListBuilderPage(props) {

  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main>
        <div>
          <h1>Word List Builder</h1>
          <h2>Build your own wordlist!</h2>
        </div>
        <ListBuilderView
          tagsData={props.tagsData}
          wordSets={props.wordSets}
          setWordSets={props.setWordSets}
        />
      </main>
      <Footer />
    </div>
  );
}
