import React, { useState, useEffect } from "react";
import { getDatabase, ref as firebaseRef, onValue } from "firebase/database";

function QuizSidebar({
  wordListName,
  authorName,
  currentQuestion,
  totalQuestions,
}) {
  return (
    <div className="sidebar">
      <h3>{wordListName}</h3>
      <p>Author: {authorName}</p>
      <p>
        Progress: {currentQuestion + 1} / {totalQuestions}
      </p>
    </div>
  );
}

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
          <label htmlFor="word-input">
            <p>Question {index + 1}: Listen to the audio and spell the word</p>
            <button
              className="fas"
              aria-label="Play Sound"
              onClick={() => handleSoundClick(index)}
            >
              &#xf028;
            </button>
          </label>
          <input
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
  const { words, wordListName, authorUID } = wordList;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");
  const [authorName, setAuthorName] = useState("Loading...");

  console.log("props.data");
  console.log(props.data);

  console.log(authorUID);

  useEffect(() => {
    // Ensure authorUID is not undefined or null
    if (authorUID) {
      const db = getDatabase();
      const authorRef = firebaseRef(db, `users/${authorUID}`);
      console.log("authorRef: " + authorRef);

      // Fetch the author's name once using the provided UID
      onValue(
        authorRef,
        (snapshot) => {
          const userData = snapshot.val();
          if (userData && userData.displayName) {
            // If a displayName is found, use it
            setAuthorName(userData.displayName);
          } else {
            // If no displayName is found, set to "Unknown"
            setAuthorName("Unknown");
          }
        },
        {
          onlyOnce: true,
        }
      );

      // Since we're using onlyOnce: true, there's no need to unsubscribe
      // as the listener is automatically removed after the initial trigger
    } else {
      // If no authorUID is provided, set the author name to "Unknown"
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
    <div className="quizContainer">
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
      <div className="quiz-sidebar">
        <QuizSidebar
          wordListName={wordListName}
          authorName={authorName}
          currentQuestion={currentIndex}
          totalQuestions={words.length}
        />
      </div>
    </div>
  );
}
