import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";

import FriendCard from "../FriendCard"

const FriendsList = () => {
  const { loading, data } = useQuery(QUERY_ME);
  console.log("userdata:", data)

  const currentFriends = data?.me.friends || [];

  return (
    <div className="row card-container">
      {/* {currentFriends.map((friend) => (
        <FriendCard friend={friend} />
      ))} */}
    </div>
  );
};

export default FriendsList;