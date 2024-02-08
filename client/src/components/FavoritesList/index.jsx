import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { ADD_FAVORITE } from "../../utils/mutations";

import RestaurantCard from "../RestaurantCard";

const FavoritesList = () => {
  const { loading, data, refetch } = useQuery(QUERY_ME);
  const [addFavorite] = useMutation(ADD_FAVORITE);
  const [selectedRestaurant, setSelectedRestaurant] = useState([]);

  const favoriteRestaurants = data?.me.favorites || [];

  const handleAddFavorite = async (restaurantId) => {
    await addFavorite({ variables: { restaurantId } });
    await refetch();
    setSelectedRestaurant(restaurantId);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="row card-container">
      {favoriteRestaurants?.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
          onAddFavorite={() => handleAddFavorite(restaurant.id)}
        />
      ))}
    </div>
  );
};

export default FavoritesList;
