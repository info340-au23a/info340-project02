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

  const goBack = () => {
    setSelectedWordList(null);
  };

  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main>
        <div>
          <h1>Word Quiz</h1>
          <h2>How many correct answers could you get?</h2>
        </div>
        {selectedWordList ? (
          <div>
            <button className = "exitButton"onClick={goBack}>Exit Quiz</button>
            <QuizComponent data={selectedWordList} />
          </div>
        ) : (
          <div className="selector">
            <div className="searchTitle">
              Select a wordlist to test your knowledge
              {wordListData.map((wordList) => (
                <div className="quiz-buttons-container" key={wordList.wordSetTitle}>
                  <button onClick={() => handleSelect(wordList)}>
                    {wordList.wordSetTitle}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer imageRef="Audio pronunciations provided by Brittanica.com" />
    </div>
  );
}
