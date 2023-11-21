import React, { useState } from "react";

import { HomePage } from "./HomePage.js";
import { ListBuilderView } from "./ListBuilderView.js";
import { QuizComponent } from "./Quiz";
import { FlipCard } from "./FlipCard";
import { SearchFilter } from "./SearchFilter.js";

export function App(props) {
  const [tagSelect, setTagSelect] = useState('');
  function applyFilter(tags) {
    setTagSelect(tags);
  }

  return (
    <div>
      <HomePage />
      <FlipCard />
      <QuizComponent data={props.data}/>
      <ListBuilderView />
      {/* <SearchFilter /> */}
    </div>
  );
}