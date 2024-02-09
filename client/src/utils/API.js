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
