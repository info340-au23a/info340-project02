import React from 'react';
import { Link } from 'react-router-dom';

export function BackButton(props) {
  return (
    <div className="exitButtonContainer">
      <Link to={props.type}>
        <button>Go Back</button>
      </Link>
    </div>
  );
}
