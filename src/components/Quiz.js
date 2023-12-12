import React, { useState, useEffect } from "react";
import { getDatabase, ref as firebaseRef, onValue } from "firebase/database";
import {BackButton} from './BackButton.js'

function GenerateQuizCard(props) {
  const { words, index, input, setInput,
    submitAnswer } = props;


  const handleSoundClick = () => {
    if (words.audio) {
      const audio = new Audio(words.audio);
      audio.play();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isCorrect = input.trim().toLowerCase() === words.word.toLowerCase();
    submitAnswer(input, isCorrect);

    console.log('tqs', props.totalQuestions)

    if (index < props.totalQuestions - 1) {
      props.setCurrentIndex(index + 1);
      setInput("");
    } else {
      props.finishQuiz(); 
    }
  };
  
    return (
      <div className="quiz">
        <div key={index} className="quiz-card">
          <h2>
            <label>
              <p>Question {index + 1}: Listen to the audio and spell the word</p>
              <button
                className="fas"
                aria-label="Play Sound"
                onClick={() => handleSoundClick(index)}
              >
                &#xf028;
              </button>
            </label>
            <input className="word-input"
              value={props.input}
              onChange={(e) => setInput(e.target.value)}
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
  const [answers, setAnswers] = useState(new Array(words.length).fill(null));
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    if (authorUID) {
      const db = getDatabase();
      const authorRef = firebaseRef(db, `users/${authorUID}`);

      onValue(
        authorRef,
        (snapshot) => {
          const userData = snapshot.val();
          setAuthorName(userData?.displayName || "Unknown");
        },
        {
          onlyOnce: true,
        }
      );

    } else {

      setAuthorName("Unknown");
    }
  }, [authorUID]);

  const submitAnswer = (answer, isCorrect) => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentIndex] = { answer, isCorrect };
      return newAnswers;
    });
  };

  const allAnswered = answers.every((answer) => answer !== null);
  const correctAnswers = answers.filter((ans) => ans?.isCorrect);
  const correctCount = correctAnswers.length;
  const percentageRight = ((correctCount / words.length) * 100).toFixed(2);

  const correctWords = correctAnswers.map((ans, index) => words[index].word);
  const incorrectWords = answers
    .map((ans, index) => (!ans?.isCorrect ? words[index].word : null))
    .filter((word) => word !== null);

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setInputValue("");
      setMessage("");
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setInputValue("");
      setMessage("");
    }
  };



  const handleFinishQuiz = () => {
    if (allAnswered) {
      setShowSummary(true);
    } else {
      setMessage("Please answer all questions before finishing the quiz.");
    }
  };

  if (showSummary) {
    return (
      <div className="quiz-container">
          <BackButton type="/quiz"/>
        <div className="quiz-card summary-card">
          <h2 className="summary-title">Quiz Summary</h2>
          <p className="summary-result">You got {correctWords.length} out of {props.totalQuestions} correct ({percentageRight}%).</p>
          <div className="summary-section">
            <strong className="summary-heading">Words Correct:</strong>
            <ul className="summary-list">
              {correctWords.map((word, i) => <li key={i} className="summary-word">{word}</li>)}
            </ul>
          </div>
          <div className="summary-section">
            <strong className="summary-heading">Words Incorrect:</strong>
            <ul className="summary-list">
              {incorrectWords.map((word, i) => <li key={i} className="summary-word">{word}</li>)}
            </ul>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="quiz-container">
      <h2>Spelling Quiz</h2>
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
        index={currentIndex}
        submitAnswer={submitAnswer}
        setCurrentIndex={setCurrentIndex}
        totalQuestions={words.length}
        finishQuiz={handleFinishQuiz}
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
}

function QuizSidebar({ wordListTitle, authorName, currentQuestion, totalQuestions}) {
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