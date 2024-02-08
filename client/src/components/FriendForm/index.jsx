// FRIEND MODAL!!!!!

import { useState } from "react";
import friendModal from "./friendAddModal";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";

const Cuisine = () => {
  const { loading, data, refetch } = useQuery(QUERY_ME);

  const userData = data?.me || {};

  const [savedCuisines, setSavedCuisines] = useState(
    userData.savedCuisines || []
  );

  if (loading) return <p>Loading...</p>;

  const handleUpdateCuisines = async () => {
    // Refetch user data to update savedCuisines
    await refetch();
    setSavedCuisines(userData.savedCuisines || []);
  };

  return (
    <div>
      <div className="center">
        <div className="pref-container">
          <p>Food Preferences:</p>
          <ul>
            {userData.savedCuisines?.map((cuisine) => (
              <li key={cuisine.cuisineId}>{cuisine.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="center">
        <friendModal onUpdate={handleUpdateCuisines} />
      </div>
    </div>
  );
};

export default Cuisine;
