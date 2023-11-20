import React, { useState } from 'react';
import TAGS_DATA from './data/tags.json';

export function SearchFilter(props) {
    const [isFilterOpen, setIsFilterOpen] = useState(true);

    const tagArray = TAGS_DATA.map((tagObj) => {
        const transform = <p key={tagObj.id}><input type="checkbox" id={tagObj.id}/><label htmlFor={tagObj.id}> {tagObj.word}</label></p>
        return transform;
    });

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    return (
        <div className="searchfilter">
            <h2>Start your adventures from:</h2>
            <div className="bars">
                <div className='search'>
                    <span className="material-icons search-icon" aria-hidden="true">search</span>
                    <input type="search-box" placeholder="Search words" aria-label="search" />
                </div>
                <div className='filter'>
                    {isFilterOpen && (
                        <div className="dropdown">
                            <span className="material-icons filter-icon" aria-hidden="true">filter_alt</span>
                            <select value={tagArray}>
                                <option value="">Filter Tags</option>
                                    {tagArray.map((tag) => (
                                        <option key={tag} value={tag}>
                                            {tag}
                                        </option>
                                    ))}
                            </select>                        
                        </div>
                    )}
                </div>
            </div>   
        </div>
    );
}