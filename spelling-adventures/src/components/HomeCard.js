import React from 'react';
import PropTypes from 'prop-types'; 
import './HomeCard.css';

const HomeCard = ({ imageLink, imgAltText, cardText, link }) => {
    return (
        <a href={link} className="card-link">
            <div className="card">
                <img src={imageLink} alt={imgAltText} />
                <p>{cardText}</p>
            </div>
        </a>
    );
};


export default HomeCard;