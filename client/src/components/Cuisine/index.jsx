import { useState } from "react";
import CuisineUpdateModal from "./cuisineUpdateModal";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";

const Cuisine = () => {
  const { loading, data, refetch } = useQuery(QUERY_ME);

  const userData = data?.me || {};

  const [savedCuisines, setSavedCuisines] = useState([]);

  if (loading) return <p>Loading...</p>;

  const handleUpdateCuisines = async () => {
    // Refetch user data to update savedCuisines
    await refetch();
    setSavedCuisines(userData.savedCuisines);
  };

  return (
    <div>
      <div>
        <p>Current saved cuisines:</p>
        <ul>
          {savedCuisines.map((cuisine) => (
            <li key={cuisine.cuisineId}>{cuisine.name}</li>
          ))}
        </ul>
      </div>
      <CuisineUpdateModal onUpdate={handleUpdateCuisines} />
    </div>
  );
};

export default Cuisine;
