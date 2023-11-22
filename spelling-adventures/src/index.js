import ReactDOM from "react-dom/client";
import { App } from "./components/App";
import WORDS_DATA from "./components/data/words-data.json";
import SAMPLE_ACCOUNTS from './components/data/sample-accounts.json';
import TAGS_DATA from "./components/data/tags.json";


import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App wordsData={WORDS_DATA} accountsData={SAMPLE_ACCOUNTS} tagsData={TAGS_DATA}/>);