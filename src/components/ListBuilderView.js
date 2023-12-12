import { useEffect, useState } from "react";
import { SearchTag } from "./SearchTag.js";
import { WordDisplay } from "./WordDisplay.js";
import { Alert } from "react-bootstrap";
import {
  getDatabase,
  ref as firebaseRef,
  push as firebasePush,
} from "firebase/database";

const DICTIONARY_API_TEMPLATE =
  "https://www.dictionaryapi.com/api/v3/references/sd2/json/{word}?key={apiKey}";
const apiKey = "02dd1fc4-e12f-4d44-9c1c-c8526cfd6ef4";

export function ListBuilderView(props) {
  const { wordSets, setWordSets, currentUser } = props;
  const [listTitle, setListTitle] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [chosenWords, setChosenWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);

  console.log("user", currentUser);
  const fetchData = (term) => {
    const url = DICTIONARY_API_TEMPLATE.replace("{word}", term).replace(
      "{apiKey}",
      apiKey
    );
    return fetch(url).then((response) => response.json());
  };

  const onSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const onTitleChange = (event) => {
    setListTitle(event.target.value);
  };

  const onTagChange = (event) => {
    const tag = event.target.id;
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((selectedTag) => selectedTag !== tag)
      : [...selectedTags, tag];
    setSelectedTags(updatedTags);
  };

  // GETs a list of words from the MW API
  // note that the data that is passed into the search component is just a list a words that has no other data
  // we will have to reidentify the word with MW's api to pull more data
  // this is due to MW API returning an array of Objs if the search term is a defined word
  // and an array of strings for search terms that are not defined as a word
  useEffect(() => {
    if (!searchTerm) {
      setSearchData([]);
      return;
    }

    fetchData(searchTerm + "*")
      .then((data) => {
        if (typeof data[0] === "string") {
          setSearchData(processSuggestions(data, searchTerm));
        } else {
          setSearchData(processDetailedEntries(data));
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setSearchData([]);
      });
  }, [searchTerm]);

  const processSuggestions = (suggestions, searchTerm) => {
    const uniqueWords = new Set(
      suggestions.map((word) => word.toLowerCase().replace(/\.$/, ""))
    );

    return Array.from(uniqueWords)
      .filter(
        (word) =>
          word.startsWith(searchTerm.toLowerCase()) && !word.includes(" ")
      )
      .map((word) => ({ word, isSuggestion: true }));
  };

  const processDetailedEntries = (entries) => {

    console.log("ENTRIES", entries)
    return entries.map((entry) => {
      let audioLink =
        entry.hwi.prs && entry.hwi.prs[0]?.sound?.audio
          ? `https://media.merriam-webster.com/audio/prons/en/us/mp3/${entry.hwi.prs[0].sound.audio[0]}/${entry.hwi.prs[0].sound.audio}.mp3`
          : null;
          
      return {
        word: entry.hwi.hw.replace(/\*/g, ""),
        audio: audioLink,
        wordClass: entry.fl,
        isSuggestion: false
      };
    });
  };

  useEffect(() => {
    console.log("Chosen Words List:", chosenWords);
  }, [chosenWords]);

  // handles adding a word to the list when clicked
  const onWordClick = (wordObject) => {
    setSelectedWord(wordObject);
    console.log("Word Selected:", wordObject);
  };
  const onAddClick = () => {
    if (!selectedWord) return;

    const isWordInList = chosenWords.some(
      (wordObj) => wordObj.word === selectedWord.word
    );
    if (isWordInList) {
      console.log("Word is already in the list");
      return;
    }

    const handleWordAddition = (wordDetails) => {
      setChosenWords((prevChosenWords) => [...prevChosenWords, wordDetails]);
    };

    if (selectedWord.isSuggestion) {
      fetchData(selectedWord.word)
        .then((data) => {
          if (
            Array.isArray(data) &&
            data.length > 0 &&
            typeof data[0] !== "string"
          ) {
            handleWordAddition(processDetailedEntries([data[0]])[0]);
          } else {
            console.log("API did not return a detailed entry");
          }
        })
        .catch((error) => console.error("Fetch error:", error));
    } else {
      handleWordAddition(selectedWord);
    }

    setSelectedWord(null);
  };

  //once a chosen word is selected and remove button is clicked the word is removed
  const onRemoveClick = (wordToRemove) => {
    if (!wordToRemove) {
      console.error("No word to remove");
      return;
    }
    setChosenWords(
      chosenWords.filter((wordObj) => wordObj.word !== wordToRemove.word)
    );
    setSelectedWord(null);
  };

  const onSubmitClick = () => {
    if (selectedTags.length === 0) {
      setAlertMessage("No selected Tags");
    } else if (chosenWords.length === 0) {
      setAlertMessage("No selected words");
    } else if (listTitle.trim() === "") {
      setAlertMessage("Must have Title");
    } else {
      const newWordList = {
        title: listTitle,
        tags: selectedTags,
        words: chosenWords.map(({ word, audio, wordClass, isSuggestion }) => ({
          word,
          audio,
          wordClass: wordClass || "",
          // isSuggestion,
        })),
        authorUID: currentUser.userId,
      };

      const db = getDatabase();
      const wordSetsRef = firebaseRef(db, "wordSets"); // Reference to a specific word set using the title

      // Push the new word list to the specified word set
      firebasePush(wordSetsRef, newWordList)
        .then(() => {
          // Clear the form after successfully pushing to the database
          setWordSets([...wordSets, newWordList]);
          setListTitle("");
          setChosenWords([]);
          setSelectedTags([]);
          setSearchTerm("");
          setAlertMessage("List created successfully!");
        })
        .catch((error) => {
          console.error("Error pushing data to Firebase:", error);
          setAlertMessage("Error creating list");
        });
    }
  };

  return (
    <>
      {currentUser.userId ? (
        <>
          {alertMessage && (
            <Alert
              variant="light"
              dismissible
              onClose={() => setAlertMessage(null)}
            >
              {alertMessage}
            </Alert>
          )}
          {alertMessage && (
            <Alert
              variant="light"
              dismissible
              onClose={() => setAlertMessage(null)}
            >
              {alertMessage}
            </Alert>
          )}
          <div className="input-bar">
            <label htmlFor="list-title">
              <input
                type="text"
                id="list-title"
                placeholder="List Title"
                value={listTitle}
                onChange={onTitleChange}
              />
            </label>
          </div>

          <div className="input-bar">
            <label htmlFor="search-word">
              <span className="material-icons" aria-label="Search"></span>
              <input
                type="text"
                id="search-word"
                placeholder="Search here"
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
              <button onClick={() => onRemoveClick(selectedWord)}>
                Remove
              </button>
              <button onClick={() => onAddClick(selectedWord)}>Add</button>
              <button onClick={onSubmitClick}>Save</button>
            </div>
            <SearchTag
              tagsData={props.tagsData}
              selectedTags={selectedTags}
              onTagChange={onTagChange}
            />
          </div>
        </>
      ) : (
        <div>
          <p>Please log in to use the list builder.</p>
        </div>
      )}
    </>
  );
}
