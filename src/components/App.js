import React, { useEffect, useState } from "react";
import "whatwg-fetch";
import { NavBar } from './NavBar.js';
import { HomePage } from "./HomePage.js";
import { ListBuilderPage } from "./ListBuilderPage.js";
import { FlipCardPage } from "./FlipCardPage.js";
import AccountPage from "./AccountPage.js";
import { QuizPage } from "./QuizPage.js";
import { Routes, Route, Navigate, useNavigate } from "react-router";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SignInPage from './SignInPage.js';

import DEFAULT_USERS from "./data/sample-accounts.json";

export function App(props) {
  const [currentUser, setCurrentUser] = useState(props.accountsData[0]);
  const [wordSets, setWordSets] = useState([]);

  const { wordsData, tagsData } = props;

  const navigateTo = useNavigate();

  const handleImageUpdate = (newImageUrl) => {
    setCurrentUser((prevUser) => ({ ...prevUser, userImg: newImageUrl }));
  };

  const handleDisplayNameUpdate = (newDisplayName) => {
    setCurrentUser((prevUser) => ({ ...prevUser, userName: newDisplayName }));
  };

  // Handles User Auth
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in, construct the user object from the auth data
        const userToSet = {
          userId: firebaseUser.uid,
          userName: firebaseUser.displayName || 'No name', // Fallback to 'No name' if displayName is null
          userImg: firebaseUser.photoURL || "/img/profile-pictures/null.png", // Fallback to a default image if photoURL is null
        };
        setCurrentUser(userToSet);
      } else {
        // No user is signed in, redirect or set to null user
        setCurrentUser(DEFAULT_USERS[0]); // or simply setCurrentUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
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

  console.log("wordset", wordSets);
  return (
    <div className="appContainer">
      <NavBar currentUser={currentUser} changeUserFunction={changeUser} />
      <Routes>
        <Route path="home" element={<HomePage currentUser={currentUser} />} />
        <Route path="/flipcard/:wordListId" element={<FlipCardPage wordSets={wordSets} currentUser={currentUser} applyFilterCallback={handleFilterApply} tagsData={tagsData} />} />
        <Route
          path="flipcard"
          element={<FlipCardPage wordSets={wordSets} currentUser={currentUser} applyFilterCallback={handleFilterApply} tagsData={tagsData} />}
        />
        
        <Route path="/quiz/:wordListId" element={<QuizPage wordSets={wordSets} currentUser={currentUser} applyFilterCallback={handleFilterApply} tagsData={tagsData} />} />
        <Route path="quiz" element={<QuizPage wordSets={wordSets} currentUser={currentUser} applyFilterCallback={handleFilterApply} tagsData={tagsData} />} />
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
          path="account"
          element={
            <AccountPage
              currentUser={currentUser}
              changeUserFunction={changeUser}
              onImageUpdate={handleImageUpdate}
              onDisplayNameUpdate={handleDisplayNameUpdate}
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
