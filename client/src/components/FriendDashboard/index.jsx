// FRIEND MODAL!!!!!

import { useState } from "react";
import FriendModal from "./FriendModal";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";

import './FriendDashboard.css'
import FriendPreferences from "./FriendPreferences";
import FriendSearch from "./FriendSearch";

const FriendDashboard = () => {

  const { loading, data, error } = useQuery(QUERY_ME);

  const userData = data?.me || {};
  console.log('User Data:', userData);

  const [friendsArr, setFriendsArr] = useState(
    userData.friends || []
  );

  // console.log('Friends Arr:', friendsArr);

  return (
    <div className="select-friend-dashboard">
      <div className="center">
        <div className="pref-container">
          <p>Select Friends...It's time to Eat!</p>
          <FriendSearch />
          {/* <ul>
            {userData.friends?.map((friend) => (
              <li key={friend.username}>{friend.username}</li>
            ))}
          </ul> */}
          {/* <FriendPreferences friends={friendsArr}/> */}

          <div className="center">
            <FriendModal friends={friendsArr} />
          </div>

        </div>

      </div>

    </div>
  );
};

export default FriendDashboard;
