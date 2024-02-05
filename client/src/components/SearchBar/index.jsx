import { useState } from 'react';
import { handleSearch } from '../../utils/API';
import SearchResults from '../SearchResults';

import {
  Box,
  Input,
  Select,
  Button,
  ChakraProvider,
  Flex,
} from '@chakra-ui/react';

const SearchComponent = () => {
  const [term, setTerm] = useState('');
  const [location, setLocation] = useState('');
  const [results, setResults] = useState([]);

  const search = async () => {
    const data = await handleSearch(location, term);
    setResults(data.businesses);
  };

  return (
    <ChakraProvider>
      <Box className="searchContainer" p={4}>
        <Flex align="center" justify="center">
          <Select
            placeholder="Select Food Preferences"
            flex={1}
            size="sm"
            color="orange"
            ml={2}
            mr={2}
            variant="filled"
            _focus={{ borderColor: 'orange.500' }}
            onChange={(e) => setTerm(e.target.value)}
          >
            <option value="american">American</option>
            <option value="mexican">Mexican</option>
            <option value="italian">Italian</option>
            <option value="Asian">Asian</option>
          </Select>
          <Input
            placeholder="Search by area"
            flex={2}
            mb={2}
            size="lg"
            color="orange"
            borderColor="orange"
            variant="filled"
            _focus={{ borderColor: 'orange.500' }}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Button colorScheme="purple" size="md" ml={2} onClick={search}>
            Search
          </Button>
        </Flex>
        <SearchResults results={results} />
      </Box>
    </ChakraProvider>
  );
};

export default SearchComponent;
