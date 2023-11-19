import { SearchTag } from "./SearchTag.js";
import { WordDisplay} from "./WordDisplay.js";


export function ListBuilderView(props) {
    return (
    <div className="container">
        <WordDisplay/>
        <div className="word-buttons">
            <button>Remove</button>
            <button>Add</button>
            <button>Submit</button>
        </div>
        <SearchTag/>
    </div>
    )
}