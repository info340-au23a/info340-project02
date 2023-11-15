import React from "react";
import "./navbar.css";

export function NavBar(props) {
  return (
    <nav>
      <a href="index.html" class="navbar-logo">
        <img src="img/logo.png" alt="Spelling Adventures" />
      </a>
      <ul>
        <li>
          <a href="index.html">Home</a>
        </li>
        <li>
          <a href="./src/flip-cards.html">Flip Cards</a>
        </li>
        <li>
          <a href="./src/quiz.html">Quiz</a>
        </li>
        <li>
          <a href="./src/wordlists.html">Create</a>
        </li>
        <li>
          <a href="./src/search.html">
            <span className="material-icons" aria-label="Search">
              search
            </span>
          </a>
        </li>
        <li>
          <a href="./src/account.html">
            <span className="material-icons" aria-label="Account">
              person
            </span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
