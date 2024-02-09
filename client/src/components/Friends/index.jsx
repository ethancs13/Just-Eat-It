import FriendsSearchAdd from "./friendsSearchAdd";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";

const FriendsSection = () => {
  const { data } = useQuery(QUERY_ME);

  const userData = data?.me || {};

  const [friends, setFriends] = useState(userData.friends || []);

  useEffect(() => {
    // Update friends state after refetching user data
    if (data) {
      setFriends(data.me.friends || []);
    }
  }, [data]);

  return (
    <div>
      <h3>Friends Section</h3>
      <div>
        <FriendsSearchAdd />
      </div>
      <div>
        {/* Added temporary styling */}
        <p style={{ color: "blue" }}>Friends</p>
        <ul>
          {friends.map((friend) => (
            <li key={friend._id}>{friend.username}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FriendsSection;
