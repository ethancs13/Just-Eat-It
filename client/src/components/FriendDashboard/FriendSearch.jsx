import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { QUERY_USER_BY_USERNAME } from "../../utils/queries";
import FriendModal from "./FriendModal";

import { Box, Input, Button, ChakraProvider, Flex } from "@chakra-ui/react";

const FriendSearch = () => {
  const [searchFriend, setSearchFriend] = useState({ friendName: "" });
  const [friendFavorites, setFriendFavorites] = useState([]);
  const [noUserFound, setNoUserFound] = useState("");
  const [getUser, { loading, error, data }] = useLazyQuery(
    QUERY_USER_BY_USERNAME, {
        onError: (error) => setNoUserSearch("Username not found."),
    }
  );

  const handleChange = (e) => {
    const newValue = e.target.value;
    console.log("New Value:", newValue);

    setSearchFriend((currData) => {
      currData.friendName = newValue;
      return { ...currData };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setFriendFavorites([]);
      await getUser({ variables: { username: searchFriend.friendName } });

      if (!data || !data.user) {
        setNoUserFound('User not found.  Please try searching for another user.');

        setTimeout(() => {
            setNoUserFound("");
        }, 3000);
      }

      setSearchFriend({ friendName: "" });
      console.log("Friend Foods:", data?.user.savedCuisines);
    } catch (err) {
      console.error("Error querying user data:", err);
    }
  };

  useEffect(() => {
    if (data) {
      setFriendFavorites(data.user.savedCuisines || []);
    }
  }, [data]);

  return (
    <ChakraProvider>
      <Box className="searchContainer friend-dashboard" p={4}>
        <Flex align="center" justify="center">
          <form onSubmit={handleSubmit}>
            <Flex align="center" justify="center">
              <Input
                placeholder="Search for a friend"
                flex={2}
                size="lg"
                color="orange"
                borderColor="orange"
                _focus={{ borderColor: "orange.500" }}
                onChange={handleChange}
                name="friendName"
                value={searchFriend.friendName}
              />

              <Button type="submit" colorScheme="orange" size="lg" ml={2}>
                Find Friend
              </Button>
            </Flex>
          </form>
        </Flex>
      </Box>

      <div>
        {noUserFound && <h3>{noUserFound}</h3>}
        <p>{data?.user.username} likes:</p>
        <ul>
          {data?.user.savedCuisines.map((cuisine) => (
            <li key={cuisine.name}>{cuisine.name}</li>
          ))}
        </ul>
      </div>

      <div className="center">
        {friendFavorites && friendFavorites.length > 0 && (
          <FriendModal friendFoods={friendFavorites} />
        )}
      </div>
    </ChakraProvider>
  );
};

export default FriendSearch;
