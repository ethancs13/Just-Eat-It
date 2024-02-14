import { useState } from "react";
import FriendModal from "./FriendModal";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";

import "./FriendDashboard.css";
import FriendSearch from "./FriendSearch";

const FriendDashboard = () => {
  const { loading, data, error } = useQuery(QUERY_ME);

  const userData = data?.me || {};

  return (
    <div className="select-friend-dashboard">
      <div className="center">
        <div className="pref-container">
          <p>Select Friends...It's time to Eat!</p>

          <FriendSearch />
        </div>
      </div>
    </div>
  );
};

export default FriendDashboard;
