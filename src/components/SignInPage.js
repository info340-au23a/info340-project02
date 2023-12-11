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
  // const { changeUserFunction } = props;

  // const handleClick = (event) => {
  //   const whichUser = event.currentTarget.name;
  //   const selectedUserObj =
  //     DEFAULT_USERS.filter((userObj) => userObj.userId === whichUser)[0] ||
  //     DEFAULT_USERS[0];

  //   changeUserFunction(selectedUserObj);
  // };

  // const userButtons = DEFAULT_USERS.map((userObj) => {
  //   if(userObj.userId === currentUser.userId){
  //     return null; //don't include!
  //   }
  //   return (
  //     <Dropdown.Item className="user-icon" key={userObj.userName}
  //       name={userObj.userId} onClick={handleClick}
  //     >
  //       <img src={userObj.userImg} alt={userObj.userName + " avatar"} />
  //       {userObj.userName}
  //     </Dropdown.Item>
  //   )
  // })

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
