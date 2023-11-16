import React from "react";
import "./quiz.css";

export function QuizComponent (props) {
    return(
    <>
    <div className="quiz">
        <h1>Word Quiz!</h1>
        
        {quizData.map((quizItem) => (
            <div key={quizItem.id} className="quiz-card">
              <h2 style={{ fontSize: '24px' }}>
                <label htmlFor="word-input">
                  <button
                    id="sound-button"
                    className="fas"
                    aria-label="Play Sound"
                    onClick={() => handleSoundButtonClick(quizItem.word)}
                  >
                    &#xf028;
                  </button>
                </label>
                <input
                  type="text"
                  id="word-input"
                  placeholder="_ _ _ _ _"
                  maxLength="5"
                  aria-label="sound-button"
                />
              </h2>
            </div>
          ))}

          <div className="quiz-submit">
            <button>Submit</button>
          </div>

          <div className="quiz-next">
            <button>&#8592;</button>
            <button>&#8594;</button>
          </div>
        </div>
    
    </>

    );
};