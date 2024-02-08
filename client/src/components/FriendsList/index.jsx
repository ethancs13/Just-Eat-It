import { useQuery } from "@apollo/client";
import { QUERY_ALL_USERS, QUERY_ME } from "../../utils/queries";
import FriendCard from "../FriendCard";
import { useState } from "react";
import { ADD_FRIEND } from "../../utils/mutations";
import { useMutation } from "@apollo/client";

const FriendsList = () => {
  const { loading, data } = useQuery(QUERY_ALL_USERS);

  const currentFriends = data?.allUsers || [];

  console.log("userdata:", data);

  const [addFriend] = useMutation(ADD_FRIEND);
  const [savedFriends, setSavedFriends] = useState(
    currentFriends.savedFriends || []
  );

  const handleAdd = async (friend) => {
    const friendData = {
      _id: friend._id,
      username: friend.username
    }
    try {
      const { data } = await addFriend({
        variables: { friendData },
      });

      Auth.login(data.addFriend.token);
    } catch (err) {
      console.error(err);
      alert("An error occurred while registering the user.");
    }
  };


  const handleUpdateFriends = async () => {
    // Refetch user data to update savedCuisines
    await refetch();
    setSavedFriends(userData.savedFriends || []);
  };
  

  return (
    <div className="d-inline-flex justify-content-start">
      <div className="w-50">
        <h1 >Friends</h1>
      </div>
      <div className="row card-container d-flex justify-content-start w-50">
        <h1>Add Friends</h1>
        {currentFriends?.map((friend) => (
          <FriendCard key={friend._id} friend={friend} add={handleAdd} onUpdate={handleUpdateFriends}/>
        ))}
      </div>
    </div>
  );
};

export default FriendsList;
