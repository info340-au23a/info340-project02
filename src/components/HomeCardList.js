import React from "react";
import homeCardData from "./data/homecard-data.json";
import { Link } from "react-router-dom";

export function HomeCardList(props) {
  const cardArray = homeCardData.map((card, index) => (
    <HomeCard
      key={index}
      cardText={card.cardText}
      cardLink={card.cardLink}
      imgLink={card.imgLink}
      imgAltText={card.imgAltText}
    />
  ));

  return (
  <div className="card-container">{cardArray}</div>
  );
}

export function HomeCard(props) {
  return (
    <Link to={props.cardLink} className="card-link">
      <div className="card">
        <img src={props.imgLink} alt={props.imgAltText} />
        <h2>{props.cardText}</h2>
      </div>
    </Link>
  );
}
