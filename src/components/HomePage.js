import React from "react";
import { NavBar } from "./NavBar.js";
import { HomeCardList } from "./HomeCardList.js";
import { Footer } from "./Footer.js";

export function HomePage(props) {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main>
        <div className="welcome">
          <h1>
            Welcome to <img src="/img/logo.png" alt="Spelling Adventures" />
          </h1>
        </div>
        <HomeCardList />
      </main>
      <Footer imageRef="Flash card, quiz and list icons originally created by Freepik - Flaticon" />
    </div>
  );
}
