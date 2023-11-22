import React, { useState } from "react";

import { HomePage } from "./HomePage.js";
import { ListBuilderView } from "./ListBuilderView.js";
import { QuizComponent } from "./Quiz";
import { FlipCardPage } from "./FlipCardPage.js";
import { AccountPage } from "./AccountPage.js"
import SearchFilter from "./SearchFilter.js";

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
  };

  return (
    <div>
      {/* <HomePage /> */}
      <FlipCardPage wordsData={props.wordsData} />
      {/* <QuizComponent data={props.wordsData} /> */}
      {/* <ListBuilderView /> */}
      {/* <SearchFilter applyFilterCallback={handleFilterApply} /> */}
      {/* <AccountPage currentUser={currentUser} changeUserFunction={changeUser} /> */}
    </div>
  );
}