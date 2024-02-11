import { Box, Text } from "@chakra-ui/react";

const IntroText = () => (
  <Box bg="#060c2499" p={4} mb={4} borderRadius="md">
    <Text
      fontSize={["sm", "md", "lg", "2xl"]}
      color="orange"
      textAlign="center"
    >
      End the debate over where to eat! Just Eat It syncs your preferences with
      your most pickiest friend!
    </Text>
  </Box>
);

export default IntroText;
