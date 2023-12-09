import ReactDOM from "react-dom/client";
import 'whatwg-fetch';

import { App } from "./components/App";
import WORD_LIST_DATA from "./components/data/demo-word-set.json";
import WORD_SETS from "./components/data/word-lists-set.json";
import SAMPLE_ACCOUNTS from "./components/data/sample-accounts.json";
import TAGS_DATA from "./components/data/tags.json";
import { BrowserRouter } from "react-router-dom";

import { initializeApp } from "firebase/app";

import "./index.css";

const firebaseConfig = {
  apiKey: "AIzaSyBeL0kQyRQr61UvvUptgoLou6YlYhxlcWU",

  authDomain: "info340-spellingadventures.firebaseapp.com",

  projectId: "info340-spellingadventures",

  storageBucket: "info340-spellingadventures.appspot.com",

  messagingSenderId: "613274105813",

  appId: "1:613274105813:web:71305ec8c8ee61a2b52f5c",
};

initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
  <App
    wordsData={WORD_LIST_DATA}
    accountsData={SAMPLE_ACCOUNTS}
    tagsData={TAGS_DATA}
    wordSets={WORD_SETS}
  />
  </BrowserRouter>
);
