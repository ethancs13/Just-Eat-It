import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { QUERY_USER_BY_USERNAME } from "../../utils/queries";
import FriendModal from "./FriendModal";

import { Box, Input, Button, ChakraProvider, Flex } from "@chakra-ui/react";

const useMessageTimeout = (message, setMessage) => {
    useEffect(() => {
      if (message) {
        const timeout = setTimeout(() => {
          setMessage("");
        }, 3000);
        return () => clearTimeout(timeout);
      }
    }, [message, setMessage]);
  };

const FriendSearch = () => {
  const [searchFriend, setSearchFriend] = useState({ friendName: "" });
  const [friendFavorites, setFriendFavorites] = useState([]);
  const [noUserFound, setNoUserFound] = useState(null);
  const [getUser, { loading, error, data }] = useLazyQuery(QUERY_USER_BY_USERNAME, {
    onCompleted: (result) => setFriendFavorites(result),
    onError: (error) => setNoUserFound('User not found.  Please try searching for another user.'),
  });

  useMessageTimeout(noUserFound, setNoUserFound);

  const handleChange = (e) => {
    const newValue = e.target.value;

    setSearchFriend((currData) => {
      currData.friendName = newValue;
      return { ...currData };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    //   setFriendFavorites([]);
      await getUser({ variables: { username: searchFriend.friendName } });

      setSearchFriend({ friendName: "" });
      
    } catch (err) {
      console.error("Error querying user data:", err);
    }
  };

  useEffect(() => {
    if (data) {
      setFriendFavorites(data.user.savedCuisines || []);
      console.log('Friend Favorites:', friendFavorites);
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
        {noUserFound && <p className="no-user">{noUserFound}</p>}
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
