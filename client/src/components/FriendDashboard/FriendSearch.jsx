import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { QUERY_USER_BY_USERNAME } from "../../utils/queries";

import {
    Box,
    Input,
    FormControl,
    Button,
    ChakraProvider,
    Flex,
} from "@chakra-ui/react";

const FriendSearch = () => {

    const [searchFriend, setSearchFriend] = useState({ friendName: "" });
    const [getUser, { loading, error, data }] = useLazyQuery(QUERY_USER_BY_USERNAME);

    const handleChange = (e) => {
        const newValue = e.target.value;
        console.log('New Value:', newValue);

        setSearchFriend(currData => {
            currData.friendName = newValue;
            return { ...currData };
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        getUser({ variables: { username: searchFriend.friendName } })
        setSearchFriend({ friendName: "" })
    };

    return (
        <ChakraProvider>
            <Box className="searchContainer friend-dashboard" p={4}>
                <Flex align="center" justify="center">
                    <form onSubmit={(handleSubmit)}>
               
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
                      

                        <Button type="submit" colorScheme="orange" size="lg" ml={2} >
                            Find Friend
                        </Button>
                    </form>
                </Flex>
            </Box>

            <div>
                <p>{data?.user.username} likes:</p>
                <ul>
                    {data?.user.savedCuisines.map(cuisine => (
                        <li key={cuisine.name}>{cuisine.name}</li>
                    ))}
                </ul>

            </div>
        </ChakraProvider>

    )
}

export default FriendSearch;