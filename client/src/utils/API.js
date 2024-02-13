import axios from "axios";

export const handleSearch = async (location, cuisine) => {
  try {
    const response = await axios.get(
      "https://just-eat-it-be3958285291.herokuapp.com/api/search",
      {
        params: {
          location: location,
          cuisine: cuisine,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getRandomRestaurant = async (location, cuisine) => {
  try {
    const response = await axios.get(
      "https://just-eat-it-be3958285291.herokuapp.com/api/search",
      {
        params: {
          location: location,
          cuisine: cuisine,
        },
      }
    );

    if (response.data && response.data.businesses?.length > 0) {
      const index = Math.floor(
        Math.random() * response.data.businesses?.length
      );
      const randomRestaurant = response.data.businesses[index];
      return randomRestaurant;
    } else {
      console.error("Error receiving data from server.");
    }
  } catch (error) {
    console.error(error);
  }
};
