import React, { useState } from "react";

import { HomePage } from "./HomePage.js";
import { ListBuilderView } from "./ListBuilderView.js";
import { QuizComponent } from "./Quiz";
import { FlipCard } from "./FlipCard";
import { AccountPage } from "./AccountPage.js"
import SearchFilter from "./SearchFilter.js";
import SAMPLE_ACCOUNTS from './data/sample-accounts.json';

export function App(props) {
  
  // user account management
  const [currentUser, setCurrentUser] = useState(SAMPLE_ACCOUNTS[1]);
  const userObj = SAMPLE_ACCOUNTS[1];

  // changes user
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
  };

  return (
    <div>
      <HomePage />
      <FlipCard />
      <QuizComponent data={props.data} />
      <ListBuilderView />
      {/* <SearchFilter applyFilterCallback={handleFilterApply} /> */}
      <AccountPage currentUser={currentUser} changeUserFunction={changeUser} />
    </div>
  );
}