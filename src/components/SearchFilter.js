import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

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
  const { dataObj } = props;
  const cardLink = `/flipcard/`;

  return (
    <div className="filter">
      <div className="card-deck">
        <div className="card">
          <div className="card-body">
            <Link to={cardLink} className="card-link">
              <h1 className="card-title">Title: {dataObj.title}</h1>
            </Link>
            <ul className="tagNames">
              <p>- Labeled by tags -</p>
              {dataObj.tags.map((tag, index) => (
                <li key={index}>{index + 1}. {tag}</li>
              ))}
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredWordSets, setFilteredWordSets] = useState([]);

  useEffect(() => {
    // Filter the word sets based on tags and search term
    const filteredSets = wordSets.filter((set) => {
      const titleLowerCase = set.title ? set.title.toLowerCase() : '';
      const tagsLowerCase = set.tags ? set.tags.map(tag => tag.toLowerCase()) : [];

      return (
        titleLowerCase.includes(searchTerm.toLowerCase()) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) => tagsLowerCase.includes(tag.toLowerCase())))
      );
    });

    setFilteredWordSets(filteredSets);
  }, [wordSets, selectedTags, searchTerm]);

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

  return (
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
        {filteredWordSets.map((set) => (
          <WordCard key={set.id} dataObj={set} />
        ))}
      </div>
    </div>
  );
}