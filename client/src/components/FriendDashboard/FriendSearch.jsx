import { useState } from "react";
import { useQuery } from "@apollo/client";
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

    const [ searchFriend, setSearchFriend ] = useState({friendName: ""});

    const handleChange = (e) => {
        const newValue = e.target.value;
        console.log('New Value:', newValue);

        setSearchFriend(currData => {
            currData.friendName = newValue;
            return {...currData};
        })
    }

      const search = async () => {
        // const data = await handleSearch(location, cuisine);
        // setResults(data.businesses);
        setSearchFriend({friendName: ""})
      };

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
                    <Button colorScheme="orange" size="lg" ml={2} onClick={search}>
                        Search
                    </Button>
                </Flex>
            </Box>
        </ChakraProvider>

    )
}

export default FriendSearch;