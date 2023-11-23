import React, { useState } from "react";

export function FlipCardList(props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const flipCards = props.flipCards;

  const handleNext = () => {
    if (currentIndex < flipCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsCardFlipped(false);
    }
  };

  const handleLast = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsCardFlipped(false);
    }
  };

  const handleCardFlip = () => {
    setIsCardFlipped(!isCardFlipped);
  };

  return (
    <div>
      {flipCards.length > 0 && (
        <FlipCard
          flipCard={flipCards[currentIndex]}
          isFlipped={isCardFlipped}
          onCardFlip={handleCardFlip}
        />
      )}
      <div className="quiz-buttons-container">
        <div className="quiz-last">
          <button onClick={handleLast}>&#8592; Last</button>
        </div>
        <div className="quiz-next">
          <button onClick={handleNext}>&#8594; Next</button>
        </div>
      </div>
    </div>
  );
}

export function FlipCard(props) {
  const flipCard = props.flipCard;
  const isFlipped = props.isFlipped;

  let cardClassName = "flip-card";
  if (isFlipped) {
    cardClassName += " flipped";
  }

  const handleSoundClick = (id) => {

  };

  return (
    <div className={cardClassName} onClick={props.onCardFlip}>
      <div className="flip-card-front">
        {!isFlipped && <img src={flipCard.imgSrc} alt={flipCard.imgAlt} />}
      </div>

      <div className="flip-card-back">
        <button
          id="sound-button"
          className="fas"
          aria-label="Play Sound"
          onClick={() => handleSoundClick(flipCard.id)}
        >
          &#xf028;
        </button>

        <p>{flipCard.word}</p>
        <p>{flipCard.sentence}</p>
        <p>
          {" "}
          <span className="speech-type">{flipCard.tags[0]}</span>{" "}
          <span className="object-type">{flipCard.tags[1]}</span>{" "}
        </p>
      </div>
    </div>
  );
}
