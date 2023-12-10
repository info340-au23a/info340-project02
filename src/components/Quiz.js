import React, { useState, useEffect } from "react";

// result array that stores the answered questions
let resultArr = [];

function GenerateQuizCard(props) {
  const wordListData = props.data;
  const setInputValue = props.setInput;
  const setMessage = props.setMessage;
  const index = props.index;

  const handleSoundClick = () => {
    if (wordListData.audio) {
      const audio = new Audio(wordListData.audio);
      audio.play();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.input === wordListData.word) {
      resultArr.push(wordListData.word);
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
            maxLength={wordListData.word.length}
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
  const { data } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setInputValue("");
      setMessage("");
    }
  };

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setInputValue("");
      setMessage("");
    }
  };

  const handleFinishQuiz = () => {
    alert("Quiz Finished!");
  };


  return (
    <div>
      <GenerateQuizCard
        data={data[currentIndex]}
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
          {currentIndex < data.length - 1 && (
              <button onClick={handleNext}>&#8594;</button>
            )}
            {currentIndex === data.length - 1 && (
              <button onClick={handleFinishQuiz}>Finish</button>
            )}
        </div>
      </div>
    </div>
  );
}
