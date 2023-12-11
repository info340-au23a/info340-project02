import React, { useEffect, useState } from "react";
import "whatwg-fetch";
import { NavBar } from './NavBar.js';
import { HomePage } from "./HomePage.js";
import { ListBuilderPage } from "./ListBuilderPage.js";
import { FlipCardPage } from "./FlipCardPage.js";
import AccountPage from "./AccountPage.js";
import { QuizPage } from "./QuizPage.js";
import { SearchFilterPage } from "./SearchFilterPage.js";
import { Routes, Route, Navigate, useNavigate } from "react-router";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SignInPage from './SignInPage.js';

import DEFAULT_USERS from "./data/sample-accounts.json";

export function App(props) {
  const [currentUser, setCurrentUser] = useState(props.accountsData[0]);
  const [wordSets, setWordSets] = useState(null);

  const { wordsData, tagsData } = props;

  const navigateTo = useNavigate();

  // Handles User Auth
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, function (firebaseUser) {
      console.log("login status changed");
      console.log(firebaseUser);

      if (firebaseUser === null) {
        console.log("logged out");
        setCurrentUser(DEFAULT_USERS[0]);
      } else {
        console.log("logged in as ", firebaseUser.displayName);
        firebaseUser.userId = firebaseUser.uid;
        firebaseUser.userName = firebaseUser.displayName;
        firebaseUser.userImg = firebaseUser.photoURL || "img/null.png";

        setCurrentUser(firebaseUser);
      }
    });
  }, []);

  // Pulls from MW API (Arrays of Objs & Arrays of Strings)
  useEffect(() => {
    const db = getDatabase();
    const allWordSetsRef = ref(db, "wordSets");

    onValue(allWordSetsRef, (snapshot) => {
      const allWordSetsObj = snapshot.val();

      if (allWordSetsObj === null) {
        setWordSets([]); //no content
        return; //break;
      }

      const keyArray = Object.keys(allWordSetsObj);
      const allWordSetsArray = keyArray.map((keyString) => {
        const wordSetObj = allWordSetsObj[keyString];
        wordSetObj.firebaseKey = keyString;
        return wordSetObj;
      });
      setWordSets(allWordSetsArray); //update state & rerender
    });
  }, []);

  console.log("wordset", wordSets);
  const changeUser = (userObj) => {
    console.log("logging in as", userObj.userName);
    setCurrentUser(userObj);
    if (userObj.userId !== null) {
      navigateTo("/home"); //go to chat after login
    }
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
    <div className="appContainer">
      <NavBar currentUser={currentUser} changeUserFunction={changeUser} />
      <Routes>
        <Route path="home" element={<HomePage currentUser={currentUser} />} />
        <Route
          path="flipcard"
          element={<FlipCardPage data={wordsData} currentUser={currentUser} />}
        />
        <Route path="quiz" element={<QuizPage data={wordSets} currentUser={currentUser} />} />
        <Route
          path="create"
          element={
            <ListBuilderPage
              currentUser={currentUser}
              tagsData={tagsData}
              wordSets={wordSets}
              setWordSets={setWordSets}
            />
          }
        />
        <Route
          path="search-filter"
          element={
            <SearchFilterPage
              currentUser={currentUser}
              applyFilterCallback={handleFilterApply}
              wordSets={wordSets}
              tagsData={tagsData}
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
        <Route
          path="signin"
          element={
            <SignInPage
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
