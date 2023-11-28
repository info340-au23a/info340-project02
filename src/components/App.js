import React, { useState } from "react";

import { HomePage } from "./HomePage.js";
import { ListBuilderPage } from "./ListBuilderPage.js";
import { FlipCardPage } from "./FlipCardPage.js";
import { AccountPage } from "./AccountPage.js"
import { QuizPage } from "./QuizPage.js";
import { SearchFilterPage } from "./SearchFilterPage.js";

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
      <HomePage />
      <FlipCardPage wordsData={props.wordsData} />
      <QuizPage wordList={props.wordsData} />
      <ListBuilderPage tagsData={props.tagsData}/>
      <SearchFilterPage applyFilterCallback={handleFilterApply} wordSets={props.wordSets} tagsData={props.tagsData}/>
      <AccountPage currentUser={currentUser} changeUserFunction={changeUser} />
    </div>
  );
}