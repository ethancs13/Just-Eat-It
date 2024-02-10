import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { QUERY_USER_BY_USERNAME } from "../../utils/queries";

import {
    Box,
    Input,
    Select,
    Button,
    ChakraProvider,
    Flex,
} from "@chakra-ui/react";

const FriendSearch = () => {

    const [searchFriend, setSearchFriend] = useState({ friendName: "" });
    const [getUser, {loading, error , data}] = useLazyQuery(QUERY_USER_BY_USERNAME);

    const handleChange = (e) => {
        const newValue = e.target.value;
        console.log('New Value:', newValue);

        setSearchFriend(currData => {
            currData.friendName = newValue;
            return { ...currData };
        })
    }

    // const handleSearch = async () => {

    //     setSearchFriend({ friendName: "" })
    // };

    return (
        <ChakraProvider>
            <Box className="searchContainer friend-dashboard" p={4}>
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
                    <Button colorScheme="orange" size="lg" ml={2} onClick={() =>
                        getUser({ variables: { username: searchFriend.friendName }})
                        }>
                        Find Friend
                    </Button>
                </Flex>
            </Box>

            <div>
                <p>My friends like to eat:</p>
                <ul>
                    {data?.user.savedCuisines.map(cusisine => (
                       <li>{cusisine.name}</li> ))}
                </ul>
            </div>
        </ChakraProvider>

    )
}

export default FriendSearch;