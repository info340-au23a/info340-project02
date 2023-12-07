import { useEffect, useState } from "react";
import { SearchTag } from "./SearchTag.js";
import { WordDisplay } from "./WordDisplay.js";

const DICTIONARY_API_TEMPLATE =
  "https://www.dictionaryapi.com/api/v3/references/sd2/json/{word}?key={apiKey}";
const apiKey = "02dd1fc4-e12f-4d44-9c1c-c8526cfd6ef4";

export function ListBuilderView(props) {
  const {wordSets, setWordSets} = props;
  const [listTitle, setListTitle] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [chosenWords, setChosenWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);


  const onSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const onTitleChange = (event) => {
    setListTitle(event.target.value);
  }

  const onTagChange = (event) => {
    const tag = event.target.id
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((selectedTag) => selectedTag !== tag)
      : [...selectedTags, tag];
    setSelectedTags(updatedTags);
  };

  // GETs a list of words from the MW API
  // note that the data that is passed into the search component is just a list a words that has no other data
  // we will have to reidentify the word with MW's api to pull more data
  // this is due to MW API returning an array of Objs for >3 char searchs
  // and an array of strings for <3 char searchs
useEffect(() => {
  if (searchTerm) {
    const queryTerm = searchTerm + '*'; 
    const url = DICTIONARY_API_TEMPLATE.replace("{word}", queryTerm).replace("{apiKey}", apiKey);
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          if (typeof data[0] === 'string') {
            // Handling array of strings
            const processedSuggestions = processSuggestions(data, searchTerm);
            setSearchData(processedSuggestions);
          } else {
            // Handling array of objects
            const processedEntries = processDetailedEntries(data, searchTerm);
            setSearchData(processedEntries);
          }
        } else {
          setSearchData([]); // no results
        }
      })
      .catch(error => {
        console.error("Fetch error:", error);
        setSearchData([]);
      });
  } else {
    setSearchData([]); // reset when search term is cleared
  }
}, [searchTerm]);

const processSuggestions = (suggestions, searchTerm) => {
  const uniqueWords = new Set(
    suggestions.map(word => word.toLowerCase().replace(/\.$/, ''))
  );
  return Array.from(uniqueWords)
    .filter(word => word.startsWith(searchTerm.toLowerCase()) && !word.includes(" "))
    .map(word => ({ word, isSuggestion: true }));
};

const processDetailedEntries = (entries, searchTerm) => {
  const uniqueEntries = new Set(
    entries.map(item => item.meta.id.split(':')[0].toLowerCase().replace(/\.$/, ''))
  );
  return Array.from(uniqueEntries)
    .map(wordId => entries.find(item => item.meta.id.split(':')[0].toLowerCase().replace(/\.$/, '') === wordId))
    .filter(item => item.meta.id.split(':')[0].toLowerCase().startsWith(searchTerm.toLowerCase()) && !item.meta.id.split(':')[0].includes(" "));
};

    
  // handles adding a word to the list when clicked
const onWordClick = (word) => {
  const url = DICTIONARY_API_TEMPLATE.replace("{word}", word).replace(
    "{apiKey}",
    apiKey
  );

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("Data", data);

      
        setSelectedWord(word);
        console.log(selectedWord)
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
};

const onAddClick = (word) => {
  if(selectedWord && !chosenWords.includes(word)) {
    setChosenWords([...chosenWords, selectedWord])
  }
  setSelectedWord(null);
}

//once a chosen word is selected and remove button is clicked the word is removed
const onRemoveClick = (word) => {
  const updatedChosenWords = chosenWords.filter((chosenWord) => {
    return chosenWord !== word;
  })
  setChosenWords(updatedChosenWords);
  setSelectedWord(null);
}

const newWordList = {
  id: wordSets.length + 1,
  Title: listTitle,
  words: chosenWords,
  tags: selectedTags,
};

const onSubmitClick = () => {
  setWordSets([...wordSets, newWordList]);
  setListTitle("");
  setChosenWords([]);
  setSelectedTags([]);
}

  return (
    <>
      <div className="input-bar">
        <label htmlFor="list-title">
          <input 
          type="text" 
          id="list-title" 
          placeholder="List Title"
          value={listTitle}
          onChange={onTitleChange} />
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
          chosenWords={chosenWords}
          onRemoveClick={onRemoveClick}
        />
        <div className="word-buttons">
          <button onClick={() =>  onRemoveClick(selectedWord)}>Remove</button>
          <button onClick={() =>  onAddClick(selectedWord)}>
            Add
          </button>
          <button onClick={onSubmitClick}>Submit</button>
        </div>
        <SearchTag tagsData={props.tagsData} selectedTags={selectedTags} onTagChange={onTagChange}/>
      </div>
    </>
  );
}
