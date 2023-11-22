import React, { useState } from 'react';
import WORDSET_DATA from './data/word-list.json';
import TAGS_DATA from './data/tags.json';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SearchFilter(props) {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    const handleTagChange = (tag) => {
        const updatedTags = selectedTags.includes(tag)
            ? selectedTags.filter((selectedTag) => selectedTag !== tag)
            : [...selectedTags, tag];
        setSelectedTags(updatedTags);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleClick = (event) => {
        event.preventDefault();
        props.applyFilterCallback(selectedTags);
    };

    const filteredWords = WORDSET_DATA.filter((dataObj) => {
        const matchesSearch = dataObj.Title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => dataObj.tags.includes(tag));
        return matchesSearch && matchesTags;
    });

    const tagsArray = TAGS_DATA.map((tagObj) => {
        return (
        <p key={tagObj.id} onClick={() => handleTagChange(tagObj.word)}>
            <input
                type="checkbox"
                id={tagObj.id}
                checked={selectedTags.includes(tagObj.word)}
                onChange={() => handleTagChange(tagObj.word)}
            />
            <label htmlFor={tagObj.id}> {tagObj.word}</label>
        </p>
        )
    });

    const cardDom = filteredWords.map((dataObj) => {
        return (
        <div key={dataObj.id} className="row-cols-8">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{`${dataObj.Title}`}</h5>
                    <ul>
                        {dataObj.tags.map((tag, index) => (
                            <li key={index}>{tag}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
        )
    });

    return (
        <form onSubmit={handleClick}>
            <div className="searchfilter">
                <h2>Start your adventures from:</h2>
                <div>
                    <div className="search" style={{ textAlign: 'center' }}>
                        <span className="material-icons search-icon" aria-hidden="true">
                            search
                        </span>
                        <input
                            type="text"
                            placeholder="Search Title"
                            aria-label="search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className="filter" style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <Dropdown show={isFilterOpen} onClose={() => setIsFilterOpen(false)}>
                            <Dropdown.Toggle variant="success" id="dropdown-basic" onClick={toggleFilter}>
                                <span className="material-icons filter-icon" aria-hidden="true">
                                    filter_alt
                                </span>
                                Filter Tags
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {isFilterOpen && (
                                    <div className="dropdown-content">
                                        <div>
                                            {tagsArray}
                                        </div>
                                    </div>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className='cardsDisplay'>
                        {cardDom}
                    </div>
                </div>
            </div>
        </form>
    );
}

