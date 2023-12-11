import React, { useState, useEffect } from "react";
import { getDatabase, ref as firebaseRef, onValue } from "firebase/database";

// result array that stores the answered questions
let resultArr = [];

function GenerateQuizCard(props) {
  const words = props.words;
  const setInputValue = props.setInput;
  const setMessage = props.setMessage;
  const index = props.index;

  const handleSoundClick = () => {
    if (words.audio) {
      const audio = new Audio(words.audio);
      audio.play();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.input === words.word) {
      resultArr.push(words.word);
      setMessage("You are awesome, keep going!");
    } else {
      setMessage("Oops, try it again.");
    }
  };

  return (
    <div className="quiz">
      <div key={index} className="quiz-card">
        <h2 style={{ fontSize: "24px" }}>
          <label htmlFor="">
            <p>Question {index + 1}: Listen to the audio and spell the word</p>
            <button
              className="fas"
              aria-label="Play Sound"
              onClick={() => handleSoundClick(index)}
            >
              &#xf028;
            </button>
          </label>
          <input id="word-input"
            value={props.input}
            onChange={(e) => setInputValue(e.target.value)}
            maxLength={words.word.length}
            aria-label="sound-button"
          />
        </h2>
      </div>

      <div className="quiz-submit">
        <button onClick={handleSubmit}>Submit</button>
        {props.message && <p>{props.message}</p>}
      </div>
    </div>
  );
}

export function QuizComponent(props) {
  const { wordList } = props;
  const { words, title, authorUID } = wordList;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");
  const [authorName, setAuthorName] = useState("Loading...");

  console.log("props.data");
  console.log(wordList);

  console.log(authorUID);

  useEffect(() => {
    if (authorUID) {
      const db = getDatabase();
      const authorRef = firebaseRef(db, `users/${authorUID}`);
      console.log("authorRef: " + authorRef);

      onValue(
        authorRef,
        (snapshot) => {
          const userData = snapshot.val();
          if (userData && userData.displayName) {
  
            setAuthorName(userData.displayName);
          } else {

            setAuthorName("Unknown");
          }
        },
        {
          onlyOnce: true,
        }
      );

    } else {

      setAuthorName("Unknown");
    }
  }, [authorUID]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setInputValue("");
      setMessage("");
    }
  };

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setInputValue("");
      setMessage("");
    }
  };

  const handleFinishQuiz = () => {
    alert("Quiz Finished!");
  };

  return (
    <div className="quiz-container">
            <div className="quiz-sidebar">
        <QuizSidebar
          wordListTitle={title}
          authorName={authorName}
          currentQuestion={currentIndex}
          totalQuestions={words.length}
        />
      </div>
      <GenerateQuizCard
        words={words[currentIndex]}
        input={inputValue}
        setInput={setInputValue}
        message={message}
        setMessage={setMessage}
        index={currentIndex}
      />
      <div className="quiz-buttons-container">
        <div className="quiz-last">
          {currentIndex > 0 && (
            <button onClick={handlePrevious}>&#8592;</button>
          )}
        </div>
        <div className="quiz-next">
          {currentIndex < words.length - 1 && (
            <button onClick={handleNext}>&#8594;</button>
          )}
          {currentIndex === words.length - 1 && (
            <button onClick={handleFinishQuiz}>Finish</button>
          )}
        </div>
      </div>


    </div>
  );
}

function QuizSidebar({ wordListTitle, authorName, currentQuestion, totalQuestions}) {
  console.log("wordlistname: " + wordListTitle)
  return (
    <div className="sidebar">
      <h3>Quiz: {wordListTitle}</h3>
      <p>Author: {authorName}</p>
      <p>
        Progress: {currentQuestion + 1} / {totalQuestions}
      </p>
    </div>
  );
}