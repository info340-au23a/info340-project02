import React from "react";
import { AccountSettings } from "./AccountSettings.js";
import { NavBar } from "./NavBar.js";
import { Footer } from "./Footer.js";

export function AccountPage(props) {
  return (
    <div>
    <header>
      <NavBar />
    </header>
    <main>
      <div>
      <h1>Your Account</h1>
      </div>
      <AccountSettings  currentUser={props.currentUser} changeUserFunction={props.changeUser} />
    </main>
    <Footer />
  </div>
  );
}
