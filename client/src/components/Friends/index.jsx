import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { REMOVE_FRIEND } from "../../utils/mutations";
import FriendsSearchAdd from "./FriendsSearchAdd";

const FriendsSection = () => {
  const { loading, error, data, refetch } = useQuery(QUERY_ME);
  const [removeFriend] = useMutation(REMOVE_FRIEND);

  const [friends, setFriends] = useState([]);

  useEffect(() => {
    if (data) {
      setFriends(data.me.friends || []);
    }
  }, [data]);

  const handleRemoveFriend = async (friendId) => {
    try {
      await removeFriend({
        variables: {
          friendId: friendId,
        },
      });
      // Refetch user data to update the friends list
      refetch();
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h3>Friends Section</h3>
      <div>
        <FriendsSearchAdd />
      </div>
      <div>
        <p style={{ color: "blue" }}>Friends</p>
        <ul>
          {friends.map((friend) => (
            <li key={friend._id}>
              {friend.username}
              <button onClick={() => handleRemoveFriend(friend._id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FriendsSection;
