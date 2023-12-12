import React, { useState, useEffect } from "react";
import { QuizComponent } from "./Quiz";
import { Footer } from "./Footer";
import { useParams, useNavigate } from "react-router";
import SearchFilter from './SearchFilter.js';
import { getDatabase, ref, onValue } from "firebase/database";


export function QuizPage(props) {
  const [wordListData, setWordListData] = useState([]);
  const { wordListId } = useParams();
  const currentUser = props.currentUser;
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

  const renderWordListButtons = () => {
    return wordListData.map((wordList) => (
      <div className="quiz-buttons-container" key={wordList.firebaseKey}>
        <button onClick={() => navigate(`/quiz/${wordList.firebaseKey}`)}>
          {wordList.title}
        </button>
      </div>
    ));
  };

  if (wordListId) {
    const selectedWordList = wordListData.find(list => list.firebaseKey === wordListId);
    if (!selectedWordList) {
      return <div>Quiz not found. Please select a different quiz.</div>;
    }
    return (
      <QuizComponent wordList={selectedWordList} currentUser={currentUser}/>
    );
  } else {
    return (
      <main>
        <div className="quizHeader">
          <h1>Word Quiz</h1>
          <h2>How many correct answers can you get?</h2>
        </div>
        <SearchFilter
          wordSets={wordListData}
          tagsData={props.tagsData}
          applyFilterCallback={props.handleFilterApply}
          basePath="/quiz"
        />
        <Footer imageRef="Audio pronunciations provided by Brittanica.com" />
      </main>
    );
  }
}