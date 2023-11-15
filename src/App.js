import React from 'react';

import { SearchTag } from './SearchTag.js';
import { WordDisplay } from './WordDisplay.js';
import { ListButtons } from './ListButtons.js';

function App (props) {

    return (
        <section className='container'>
        <WordDisplay/>
        <ListButtons/>
        <SearchTag/>
        </section>
    );
}

export default App;