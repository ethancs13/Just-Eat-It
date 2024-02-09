import { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";

import {
    Box,
    Input,
    Select,
    Button,
    ChakraProvider,
    Flex,
} from "@chakra-ui/react";

const FriendSearch = () => {

    const [ searchedFriend, setSearchedFriend ] = useState({username: ""})
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
          search();
        }
      };

      const search = async () => {
        const data = await handleSearch(location, cuisine);
        setResults(data.businesses);
      };

    return (
        <ChakraProvider>
            <Box className="searchContainer" p={4}>
                <Flex align="center" justify="center">
                    <Input
                        placeholder="Search for a friend"
                        flex={2}
                        size="lg"
                        color="orange"
                        borderColor="orange"
                        _focus={{ borderColor: "orange.500" }}
                        // onChange={(e) => setLocation(e.target.value)}
                        onKeyDown={handleKeyDown}
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