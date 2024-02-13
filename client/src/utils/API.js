const baseURL = "https://just-eat-it-hjx1.onrender.com";

// Local Testing
// const baseURL = "http://localhost:3001";

export const handleSearch = async (location, cuisine) => {
  try {
    const response = await fetch(
      `${baseURL}/?location=${location}&cuisine=${cuisine}`
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorMessage = `Error: ${response.status} - ${response.statusText}`;
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error(error);
  }
};

export const getRandomRestaurant = async (location, cuisine) => {
  try {
    const response = await fetch(
      `${baseURL}/?location=${location}&cuisine=${cuisine}`
    );

    if (response.ok) {
      const data = await response.json();
      if (data && data.businesses.length > 0) {
        const index = Math.floor(Math.random() * data.businesses.length);
        const randomRestaurant = data.businesses[index];
        return randomRestaurant;
      } else {
        console.error("Error receiving data from server.");
      }
    } else {
      const errorMessage = `Error: ${response.status} - ${response.statusText}`;
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error(error);
  }
};
