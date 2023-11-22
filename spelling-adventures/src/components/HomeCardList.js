import React from "react";
import homeCardData from "./data/homecard-data.json";

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

  return <div className="card-container">{cardArray}</div>;
}

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
