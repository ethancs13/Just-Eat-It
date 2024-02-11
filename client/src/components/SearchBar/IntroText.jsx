import { Box, Text } from "@chakra-ui/react";

const IntroText = () => (
  <Box bg="#060c2499" p={4} mb={4} borderRadius="md">
    <Text
      fontSize={["sm", "md", "lg", "2xl"]}
      color="orange"
      textAlign="center"
    >
      Welcome to Just Eat It, your solution to the eternal dilemma of 'Where
      should we eat?' Here you can explore restaurants based on cuisine and
      location. Still feeling indecisive? Utilize the 'Just Eat It!' button for
      a spontaneous choice. Make sure to choose a city or location, food
      preferences are optional. Sign up to curate your favorites and discover
      what's trending among your friends!
    </Text>
  </Box>
);

export default IntroText;
