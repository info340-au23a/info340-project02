import React from "react";

export function NavBar(props) {
  return (
    <nav>
      <a href="#/" className="navbar-logo">
        <img src="/img/logo.png" alt="Spelling Adventures" />
      </a>
      <ul>
        <li>
          <a href="#/">Home</a>
        </li>
        <li>
          <a href="#/">Flip Cards</a>
        </li>
        <li>
          <a href="#/">Quiz</a>
        </li>
        <li>
          <a href="#/">Create</a>
        </li>
        <li>
          <a href="#/">
            <span className="material-icons" aria-label="Search">
              search
            </span>
          </a>
        </li>
        <li>
          <a href="#/">
            <span className="material-icons" aria-label="Account">
              person
            </span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
