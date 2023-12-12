import React, { useState } from "react";
import { Navigate } from "react-router-dom";

import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { getDatabase, ref, set as firebaseSet } from "firebase/database";
import { getAuth, updateProfile } from "firebase/auth";

import { Footer } from "./Footer.js";

export default function AccountPage(props) {
  const [imageFile, setImageFile] = useState(undefined);
  const [displayName, setDisplayName] = useState(props.currentUser.userName); 
  const [newDisplayName, setNewDisplayName] = useState(props.currentUser.userName); 
  let initialURL = props.currentUser.userImg;
  const [imageUrl, setImageUrl] = useState(initialURL);

  const handleDisplayNameChange = (event) => {
    setNewDisplayName(event.target.value); 
  };

  const handleDisplayNameUpdate = async (event) => {
    event.preventDefault();

    if (!newDisplayName) {
      console.log("Display name cannot be empty!");
      return;
    }

    try {
      const auth = getAuth();
      await updateProfile(auth.currentUser, { displayName: newDisplayName });

      const db = getDatabase();
      const userDisplayNameRef = ref(db, "users/" + auth.currentUser.uid + "/displayName");
      await firebaseSet(userDisplayNameRef, newDisplayName);

      setDisplayName(newDisplayName);

      props.onDisplayNameUpdate({
        ...props.currentUser,
        userName: newDisplayName,
      });

    } catch (error) {
      console.error("Error updating display name: ", error);
    }
  };

  const handleImageChange = (event) => {
    if (event.target.files.length > 0 && event.target.files[0]) {
      const imageFile = event.target.files[0];
      setImageFile(imageFile);
      setImageUrl(URL.createObjectURL(imageFile));
    }
  };

  const handleImageUpload = async (event) => {
    event.preventDefault();

    if (!imageFile) {
      console.log("No file selected!");
      return;
    }

    try {
      const storage = getStorage();
      const imageRef = storageRef(
        storage,
        "userImages/" + props.currentUser.uid + ".png"
      );

      await uploadBytes(imageRef, imageFile);
      const url = await getDownloadURL(imageRef);

      const auth = getAuth();
      await updateProfile(auth.currentUser, { photoURL: url });
      console.log("Profile updated!");

      const db = getDatabase();
      const userImgRef = ref(db, "users/" + auth.currentUser.uid + "/userImg");
      await firebaseSet(userImgRef, url);

      setImageUrl(url);

      props.onImageUpdate(url);
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  if (!props.currentUser || props.currentUser.userId === null) {
    // If currentUser is null or userId is null, don't render the page content
    return <Navigate to="/signin" />; // or any other component to indicate the user is not logged in
  }
  return (
    <>
      <div className="account-container">
        <div className="card bg-light">
          <div className="card-body">
            <h1 className="card-title">
              {props.currentUser.userName && displayName + "'s"} Account
            </h1>

            <div className="profilePhotoSettings">
              <h2>Profile Picture</h2>
              <div>
                <img
                  src={imageUrl}
                  alt="user avatar preview"
                  className="mb-2 userImg card-img-top"
                />
              </div>
              <div className="image-upload-form mb-5">
                <input
                  type="file"
                  name="image"
                  id="imageUploadInput"
                  className="d-none"
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="imageUploadInput"
                  className="btn btn-sm btn-secondary mt-2"
                >
                  Choose Image
                </label>
                <button
                  className="btn btn-sm btn-success"
                  onClick={handleImageUpload}
                >
                  Save to Profile
                </button>
              </div>
            </div>
            <div className="displayNameSettings">
              <h2>Display Name</h2>
              <form onSubmit={handleDisplayNameUpdate}>
                <input
                  type="text"
                  value={newDisplayName}
                  onChange={handleDisplayNameChange}
                  className="form-control mb-2" // Bootstrap class for styling
                />
                <button type="submit" className="btn btn-primary">
                  Update Display Name
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer imageRef="" />
    </>
  );
}
