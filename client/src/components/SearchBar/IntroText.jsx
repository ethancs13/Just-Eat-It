import { Box, Text } from "@chakra-ui/react";

const IntroText = () => (
  <Box p={4} mb={4} borderRadius="md">
    <Text
      fontSize={["sm", "md", "lg", "2xl"]}
      color="orange"
      textAlign="center"
      className="intro-text"
    >
      End the debate over where to eat!
      <br></br>
      Just Eat It syncs your preferences with your pickiest friend!
    </Text>
  </Box>
);

export default IntroText;
