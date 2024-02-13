import { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_CUISINES } from "../../utils/queries";
import SearchResults from "../SearchResults";
import GoogleMap from "../GoogleMap";
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
  const [showMap, setShowMap] = useState(false);

  // Fetch all cuisines
  const { data } = useQuery(QUERY_ALL_CUISINES);

  const baseURL = "https://just-eat-it-tpcd.onrender.com";

  // Local Testing
  // const baseURL = "http://localhost:3001";

  const search = async () => {
    try {
      const response = await fetch(
        `${baseURL}/?location=${location}&cuisine=${cuisine}`
      );

      if (response.ok) {
        const data = await response.json();
        setResults(data.businesses);
        setShowMap(true);
      } else {
        console.error("Failed to fetch data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const random = async () => {
    try {
      const response = await fetch(
        `${baseURL}/random?location=${location}&cuisine=${cuisine}`
      );

      if (response.ok) {
        const data = await response.json();
        setResults([data]);
        setShowMap(true);
      } else {
        console.error("Failed to fetch data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
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
        mt={results.length > 0 ? "0" : "5%"}
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
        <GoogleMap locations={results} showMap={showMap} />
        <SearchResults results={results} />
      </Box>
    </ChakraProvider>
  );
};

export default SearchComponent;
