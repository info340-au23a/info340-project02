import { useEffect, useState } from "react";
import { SearchTag } from "./SearchTag.js";
import { WordDisplay } from "./WordDisplay.js";

const DICTIONARY_API_TEMPLATE =
  "https://www.dictionaryapi.com/api/v3/references/sd2/json/{word}?key={apiKey}";
const apiKey = "02dd1fc4-e12f-4d44-9c1c-c8526cfd6ef4";

export function ListBuilderView(props) {
  const [searchData, setSearchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const onSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // GETs a list of words from the MW API
  // note that the data that is passed into the search component is just a list a words that has no other data
  // we will have to reidentify the word with MW's api to pull more data
  useEffect(() => {
    const queryTerm = searchTerm + "*";
    const url = DICTIONARY_API_TEMPLATE.replace("{word}", queryTerm).replace(
      "{apiKey}",
      apiKey
    );

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          if (typeof data[0] === "string") {
            const firstLetter = searchTerm.charAt(0).toLowerCase();
            const suggestions = data.filter(
              (word) =>
                word.toLowerCase().startsWith(firstLetter) &&
                !word.includes(" ")
            );
            if (suggestions.length > 0) {
              setSearchData(
                suggestions.map((word) => ({ word, isSuggestion: true }))
              );
            } else {
              setSearchData([]); // No matching suggestions
            }
          }
        } else {
          setSearchData([]); // No results
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setSearchData([]);
      });
  }, [searchTerm]);


  // handles adding a word to the list when clicked
  const onWordClick = (word) => {
    const url = DICTIONARY_API_TEMPLATE.replace("{word}", word).replace(
      "{apiKey}",
      apiKey
    );
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // TODO: implement word click functionality for adding words to lists
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  return (
    <>
      <div className="input-bar">
        <label htmlFor="list-title">
          <input type="text" id="list-title" placeholder="List Title" />
        </label>
      </div>

      <div className="input-bar">
        <label htmlFor="search-word">
          <span className="material-icons" aria-label="Search"></span>
          <input
            type="text"
            id="search-word"
            placeholder="Search"
            value={searchTerm}
            onChange={onSearchChange}
          />{" "}
          {/*onChange={handleSearch*/}
        </label>
      </div>
      <div className="container">
        <WordDisplay
          searchData={searchData}
          searchTerm={searchTerm}
          onWordClick={onWordClick}
        />
        <div className="word-buttons">
          <button>Remove</button>
          <button>Add</button>
          <button>Submit</button>
        </div>
        <SearchTag tagsData={props.tagsData} />
      </div>
    </>
  );
}
