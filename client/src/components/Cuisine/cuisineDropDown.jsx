// This component needs Auth added to keep unauthenticated users from accessing the page.

import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ALL_CUISINES } from "../../utils/queries";
import { ADD_CUISINE } from "../../utils/mutations";

export default function CuisineDropDown() {
  const { loading, error, data } = useQuery(QUERY_ALL_CUISINES);
  const [addCuisine] = useMutation(ADD_CUISINE);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    const cuisine = {
      name: event.target.value,
      cuisineId: id,
    };

    setSelectedCuisines((prevSelectedCuisines) =>
      checked
        ? [...prevSelectedCuisines, cuisine]
        : prevSelectedCuisines.filter((c) => c.cuisineId !== id)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.dir(selectedCuisines)
    try {
      const { data } = await addCuisine({
        variables: { cuisineData: selectedCuisines },
      });
      console.log("Saved cuisines:", data);
      alert("Food preferences successfully saved!");
    } catch (error) {
      console.log(`Error saving food preferences: ${error.message}`);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const cuisines = data.allCuisines;
  return (
    <div>
      <h3>Select your preferred cuisines:</h3>
      <form onSubmit={handleSubmit}>
        {cuisines.map((cuisine) => (
          <div key={cuisine.cuisineId}>
            <input
              type="checkbox"
              id={cuisine.cuisineId}
              value={cuisine.name}
              onChange={handleCheckboxChange}
              checked={selectedCuisines.some((c) => c.cuisineId === cuisine.cuisineId)}
            />
            <label htmlFor={cuisine.cuisineId}>{cuisine.name}</label>
          </div>
        ))}
        <button type="submit">Save</button>
      </form>
      <h3>Selected preferences:</h3>
      <ul>
        {selectedCuisines.map((cuisine) => (
          <li key={cuisine.cuisineId}>
            {cuisine.name} - {cuisine.cuisineId}
          </li>
        ))}
      </ul>
    </div>
  );
}