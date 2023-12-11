import React, { useState } from "react";
import { QuizComponent } from "./Quiz";
import { Footer } from "./Footer";
import { useParams, useNavigate } from "react-router";
// Navigate, useNavigate } from "react-router";

export function QuizPage(props) {
  const { wordListId } = useParams();
  const currentUser = props.currentUser;
  const navigate = useNavigate();
  const wordListData = props.data;

  const renderWordListButtons = () => {
    return wordListData.map((wordList) => (
      <div className="quiz-buttons-container" key={wordList.firebaseKey}>
        <button onClick={() => navigate(`/quiz/${wordList.firebaseKey}`)}>
          {wordList.title}
        </button>
      </div>
    ));
  };
  // const [selectedWordList, setSelectedWordList] = useState(null);

  // const handleSelect = (wordList) => {
  //   console.log("Wordlist.words: ", wordList);
  //   // setSelectedWordList(wordList);
  //   // handleSelectWordList()
  // };

  // const handleSelectWordList = (wordSetKey) => {
  //   navigate(`/quiz/${wordSetKey}`);
  // };

  // if (!wordListData) {
  //   return <div>Loading data...</div>;
  // }

  //   const goBack = () => {
  //     setSelectedWordList(null);
  //   };

  if (wordListId) {
    // "Quiz mode" - Display the quiz component for the selected word list
    const selectedWordList = wordListData.find(list => list.firebaseKey === wordListId);
    if (!selectedWordList) {
      return <div>Quiz not found. Please select a different quiz.</div>;
    }
    return (
      <QuizComponent wordList={selectedWordList} currentUser={currentUser}/>
    );
  } else {
    // "Selection mode" - Display word list selection buttons
    return (
      <main>
        <div className="quizHeader">
          <h1>Word Quiz</h1>
          <h2>How many correct answers could you get?</h2>
        </div>
        <div className="selector">
          <div className="searchTitle">
            Select a wordlist to test your knowledge
            {renderWordListButtons()}
          </div>
        </div>
        <Footer imageRef="Audio pronunciations provided by Brittanica.com" />
      </main>
    );
  }
}