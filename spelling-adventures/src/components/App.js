import React from "react";

import { NavBar } from "./NavBar";
import { HomeCardList } from "./HomeCard";
import { ListBuilderView } from "./ListBuilderView.js";
import { QuizComponent } from "./Quiz";
import { FlipCard } from "./FlipCard";


import "../index.css";

export function App(props) {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main>
      <div className="welcome">
        <h1>Welcome to <img src="/img/logo.png" alt="Spelling Adventures"/></h1>
      </div>
        <HomeCardList />
        <FlipCard />
        <QuizComponent data={props.data}/>
        <ListBuilderView />
      </main>
    </div>
  );
}
