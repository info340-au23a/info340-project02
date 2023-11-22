// import React, { useState } from 'react';
// import WORDSET_DATA from './data/word-list.json';
// import TAGS_DATA from './data/tags.json';
// import Dropdown from 'react-bootstrap/Dropdown';
// import 'bootstrap/dist/css/bootstrap.min.css';

// export default function SearchFilter(props) {
//     const [isFilterOpen, setIsFilterOpen] = useState(false);
//     const [selectedTags, setSelectedTags] = useState([]);
//     const [filteredWords, setFilteredWords] = useState([]);

//     const toggleFilter = () => {
//         setIsFilterOpen(!isFilterOpen);
//     };

//     const handleTagChange = (tag) => {
//         const updatedTags = selectedTags.includes(tag)
//             ? selectedTags.filter((selectedTag) => selectedTag !== tag)
//             : [...selectedTags, tag];
//         setSelectedTags(updatedTags);
//     };

//     const handleCloseDropdown = () => {
//         setIsFilterOpen(false);
//     };

//     const handleClick = (event) => {
//         event.preventDefault();
//         const filteredData = WORDSET_DATA.filter((dataObj) =>
//             selectedTags.some((tag) => dataObj.tags.includes(tag))
//         );
//         const words = filteredData.flatMap((dataObj) => dataObj.words);
//         setFilteredWords(words);
//         props.applyFilterCallback(selectedTags);
//     };

//     return (
//         <form onSubmit={handleClick}>
//             <div className="searchfilter">
// <h2>Start your adventures from:</h2>
// <div className="bars">
//     <div className="search" style={{ textAlign: 'center' }}>
//         <span className="material-icons search-icon" aria-hidden="true">
//             search
//         </span>
//         <input type="search-box" placeholder="Search List Title" aria-label="search" />
//     </div>
//     <div className="filter" style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
//         <Dropdown show={isFilterOpen} onClose={handleCloseDropdown}>
//             <Dropdown.Toggle variant="success" id="dropdown-basic" onClick={toggleFilter}>
//                 <span className="material-icons filter-icon" aria-hidden="true">
//                     filter_alt
//                 </span>
//                 Filter Tags
//             </Dropdown.Toggle>
//             <Dropdown.Menu>
//                 {isFilterOpen && (
//                     <div className="dropdown-content">
//                         <div>
//                             {TAGS_DATA.map((tagObj) => (
//                                 <p key={tagObj.id} onClick={() => handleTagChange(tagObj.word)}>
//                                     <input
//                                         type="checkbox"
//                                         id={tagObj.id}
//                                         checked={selectedTags.includes(tagObj.word)}
//                                         onChange={() => handleTagChange(tagObj.word)}
//                                     />
//                                     <label htmlFor={tagObj.id}> {tagObj.word}</label>
//                                 </p>
//                             ))}
//                         </div>
//                     </div>
//                 )}
//             </Dropdown.Menu>
//         </Dropdown>
//         <div className="submit-button">
//             <button
//                 id="submitButton"
//                 type="submit"
//                 className="btn btn-success"
//                 style={{ fontSize: '15px', padding: '5px 20px' }}
//             >
//                 Apply
//             </button>
//         </div>
//     </div>
//                     <div>
//                         <div>
//                             {selectedTags.map((tag, index) => (
//                                 <div key={index} className="row-cols-8">
//                                     <div className="card">
//                                         <div className="card-body">
//                                             <h5 className="card-title">{`Selected Tag: ${tag}`}</h5>
//                                             <ul>
//                                                 {filteredWords.map((word, index) => (
//                                                     <li key={index}>{word}</li>
//                                                 ))}
//                                             </ul>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </form>
//     );
// }

import React, { useState } from 'react';
import WORDSET_DATA from './data/word-list.json';
import TAGS_DATA from './data/tags.json';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SearchFilter(props) {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [tagFilteredWords, setTagFilteredWords] = useState({});

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    const handleTagChange = (tag) => {
        const updatedTags = selectedTags.includes(tag)
            ? selectedTags.filter((selectedTag) => selectedTag !== tag)
            : [...selectedTags, tag];
        setSelectedTags(updatedTags);
    };

    const handleCloseDropdown = () => {
        setIsFilterOpen(false);
    };

    const handleClick = (event) => {
        event.preventDefault();
        const tagWordsMap = {};

        selectedTags.forEach((tag) => {
            const filteredData = WORDSET_DATA.filter((dataObj) => dataObj.tags.includes(tag));
            const words = filteredData.flatMap((dataObj) => dataObj.words);
            tagWordsMap[tag] = words;
        });

        setTagFilteredWords(tagWordsMap);
        props.applyFilterCallback(selectedTags);
    };

    return (
        <form onSubmit={handleClick}>
            <div className="searchfilter">
                <h2>Start your adventures from:</h2>
                <div>
                    <div className="search" style={{ textAlign: 'center' }}>
                        <span className="material-icons search-icon" aria-hidden="true">
                            search
                        </span>
                        <input type="search-box" placeholder="Search List Title" aria-label="search" />
                    </div>
                    <div className="filter" style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <Dropdown show={isFilterOpen} onClose={handleCloseDropdown}>
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
                                            {TAGS_DATA.map((tagObj) => (
                                                <p key={tagObj.id} onClick={() => handleTagChange(tagObj.word)}>
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
                        <div className="submit-button">
                            <button
                                id="submitButton"
                                type="submit"
                                className="btn btn-success"
                                style={{ fontSize: '15px', padding: '5px 20px' }}
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                    <div>
                        <div className='cardsDisplay'>
                            {selectedTags.map((tag, index) => (
                                <div key={index} className="row-cols-8">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">{`Selected Tag: ${tag}`}</h5>
                                            <ul>
                                                {tagFilteredWords[tag] &&
                                                    tagFilteredWords[tag].map((word, index) => (
                                                        <li key={index}>{word}</li>
                                                    ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}