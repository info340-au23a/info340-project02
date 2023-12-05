import React from "react";

export function WordDisplay(props) {
  const { searchData, searchTerm } = props;

  console.log(searchData[1]);

  let content;

  if (searchTerm) {
    if (searchData.length === 0) {
      content = <p>No results found.</p>;
    } else {
      content = searchData.map((entry, index) => {
        const word = entry.isSuggestion
          ? entry.word
          : entry.meta?.id.split(":")[0];
        return (
          <div key={index} className="searchResultWord">
            <p>{word}</p>
          </div>
        );
      });
    }
  }

  return (
    <div className="list">
      <h2>Search Results</h2>
      {content}
    </div>
  );
}
