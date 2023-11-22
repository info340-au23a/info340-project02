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
        </div>
        <ListBuilderView tagsData={props.tagsData} />
      </main>
      <Footer />
    </div>
  );
}
