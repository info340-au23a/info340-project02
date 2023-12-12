import React, { useState } from "react";
import { QuizComponent } from "./Quiz";
import { Footer } from "./Footer";
import { useParams, useNavigate } from "react-router";
import SearchFilter from './SearchFilter.js'

export function QuizPage(props) {
  // const { wordListData } = props.wordSets;
  // console.log('wordListData ', wordListData);
  const { wordListId } = useParams();
  const currentUser = props.currentUser;
  const navigate = useNavigate();

  const renderWordListButtons = () => {
    return props.wordSets.map((wordList) => (
      <div className="quiz-buttons-container" key={wordList.firebaseKey}>
        <button onClick={() => navigate(`/quiz/${wordList.firebaseKey}`)}>
          {wordList.title}
        </button>
      </div>
    ));
  };

  if (wordListId) {
    const selectedWordList = props.wordSets.find(list => list.firebaseKey === wordListId);
    if (!selectedWordList) {
      return <div>Quiz not found. Please select a different quiz.</div>;
    }
    return (
      <QuizComponent wordList={selectedWordList} currentUser={currentUser}/>
    );
  } else {
    console.log('props.wordSets Quiz', props.wordSets)
    // console.log(wordListData)
    console.log('tagsData:', props.tagsData);
    return (
      <main>
        <div className="quizHeader">
          <h1>Word Quiz</h1>
          <h2>How many correct answers could you get?</h2>
        </div>
        <SearchFilter
          wordSets={props.wordSets}
          tagsData={props.tagsData}
          applyFilterCallback={props.handleFilterApply}
        />
        {/* <div className="selector">
          <div className="searchTitle">
            Select a wordlist to test your knowledge
            {renderWordListButtons()}
          </div>
        </div> */}
        <Footer imageRef="Audio pronunciations provided by Brittanica.com" />
      </main>
    );
  }
}