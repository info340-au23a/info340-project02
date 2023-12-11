import React, { useState } from "react";
import { FlipCardList } from "./FlipCardList.js";
import { Footer } from "./Footer.js";

export function FlipCardPage(props) {
  
  const wordListData = props.data;
  const [selectedWordList, setSelectedWordList] = useState(null);

  const handleSelect = (wordList) => {
    console.log("current", wordList)
    setSelectedWordList(wordList.words);
  };

  return (
    <>
      <main>
        <div>
          <h1>Flip Cards</h1>
          <h2>Practice your skills</h2>
        </div>
        <div> {/* TODO: Remove map from component return jsx */}
          <p className = "searchTitle">Select a wordlist to learning with filpcards
              {wordListData.map((wordList) => (
                <div className="quiz-buttons-container">
                <button onClick={() => handleSelect(wordList)}
                key={wordList.wordSetTitle}>{wordList.wordSetTitle}
                </button>
                </div>
              ))}
          </div>
        </div>
        {selectedWordList && <FlipCardList data={selectedWordList} />}
      </main>
      <Footer imageRef="Flipcard sample photos originally from Pexels.com | 
      Audio pronunciations created by Brittanica.com" />
    </>
  );
}
