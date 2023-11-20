import React from "react";
import "./navbar.css";

export function NavBar(props) {
  return (
    <nav>
      <a href="index.html" className="navbar-logo">
        <img src="/img/logo.png" alt="Spelling Adventures" />
      </a>
      <ul>
        <li>
          <a href="index.html">Home</a>
        </li>
        <li>
          <a href="./flip-cards.html">Flip Cards</a>
        </li>
        <li>
          <a href="./quiz.html">Quiz</a>
        </li>
        <li>
          <a href="./wordlists.html">Create</a>
        </li>
        <li>
          <a href="./search.html">
            <span className="material-icons" aria-label="Search">
              search
            </span>
          </a>
        </li>
        <li>
          <a href="./account.html">
            <span className="material-icons" aria-label="Account">
              person
            </span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
