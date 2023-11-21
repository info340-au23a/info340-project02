import { SearchTag } from "./SearchTag.js";
import { WordDisplay} from "./WordDisplay.js";


export function ListBuilderView(props) {
    return (
        <>
          <h1>Word List Builder</h1>
          <div className="input-bar">
            <label htmlFor="list-title">
              <input type="text" id="list-title" placeholder="List Title" />
            </label>
          </div>
      
          <div className="input-bar">
            <label htmlFor="search-word">
              <span className="material-icons" aria-label="Search"></span>
              <input type="text" id="search-word" placeholder="Search" />
            </label>
          </div>
          <div className="container">
            <WordDisplay />
            <div className="word-buttons">
              <button>Remove</button>
              <button>Add</button>
              <button>Submit</button>
            </div>
            <SearchTag />
          </div>
        </>
      );
}