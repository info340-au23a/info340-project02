import React from "react";
import "./header.css";

export function Header(props) {
  return (
    <header>
      <nav>
        <a href="index.html" class="navbar-logo">
          <img src="img/logo.png" alt="Spelling Adventures" />
        </a>
        <ul>
          <li>
            <a href="index.html">Home</a>
          </li>
          <li>
            <a href="code/flip-cards.html">Flip Cards</a>
          </li>
          <li>
            <a href="code/quiz.html">Quiz</a>
          </li>
          <li>
            <a href="code/list-builder.html">Create</a>
          </li>
          <li>
            <a href="code/search.html">
              <span class="material-icons" aria-label="Search">
                search
              </span>
            </a>
          </li>
          <li>
            <a href="code/account.html">
              <span class="material-icons" aria-label="Account">
                person
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}