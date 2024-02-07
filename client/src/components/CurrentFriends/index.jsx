import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import AuthService from "../../utils/auth";
import { useEffect, useState } from "react";

const CurrentFriends = () => {
  const [friends, setFriends] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const { loading, error, data } = useQuery(QUERY_ME);

  useEffect(() => {
    if (data) {
      setCurrentUser(data.me);
      console.log("data", data)
    }
  }, [data]);

  const getFriends = async (variables) => {
    try {
      const { data } = await AuthService.getUser(variables);
      const friendsArray = data.user.friends;
      setFriends(friendsArray);
      console.log(friendsArray)
    } catch (error) {
      console.error(error, "Error occurred with user login.");
    }
  };

  const handleSubmit = async () => {
    console.log("data", data)
    if (!currentUser) {
      console.error("Error occurred with user login.");
      return;
    }
  
    try {
      const { data } = await getFriends({
        variables: { userId: currentUser._id },
      });
      setFriends(data.user.friends);
    } catch (error) {
      console.error("Error occurred with user login.", error);
    }
  };

  handleSubmit();

  return (
    <>
      {friends.map((friend) => (
        <div key={friend._id}>{friend.username}</div>
      ))}
    </>
  );
};

export default CurrentFriends;