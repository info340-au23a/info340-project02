import React, { useState } from "react";

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
  const wordListData = props.data;
  const isFlipped = props.isFlipped;

  let cardClassName = "flip-card";
  if (isFlipped) {
    cardClassName += " flipped";
  }

  const handleSoundClick = (id, event) => {
    event.stopPropagation();
    if (wordListData.pronunciationAudio) {
      const audio = new Audio(wordListData.pronunciationAudio);
      audio.play();
    }
  };

  return (
    <div className={cardClassName} onClick={props.onCardFlip}>
      <div className="flip-card-front">
        {!isFlipped && <img src={wordListData.imgSrc} alt={wordListData.imgAlt} />}
        <div className="soundButton">
          <button
            className="fas"
            aria-label="Play Sound"
            onClick={(e) => handleSoundClick(wordListData.id, e)}
          >
            &#xf028;
          </button>
        </div>
      </div>

      <div className="flip-card-back">
        <button
          id="sound-button"
          className="fas"
          aria-label="Play Sound"
          onClick={(e) => handleSoundClick(wordListData.id, e)}
        >
          &#xf028;
        </button>

        <p>{wordListData.word}</p>
        <p>{wordListData.sentence}</p>
        <p>
          {" "}
          <span className="speech-type">{wordListData.tags[0]}</span>{" "}
          <span className="object-type">{wordListData.tags[1]}</span>{" "}
        </p>
      </div>
    </div>
  );
}
