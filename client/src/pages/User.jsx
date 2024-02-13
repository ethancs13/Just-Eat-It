import Auth from "../utils/auth";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import NoAccess from "../components/NoAccess";
import Cuisine from "../components/Cuisine";
import FriendDashboard from "../components/FriendDashboard";
import { QUERY_ME } from "../utils/queries";

export default function User() {
  const token = Auth.getToken();
  const [loggedIn, setLoggedIn] = useState(Auth.loggedIn());
  const { loading, error, data } = useQuery(QUERY_ME);

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
      <div className="container welcome">
        <h2 className="welcome-header">Welcome,{data?.me.username}</h2>
        <Cuisine />
        <FriendDashboard />
      </div>
    </div>
  );
}
