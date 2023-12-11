import React from "react";
import { NavLink } from "react-router-dom";

import { signOut, getAuth } from "firebase/auth";

export function NavBar(props) {
  const { currentUser } = props;

  const handleSignOut = (event) => {
    console.log("signing out");
    signOut(getAuth());
  };

  return (
    <header className="text-light px-1 d-flex justify-content-between">
      <NavLink to="/home" className="navbar-logo">
        <img
          className="logoImg"
          src="/img/logo.png"
          alt="Spelling Adventures"
        />
      </NavLink>
      <nav>
        <ul className="nav">
          <li className="nav-item">
            <NavLink to="/home">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/flipcard">Flip Cards</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/quiz">Quiz</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/create">Create</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/search-filter">
              <span className="material-icons" aria-label="Search">
                search
              </span>
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/account">
              <span className="material-icons" aria-label="Account">
                person
              </span>
            </NavLink>
          </li> */}
          {currentUser.userId && (
            <>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/account"
                >
                  <img
                    className="userImg"
                    src={currentUser.userImg || "img/profile-pictures/null.png"}
                    alt={
                      currentUser.userName
                        ? currentUser.userName + " avatar"
                        : "Default avatar"
                    }
                  />
                </NavLink>
              </li>
              <li className="nav-item nav-btn">
                <button
                  className="btn btn-secondary ms-2"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </li>
            </>
          )}
          {!currentUser.userId && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/signin">
                <button
                  className="btn btn-secondary ms-2"
                >
                  Sign In
                </button>
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}