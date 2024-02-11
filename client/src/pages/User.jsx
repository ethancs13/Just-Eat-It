import Auth from "../utils/auth";
import { useState, useEffect } from "react";
import NoAccess from "../components/NoAccess";
import Cuisine from "../components/Cuisine";
import FriendDashboard from "../components/FriendDashboard";

export default function User() {
  const token = Auth.getToken();
  const [loggedIn, setLoggedIn] = useState(Auth.loggedIn());

  useEffect(() => {
    if (!loggedIn && token) {
      setLoggedIn(true);
    }
  }, [loggedIn, token]);

  useEffect(() => {
    if (!loggedIn && !token) {
      console.log("User is not logged in");
    }
  }, [loggedIn, token]);

  if (!loggedIn) {
    return <NoAccess />;
  }

  return (
    <div className="bgUserPage">
      <div className="container">
        <h2>User Page</h2>
        <Cuisine />
        <FriendDashboard />
      </div>
    </div>
  );
}
