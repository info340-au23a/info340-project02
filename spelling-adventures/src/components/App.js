import React, { useState } from "react";

import { HomePage } from "./HomePage.js";
import { ListBuilderView } from "./ListBuilderView.js";
import { QuizComponent } from "./Quiz";
import { FlipCard } from "./FlipCard";
import SearchFilter from "./SearchFilter.js";

export function App(props) {
  const [filteredData, setFilteredData] = useState([]);
  const handleFilterApply = (selectedTags) => {
    const newData = props.data.filter((item) =>
        selectedTags.every((tag) => item.tags.includes(tag))
    );
    setFilteredData(newData);
};
  // const [tagSelect, setTagSelect] = useState('');
  // function applyFilter(tags) {
  //   setTagSelect(tags);
  // }

  return (
    <div>
      <HomePage />
      <FlipCard />
      <QuizComponent data={props.data}/>
      <ListBuilderView />
      {/* <SearchFilter applyFilterCallback={handleFilterApply} /> */}
    </div>
  );
}