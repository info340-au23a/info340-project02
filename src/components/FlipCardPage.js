import React, { useState } from "react";
import { FlipCardList } from "./FlipCardList.js";
import { Footer } from "./Footer.js";

export function FlipCardPage(props) {
  const wordListData = props.data;
  const [selectedWordList, setSelectedWordList] = useState(null);

  const handleSelect = (wordList) => {
    console.log("current", wordList);
    setSelectedWordList(wordList.words);
  };

  const renderWordLists = () => {
    return wordListData.map((wordList) => (
      <div className="quiz-buttons-container" key={wordList.wordSetTitle}>
        <button onClick={() => handleSelect(wordList)}>
          {wordList.wordSetTitle}
        </button>
      </div>
    ));
  };

  return (
    <>
      <main>
        <div>
          <h1>Flip Cards</h1>
          <h2>Practice your skills</h2>
        </div>
        <div>
          <div className="searchTitle">
            Select a wordlist to learning with flipcards
            {renderWordLists()}
          </div>
        </div>
        {selectedWordList && <FlipCardList data={selectedWordList} />}
      </main>
      <Footer
        imageRef="Flipcard sample photos originally from Pexels.com | 
      Audio pronunciations created by Brittanica.com"
      />
    </>
  );
}
