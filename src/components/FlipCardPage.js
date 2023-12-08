import React, { useState } from "react";
import { FlipCardList } from "./FlipCardList.js";
import { NavBar } from "./NavBar.js";
import { Footer } from "./Footer.js";

export function FlipCardPage(props) {
  const wordListData = props.data;
  const [selectedWordList, setSelectedWordList] = useState(null);

  const handleSelect = (wordList) => {
    setSelectedWordList(wordList.words);
  };

  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main>
        <div>
          <h1>Flip Cards</h1>
          <h2>Practice your skills</h2>
        </div>
        <div>
          <p className = "searchTitle">Select a wordlist to learning with filpcards
              {wordListData.map((wordList) => (
                <div className="quiz-buttons-container">
                <button onClick={() => handleSelect(wordList)}
                key={wordList.wordSetTitle}>{wordList.wordSetTitle}
                </button>
                </div>
              ))}
          </p>
        </div>
        {selectedWordList && <FlipCardList data={selectedWordList} />}
      </main>
      <Footer imageRef="Flipcard sample photos originally from Pexels.com | 
      Audio pronunciations created by Brittanica.com" />
    </div>
  );
}
