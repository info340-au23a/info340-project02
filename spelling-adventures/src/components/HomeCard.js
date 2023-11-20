import React from "react";
import "./homecard.css";
import homeCardData from "./data/homecard-data.json";

// returns a list of HomeCards
export function HomeCardList(props) {
    // creates an array of HomeCards
    const cardArray = homeCardData.map((card, index) => (
      <HomeCard
        key={index}
        cardText={card.cardText}
        cardLink={card.cardLink}
        imgLink={card.imgLink}
        imgAltText={card.imgAltText}
      />
    ));
  
    // returns the HomeCard array
    return (
      <div id="card-container">
        {cardArray}
      </div>
    );
  }

// returns an individual HomeCard component
export function HomeCard(props) {
  return (
    <a href={props.cardLink} className="card-link">
      <div className="card">
        <img src={props.imgLink} alt={props.imgAltText} />
        <p>{props.cardText}</p>
      </div>
    </a>
  );
}
