import {
  Box,
  Input,
  Select,
  Button,
  ChakraProvider,
  Flex,
} from "@chakra-ui/react";

const SearchComponent = () => {
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
            _focus={{ borderColor: "orange.500" }}
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
            _focus={{ borderColor: "orange.500" }}
          />
          <Button colorScheme="orange" size="md" ml={2}>
            Search
          </Button>
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default SearchComponent;
