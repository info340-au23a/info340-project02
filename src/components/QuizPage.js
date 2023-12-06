import React from "react";
import { QuizComponent } from "./Quiz";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import { SearchInput } from "./SearchFilter";

export function QuizPage(props) {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main>
        <div>
          <h1>Word Quiz</h1>
          <h2>How many can you answer correctly?</h2>
        </div>
        <div>
          <p className = "searchTitle">Start with a word list</p>
          <SearchInput />
        </div>
        <QuizComponent data={props.wordList} />
      </main>
      <Footer imageRef="Audio pronunciations provided by Brittanica.com" />
    </div>
  );
}
