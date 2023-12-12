import React, { useState, useEffect } from "react";
import { FlipCardList } from "./FlipCardList.js";
import { Footer } from "./Footer.js";
import SearchFilter from "./SearchFilter.js";
import { useParams, useNavigate } from "react-router";
import { getDatabase, ref, onValue } from "firebase/database";

export function FlipCardPage(props) {
  const [wordListData, setWordListData] = useState([]);
  const { wordListId } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    const db = getDatabase();
    const wordSetsRef = ref(db, "wordSets"); 

    onValue(wordSetsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const transformedData = Object.keys(data).map(key => ({
          ...data[key],
          firebaseKey: key
        }));
        setWordListData(transformedData);
      }
    });
  }, []);


  if (wordListId) {
    const selectedWordList = wordListData.find(list => list.firebaseKey === wordListId);
    if (!selectedWordList) {
      return <div>Word list not found. Please select a different list.</div>;
    }
    const transformedWords = selectedWordList.words.map(word => ({
      ...word,
      imgSrc: word.imgSrc || 'flipcard/apple.jpg', // Provide default values
      sentence: word.sentence || "No example sentence available."
    }));
    return (
      <div className="flipcard-container">
      <FlipCardList data={transformedWords} />
      </div>
    );
  } else {
    return (
      <>
        <main>
          <div>
            <h1>Flip Cards</h1>
            <h2>Practice your skills</h2>
          </div>
          <SearchFilter
            wordSets={wordListData}
            tagsData={props.tagsData}
            basePath="/flipcard"
          />
        </main>
        <Footer imageRef="Flipcard sample photos originally from Pexels.com | 
        Audio pronunciations created by Brittanica.com" />
      </>
    );
  }
};