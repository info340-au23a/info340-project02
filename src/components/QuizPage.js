import React, { useState } from "react";
import { QuizComponent } from "./Quiz";
import { Footer } from "./Footer";

export function QuizPage(props) {
  const wordListData = props.data;
  const [selectedWordList, setSelectedWordList] = useState(null);

  const handleSelect = (wordList) => {
    console.log("Wordlist.words: ");
    console.log(wordList);
    setSelectedWordList(wordList);
  };

  const goBack = () => {
    setSelectedWordList(null);
  };

  const renderWordListButtons = () => {
    return wordListData.map((wordList) => (
      <div className="quiz-buttons-container" key={wordList.title}>
        <button onClick={() => handleSelect(wordList)}>{wordList.title}</button>
      </div>
    ));
  };

  if (!wordListData) {
    return <div>Loading data...</div>;
  }

  return (
    <>
      <main>
        <div className="quizHeader">
          <h1>Word Quiz</h1>
          <h2>How many correct answers could you get?</h2>
        </div>
        {selectedWordList ? (
          <div className="quizPageContainer">
            <div className="exitButtonContainer">
              <button className="exitButton" onClick={goBack}>
                &#x2715; Exit Quiz
              </button>
            </div>
            <QuizComponent wordList={selectedWordList} />
          </div>
        ) : (
          <div className="selector">
            <div className="searchTitle">
              Select a wordlist to test your knowledge
              {renderWordListButtons()}
            </div>
          </div>
        )}
      </main>
      <Footer imageRef="Audio pronunciations provided by Brittanica.com" />
    </>
  );
}
