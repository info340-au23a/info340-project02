import React from "react";

import { getAuth, GoogleAuthProvider, EmailAuthProvider } from "firebase/auth";

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import DEFAULT_USERS from "./data/sample-accounts.json";

const firebaseUIConfig = {
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,
    { provider: EmailAuthProvider.PROVIDER_ID, requiredDisplayName: true },
  ],
  signInFlow: "popup",
  credentialHelper: "none",
  signInSuccessUrl: '/home',
  callbacks: {
    signInSuccessWithAuthResuIt: () => {
      return false;
    },
  },
};

export function SignInPage(props) {
  console.log(DEFAULT_USERS);

  return (
    <div className="sign-in">
    <div className="card bg-light">
          <StyledFirebaseAuth
            firebaseAuth={getAuth()}
            uiConfig={firebaseUIConfig}
          />
        </div>
    </div>
  );
}

export default SignInPage;
