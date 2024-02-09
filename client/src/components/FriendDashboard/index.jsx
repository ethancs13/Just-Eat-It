// FRIEND MODAL!!!!!

import { useState } from "react";
import FriendModal from "./FriendModal";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";

import './FriendDashboard.css'

const FriendDashboard = () => {
  const { loading, data, error } = useQuery(QUERY_ME);

  const userData = data?.me || {};
  console.log('User Data:', userData);

  // const [savedCuisines, setSavedCuisines] = useState(
  //   userData.savedCuisines || []
  // );

  // if (loading) return <p>Loading...</p>;

  // const handleUpdateCuisines = async () => {
  //   // Refetch user data to update savedCuisines
  //   await refetch();
  //   setSavedCuisines(userData.savedCuisines || []);
  // };

  return (
    <div className="select-friend-dashboard">
      <div className="center">
        <div className="pref-container">
          <p>Select Friends...It's time to Eat!</p>
          <ul>
            {userData.friends?.map((friend) => (
              <li key={friend.username}>{friend.username}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="center">
        <FriendModal friends={[userData.friends]} />
      </div>
    </div>
  );
};

export default FriendDashboard;
