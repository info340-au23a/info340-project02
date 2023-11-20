import React from "react";

import { HomePage } from "./HomePage.js";
import { ListBuilderView } from "./ListBuilderView.js";
import { QuizComponent } from "./Quiz";
import { FlipCard } from "./FlipCard";

import "../index.css";

export function App(props) {
  return (
    <div>
      <HomePage />
      <QuizComponent />
        <FlipCard />
        <ListBuilderView />
    </div>
  );
}
