import { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_CUISINES } from "../../utils/queries";
import { handleSearch, getRandomRestaurant } from "../../utils/API";
import SearchResults from "../SearchResults";
import IntroText from "./IntroText";
import {
  Box,
  Input,
  Select,
  Button,
  ChakraProvider,
  Flex,
} from "@chakra-ui/react";

const SearchComponent = () => {
  const [location, setLocation] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [results, setResults] = useState([]);

  // Fetch all cuisines
  const { data } = useQuery(QUERY_ALL_CUISINES);

  const search = async () => {
    const data = await handleSearch(location, cuisine);
    setResults(data.businesses);
  };

  const random = async () => {
    const data = await getRandomRestaurant(location, cuisine);
    setResults([data]);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      search();
    }
  };

  return (
    <ChakraProvider>
      <IntroText />
      <Box
        className="searchContainer"
        p={4}
        mt={results.length > 0 ? "0" : "10%"}
      >
        <Flex align="center" justify="center">
          <Select
            placeholder="Select Food Preferences"
            flex={1}
            size="lg"
            fontSize="md"
            color="orange"
            borderColor="orange"
            ml={2}
            mr={2}
            _focus={{ borderColor: "orange.500" }}
            onChange={(e) => setCuisine(e.target.value)}
          >
            {/* Map through cuisines if data is available */}
            {data?.allCuisines &&
              data.allCuisines.map((cuisine) => (
                <option key={cuisine.cuisineId} value={cuisine.name}>
                  {cuisine.name}
                </option>
              ))}
          </Select>
          <Input
            placeholder="Search by city"
            flex={2}
            size="lg"
            color="orange"
            borderColor="orange"
            _focus={{ borderColor: "orange.500" }}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button colorScheme="orange" size="lg" ml={2} onClick={search}>
            Search
          </Button>
          <Button colorScheme="orange" size="lg" ml={2} onClick={random}>
            Just Eat It!
          </Button>
        </Flex>
        <SearchResults results={results} />
      </Box>
    </ChakraProvider>
  );
};

export default SearchComponent;
