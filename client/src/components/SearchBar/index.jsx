import { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_CUISINES } from "../../utils/queries";
import { handleSearch } from "../../utils/API";
import SearchResults from "../SearchResults";
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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      search();
    }
  };

  return (
    <ChakraProvider>
      <Box className="searchContainer" p={4}>
        <Flex align="center" justify="center">
          <Select
            placeholder="Select Food Preferences"
            flex={1}
            size="lg"
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
            placeholder="Search by area"
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
        </Flex>
        <SearchResults results={results} />
      </Box>
    </ChakraProvider>
  );
};

export default SearchComponent;
