import React from "react";
import { QuizComponent } from "./Quiz";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

export function QuizPage(props) {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main>
        <div>
            <h1>Word Quiz</h1>
            <p>How many can you guess correctly?</p>
        </div>
        <QuizComponent data={props.wordList} />
      </main>
      <Footer />
    </div>
  );
}