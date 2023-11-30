import React from "react";
import { NavLink } from "react-router-dom";

export function NavBar(props) {
  return (
    <nav>
      <NavLink to="/home" className="navbar-logo">
        <img src="/img/logo.png" alt="Spelling Adventures" />
      </NavLink>
      <ul>
        <li>
          <NavLink to="/home">Home</NavLink>
        </li>
        <li>
          <NavLink to="/flipcard">Flip Cards</NavLink>
        </li>
        <li>
          <NavLink to="/quiz">Quiz</NavLink>
        </li>
        <li>
          <NavLink to="/create">Create</NavLink>
        </li>
        <li>
          <NavLink to="/search-filter">
            <span className="material-icons" aria-label="Search">
              search
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/account">
            <span className="material-icons" aria-label="Account">
              person
            </span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
