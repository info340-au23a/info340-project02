import React from "react";
import { Footer } from "./Footer.js"
import SearchFilter from "./SearchFilter.js";

export function SearchFilterPage(props) {

    return (
        <>
        <main>
          <div>
            <h1>Start your adventures from: </h1>
          </div>
          <SearchFilter applyFilterCallback={props.handleFilterApply} wordSets={props.wordSets} tagsData={props.tagsData} />
        </main>
        <Footer />
      </>
    );
}