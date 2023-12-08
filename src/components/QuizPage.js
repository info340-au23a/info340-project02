import React, { useState } from "react";
import { QuizComponent } from "./Quiz";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

export function QuizPage(props) {
  const wordListData = props.data;
  const [selectedWordList, setSelectedWordList] = useState(null);

  const handleSelect = (wordList) => {
    setSelectedWordList(wordList.words);
  };

  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main>
        <div>
          <h1>Word Quiz</h1>
          <h2>How many correct answer could you get?</h2>
        </div>
        <div>
          <p className = "searchTitle">Select a wordlist to test your knowledge
              {wordListData.map((wordList) => (
                <div className="quiz-buttons-container">
                <button onClick={() => handleSelect(wordList)}
                key={wordList.wordSetTitle}>{wordList.wordSetTitle}
                </button>
                </div>
              ))}
          </p>
        </div>
        {selectedWordList && <QuizComponent data={selectedWordList} />}
      </main>
      <Footer imageRef="Audio pronunciations provided by Brittanica.com" />
    </div>
  );
}
