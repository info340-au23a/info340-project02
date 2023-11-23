import ReactDOM from "react-dom/client";
import { App } from "./components/App";
import WORD_LIST_DATA from "./components/data/word-list.json";
import WORD_SETS from "./components/data/word-lists-set.json"
import SAMPLE_ACCOUNTS from './components/data/sample-accounts.json';
import TAGS_DATA from "./components/data/tags.json";


import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App wordsData={WORD_LIST_DATA} accountsData={SAMPLE_ACCOUNTS} tagsData={TAGS_DATA} wordSets={WORD_SETS}/>);