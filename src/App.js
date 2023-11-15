import React from 'react';

import { SearchTag } from './SearchTag.js';
import { WordDisplay } from './WordDisplay.js';
import { ListButtons } from './ListButtons.js';

function App (props) {

    return (
        <section className='container'>
        <SearchTag/>
        <ListButtons/>
        <WordDisplay/>
        </section>
    );
}

export default App;