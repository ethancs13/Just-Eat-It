import { useQuery } from "@apollo/client";
import { QUERY_ALL_USERS } from "../../utils/queries";


const FriendList = ({ friends }) => {

  const [getFriends] = useQuery(QUERY_ALL_USERS);

  const handleSubmit = async () => {
    try {
      const { data } = await getFriends({
        variables: { username: "ethan" },
      });
      console.log(`This is the data: ${data}`);
    } catch (error) {
      console.error(error, "Error occurred with user login.");
    }
  }
  handleSubmit()

  return (
    <>
    </>
  );
};

export default FriendList;