import React, { useState } from 'react';
import TAGS_DATA from './data/tags.json';
import Dropdown from 'react-bootstrap/Dropdown';

export function SearchFilter(props) {
    const [isFilterOpen, setIsFilterOpen] = useState(true);
    const [selectedTags, setSelectedTags] = useState([]);

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    const handleTagChange = (tag) => {
        const updatedTags = selectedTags.includes(tag)
            ? selectedTags.filter((selectedTag) => selectedTag !== tag)
            : [...selectedTags, tag];
        setSelectedTags(updatedTags);
    };

    return (
        <div className="searchfilter">
            <h2>Start your adventures from:</h2>
            <div className="bars">
                <div className='search'>
                    <span className="material-icons search-icon" aria-hidden="true">search</span>
                    <input type="search-box" placeholder="Search List Title" aria-label="search" />
                </div>
                <div className='filter'>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            <span className="material-icons filter-icon" aria-hidden="true">filter_alt</span>
                            Filter Tags
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {isFilterOpen && (
                                <div className="dropdown-content">
                                    <div>
                                        {TAGS_DATA.map((tagObj) => (
                                            <p key={tagObj.id}>
                                                <input
                                                    type="checkbox"
                                                    id={tagObj.id}
                                                    checked={selectedTags.includes(tagObj.word)}
                                                    onChange={() => handleTagChange(tagObj.word)}
                                                />
                                                <label htmlFor={tagObj.id}> {tagObj.word}</label>
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
}