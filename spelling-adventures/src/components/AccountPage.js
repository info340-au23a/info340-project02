import React, { useState } from "react";

export function AccountPage(props) {
  const { currentUser } = props;
  const [updateMessage, setUpdateMessage] = React.useState("");
  const [darkMode, setDarkMode] = useState(currentUser.darkMode);
  const [notifications, setNotifications] = useState(currentUser.notifications);

  // saves changes and updates profile/settings
  const handleUpdateSettings = () => {
    setUpdateMessage("Settings updated successfully!");
    console.log("Settings updated successfully!");
    setTimeout(() => setUpdateMessage(""), 3000);
  };

  const handleEditProfile = () => {
    // Logic to open modal or navigate to edit page
  };
  
  // toggles darkmode
  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  // toggles notifications
  const handleNotificationToggle = () => {
    setNotifications(!notifications)
  };

  return (
    <main>
      <h1>Your Account</h1>
      <div className="account-details">
        <img
          src={currentUser.userImg}
          alt={`${currentUser.userName}'s profile`}
          className="profile-image"
        />
        <h2>Profile Details</h2>
        <p>Username: {currentUser.userName}</p>
        <button onClick={handleEditProfile}>Edit Profile</button>      </div>
      <div className="account-settings">
        <h2>Settings</h2>
        <p>
          Notifications:
          <input
            type="checkbox"
            checked={notifications}
            onChange={handleNotificationToggle}
            aria-label="Toggle Notifications"
          />
        </p>
        <p>
          {" "}
          Dark Mode:
          <input
            type="checkbox"
            checked={darkMode}
            onChange={handleDarkModeToggle}
            aria-label="Toggle Dark Mode"
          />
        </p>
        <button onClick={handleUpdateSettings}>Update Settings</button>      </div>
    </main>
  );
}
