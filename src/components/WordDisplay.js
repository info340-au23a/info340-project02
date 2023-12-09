import React from "react";

export function WordDisplay(props) {
  const { searchData, searchTerm, onWordClick, chosenWords } = props;

  // Function to render the search results
  const renderSearchResults = () => {
    if (!searchTerm) return <p>Start typing to search for words.</p>;
    if (searchData.length === 0) return <p>No results found.</p>;

    return searchData.map((entry, index) => (
      <div key={index} onClick={() => onWordClick(entry)} className="searchResultWord">
        <p>{entry.word}</p>
      </div>
    ));
  };

  // Function to render the list of chosen words
  const renderChosenWords = () => {
    return chosenWords.map((wordObj, index) => (
      <div key={index} className="chosenWord">
        <p>{wordObj.word}</p>
      </div>
    ));
  };

  return (
    <div className="list">
      <h2>Search Results</h2>
      <div>{renderSearchResults()}</div>
      <div className="chosen-words">
        <h2>Chosen Words</h2>
        <div>{renderChosenWords()}</div>
      </div>
    </div>
  );
}
