import React, { useState } from "react";
import "whatwg-fetch";
import { HomePage } from "./HomePage.js";
import { ListBuilderPage } from "./ListBuilderPage.js";
import { FlipCardPage } from "./FlipCardPage.js";
import { AccountPage } from "./AccountPage.js";
import { QuizPage } from "./QuizPage.js";
import { SearchFilterPage } from "./SearchFilterPage.js";
import { Routes, Route, Navigate } from "react-router";

export function App(props) {
  const [currentUser, setCurrentUser] = useState(props.accountsData[1]);
  const [wordSets, setWordSets] = useState(props.wordSets);

  console.log(wordSets);
  const changeUser = (newUserObj) => {
    setCurrentUser(newUserObj);
  };

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
        <Route path="home" element={<HomePage />} />
        <Route
          path="flipcard"
          element={<FlipCardPage data={props.wordsData} />}
        />
        <Route path="quiz" element={<QuizPage data={props.wordsData} />} />
        <Route
          path="create"
          element={
            <ListBuilderPage
              tagsData={props.tagsData}
              wordSets={wordSets}
              setWordSets={setWordSets}
            />
          }
        />
        <Route
          path="search-filter"
          element={
            <SearchFilterPage
              applyFilterCallback={handleFilterApply}
              wordSets={wordSets}
              tagsData={props.tagsData}
            />
          }
        />
        <Route
          path="account"
          element={
            <AccountPage
              currentUser={currentUser}
              changeUserFunction={changeUser}
            />
          }
        />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}
