import FavoritesList from "../components/FavoritesList";
import Auth from "../utils/auth";
import { useState, useEffect } from "react";
import NoAccess from "../components/NoAccess";

export default function Favorites() {
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
    <div className="bgFavoritesPage">
      <div className="container">
        <h2>Favorites Page</h2>
        <FavoritesList />
      </div>
    </div>
  );
}
