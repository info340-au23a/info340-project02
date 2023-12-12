import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";


// TagFilter Component
export function TagFilter(props) {
  const tagsArray = props.tagsData.map((tagObj) => (
    <p key={tagObj.id} onClick={() => props.onTagChange(tagObj.word)}>
      <input
        type="checkbox"
        id={`tag-${tagObj.id}`}
        checked={props.selectedTags.includes(tagObj.word)}
        onChange={() => props.onTagChange(tagObj.word)}
      />
      <label htmlFor={`tag-${tagObj.id}`}>{tagObj.word}</label>
    </p>
  ));

  return (
    <div className="filterBar">
      <Dropdown
        show={props.isFilterOpen}
        onClose={() => props.setIsFilterOpen(false)}
      >
        <Dropdown.Toggle
          variant="success"
          id="dropdown-basic"
          onClick={props.toggleFilter}
        >
          <span className="material-icons filter-icon" aria-hidden="true">
            filter_alt
          </span>
          Filter Tags
        </Dropdown.Toggle>
        <Dropdown.Menu>{tagsArray}</Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

// SearchInput Component
export function SearchInput(props) {
  return (
    <div className="input-bar">
      <span className="material-icons search-icon" aria-hidden="true">
        search
      </span>
      <input
        type="text"
        placeholder="Search Title"
        aria-label="Search"
        value={props.searchTerm}
        onChange={(e) => props.onSearchChange(e.target.value)}
      />
    </div>
  );
}

// WordCard Component
function WordCard(props) {
  const { dataObj, basePath } = props;

  const dataObjTags = dataObj.tags.map((tag, index) => (
    <li key={index}>{index + 1}. {tag}</li>
  ));
  return (
    <div className="filter">
      <div className="card-deck">
        <div className="card">
          <div className="card-body">
            <Link to={`${basePath}/${dataObj.firebaseKey}`} className="card-link">
              <h1 className="card-title">{dataObj.title}</h1>
            </Link>
            <ul className="tagNames">
              <p>- Labeled by tags -</p>
              {dataObjTags}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// SearchFilter Component
export default function SearchFilter(props) {
  const { wordSets } = props;
  console.log('wordSets ', wordSets);
  console.log(wordSets);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredWordSets, setFilteredWordSets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWordSets = () => {
    setIsLoading(true);
    const db = getDatabase();
    const wordSetsRef = ref(db, "wordSets");

    onValue(wordSetsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const wordSetsArray = Object.keys(data).map((key) => ({
          ...data[key],
          firebaseKey: key,
        }));
        setFilteredWordSets(filterWordSets(wordSetsArray));
      } else {
        setFilteredWordSets([]);
      }
      setIsLoading(false);
    });
  };

  const mapTagsToLowerCase = (tags) => tags ? tags.map(tag => tag.toLowerCase()) : [];

  const filterWordSets = (wordSets) => {
    return wordSets.filter((set) => {
      const titleLowerCase = set.title ? set.title.toLowerCase() : '';
      const tagsLowerCase = mapTagsToLowerCase(set.tags);

      return (
        titleLowerCase.includes(searchTerm.toLowerCase()) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) => tagsLowerCase.includes(tag.toLowerCase())))
      );
    });
  };

  useEffect(() => {
    setFilteredWordSets(filterWordSets(wordSets));
  }, [wordSets, selectedTags, searchTerm]);

  useEffect(() => {
    fetchWordSets();
  }, []);

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  const handleTagChange = (tag) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((selectedTag) => selectedTag !== tag)
      : [...selectedTags, tag];
    setSelectedTags(updatedTags);
  };

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  const handleClick = (event) => {
    event.preventDefault();
    props.applyFilterCallback(selectedTags);
  };

  const filteredWordSetsArray = filteredWordSets.map((set, index) => (
    <WordCard key={set.id || index} dataObj={set} basePath={props.basePath} />
  ));

  if (isLoading) {
    return <div>Loading...</div>;
  }


  return (
    <form onSubmit={handleClick}>
      <div className="searchFilter">
        <SearchInput
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
        <TagFilter
          tagsData={props.tagsData}
          selectedTags={selectedTags}
          onTagChange={handleTagChange}
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          toggleFilter={toggleFilter}
        />
        <div className="cardsDisplay">
          {filteredWordSetsArray}
        </div>
      </div>
    </form>
  );
}