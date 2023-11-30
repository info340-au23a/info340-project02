import React, { useState } from "react";

import { HomePage } from "./HomePage.js";
import { ListBuilderPage } from "./ListBuilderPage.js";
import { FlipCardPage } from "./FlipCardPage.js";
import { AccountPage } from "./AccountPage.js"
import { QuizPage } from "./QuizPage.js";
import { SearchFilterPage } from "./SearchFilterPage.js";
import { Routes, Route, Navigate } from "react-router";

export function App(props) {
  const [currentUser, setCurrentUser] = useState(props.accountsData[1]);

  const changeUser = (newUserObj) => {
    setCurrentUser(newUserObj);
  }

  // for SearchFilter
  const [filteredData, setFilteredData] = useState([]);
  const handleFilterApply = (selectedTags) => {
    const newData = props.data.filter((item) =>
      selectedTags.every((tag) => item.tags.includes(tag))
    );
    setFilteredData(newData);
    console.log(filteredData);
  };

  return (
    <div>
      <Routes>
        <Route path="home" element={<HomePage />}/>
        <Route path="flipcard" element={<FlipCardPage wordsData={props.wordsData} />}/>
        <Route path="quiz" element={<QuizPage wordList={props.wordsData} />}/>
        <Route path="create" element={<ListBuilderPage tagsData={props.tagsData}/>}/>
        <Route path="search-filter" element={<SearchFilterPage applyFilterCallback={handleFilterApply} wordSets={props.wordSets} tagsData={props.tagsData}/>}/>
        <Route path="account" element={<AccountPage currentUser={currentUser} changeUserFunction={changeUser} />}/>
        <Route path="*" element={<Navigate to="/home"/>}/>
      </Routes>
    </div>
  );
}