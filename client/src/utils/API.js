import axios from 'axios';

export const handleSearch = async (location, term) => {
  try {
    const response = await axios.get('http://localhost:3001', {
      params: {
        location: location,
        term: term,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
