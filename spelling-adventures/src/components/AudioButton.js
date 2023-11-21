import React from 'react';

export default function AudioButton(props) {
    return (
        <button onClick={props.onClick} name={props.name} className={props.active ? 'active' : ''}>
            {/* Audio button content */}
        </button>
    );
}
