import React, { useState } from "react";
import {BackButton} from './BackButton.js'

export function FlipCardList(props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const { data } = props;

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsCardFlipped(false);
    }
  };

  const handleCardFlip = () => {
    setIsCardFlipped(!isCardFlipped);
  };

  return (
    <div className="flipcard-container">
      <BackButton type="/flipcard"/>
      {data.length > 0 && (
        <FlipCard
          data={data[currentIndex]}
          isFlipped={isCardFlipped}
          onCardFlip={handleCardFlip}
        />
      )}
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
        </div>
      </div>
    </div>
  );
}

export function FlipCard(props) {

  const wordData = props.data;
  const isFlipped = props.isFlipped;

  let cardClassName = "flip-card";
  if (isFlipped) {
    cardClassName += " flipped";
  }

  const handleSoundClick = (event) => {
    event.stopPropagation();
    if (wordData.audio) {
      const audio = new Audio(wordData.audio);
      audio.play();
    }
  };

  const sentence = wordData.sentence || "No example sentence available.";
  const wordClass = wordData.wordClass || "No tags available";

  return (
    <div className={cardClassName} onClick={props.onCardFlip}>
      <div className="flip-card-front">
        <div className="soundButton">
          <button className="fas" aria-label="Play Sound" onClick={handleSoundClick}>
            &#xf028;
          </button>
        </div>
      </div>

      <div className="flip-card-back">
        <button className="fas" aria-label="Play Sound" onClick={handleSoundClick}>
          &#xf028;
        </button>
        <p>{wordData.word}</p>
        <p>{sentence}</p>
        <p>
        <span className="speech-type">{wordClass}</span>
        </p>
      </div>
    </div>
  );
}