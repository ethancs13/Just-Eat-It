import { useState, useEffect } from "react";
import FriendsList from "../components/FriendsList";
import Auth from "../utils/auth";
import NoAccess from "../components/NoAccess";

export default function Friends() {
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
    <div className="container">
      <h2>Friend Page</h2>
      <FriendsList />
    </div>
  );
}
