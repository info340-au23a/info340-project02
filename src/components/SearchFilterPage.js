import React from "react";
import { NavBar } from "./NavBar.js";
import { Footer } from "./Footer.js"
import SearchFilter from "./SearchFilter.js";

export function SearchFilterPage(props) {

    return (
        <div>
        <header>
          <NavBar />
        </header>
        <main>
          <div>
            <h1>Start your adventures from: </h1>
          </div>
          <SearchFilter applyFilterCallback={props.handleFilterApply} wordSets={props.wordSets} tagsData={props.tagsData} />
        </main>
        <Footer />
      </div>
    );
}