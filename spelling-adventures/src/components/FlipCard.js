import React, { useState } from 'react';

export function FlipCard(props) {

    const [flip, setFlip] = useState(false);
    
    const handleFlip = () => {
        setFlip(!flip);
    }

    let cardClassName = 'flip-card';
    if (flip) {
      cardClassName += ' flipped';
    }

    return (
    <>
        <h1>Flip Cards!</h1>
        <div className={cardClassName} onClick={handleFlip}>
            <div className='flip-card-front'>
            <img src="./img/apple.png" alt=" an apple" />
            </div>

            <div className='flip-card-back'>
            <span className="material-symbols-outlined volume">volume_up</span>
                <p>Apple</p>
                <p>This Apple is red.</p>
                <p> <span className="speech-type">Noun</span> <span className="object-type">fruit</span></p>  
            </div>
        </div>

        <div className="quiz-next">
            <button>&#8592;</button>
            <button>&#8594;</button>
        </div>
    </>
    )
}