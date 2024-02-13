import axios from "axios";

// const baseURL = "http://localhost:3001";
const baseURL = "https://just-eat-it-tpcd.onrender.com";

export const handleSearch = async (location, cuisine) => {
  try {
    const response = await axios.get(`${baseURL}/`, {
      params: {
        location: location,
        cuisine: cuisine,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getRandomRestaurant = async (location, cuisine) => {
  try {
    const response = await axios.get(`${baseURL}/`, {
      params: {
        location: location,
        cuisine: cuisine,
      },
    });

    if (response.data && response.data.businesses.length > 0) {
      const index = Math.floor(Math.random() * response.data.businesses.length);
      const randomRestaurant = response.data.businesses[index];
      return randomRestaurant;
    } else {
      console.error("Error receiving data from server.");
    }
  } catch (error) {
    console.error(error);
  }
};
