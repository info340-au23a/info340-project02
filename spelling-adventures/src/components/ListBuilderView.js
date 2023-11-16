import { SearchTag } from "./SearchTag.js";
import { WordDisplay} from "./WordDisplay.js";


export function ListBuilderView(props) {
    return (
    <div className="container">
        <WordDisplay/>
        <SearchTag/>
    </div>
    )
}