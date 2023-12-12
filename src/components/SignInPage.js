import React from "react";

import { getAuth, GoogleAuthProvider, EmailAuthProvider } from "firebase/auth";

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

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
