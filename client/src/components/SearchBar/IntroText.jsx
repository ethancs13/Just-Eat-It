import { Box, Text } from "@chakra-ui/react";

const IntroText = () => (
  <Box bg="#060c2499" p={4} mb={4} borderRadius="md">
    <Text fontSize="2xl" color="orange" textAlign="center">
      Can't decide what to eat? Here you can search for restaurants by cuisine
      and city/location! Sign up to add favorites and see what your friends are
      eating.
    </Text>
  </Box>
);

export default IntroText;
