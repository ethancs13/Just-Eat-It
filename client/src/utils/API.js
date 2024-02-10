import axios from "axios";

export const handleSearch = async (location, cuisine) => {
  try {
    const response = await axios.get("http://localhost:3001", {
      params: {
        location: location,
        cuisine: cuisine,
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getRandomRestaurant = async (location, cuisine) => {
  try {
    const response = await axios.get("http://localhost:3001", {
      params: {
        location: location,
        cuisine: cuisine,
      },
    });

    if (response.data && response.data.length > 0) {
      const index = Math.floor(Math.random() * response.data.length);
      const randomRestaurant = response.data[index];
      console.log(randomRestaurant);
      return randomRestaurant;
    } else {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
  }
};
