import { useState, useEffect } from "react";
import FriendsSection from "../components/Friends";
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

  const styles = {
    card: {
      display: "flex",
      justifyContent: "center",
      textAlign: "center",
    },
  };
  return (
    <div className="bgFriendsPage">
      <div className="container" style={styles.card}>
        <FriendsSection />
      </div>
    </div>
  );
}
