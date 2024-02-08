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

  console.log(favoriteRestaurants);

  const handleAddFavorite = async (businessId) => {
    const alreadyFavorited = favoriteRestaurants.some(
      (restaurant) => restaurant.businessId === businessId
    );

    if (!alreadyFavorited) {
      await addFavorite({ variables: { businessId } });
      await refetch();
    }

    setSelectedRestaurant(businessId);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="row card-container">
      {favoriteRestaurants?.map((restaurant) => (
        <RestaurantCard
          key={restaurant._id}
          restaurant={restaurant}
          onAddFavorite={() => handleAddFavorite(restaurant.businessId)}
        />
      ))}
    </div>
  );
};

export default FavoritesList;
