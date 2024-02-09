import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";

import RestaurantCard from "../RestaurantCard";

const FavoritesList = () => {
  const { loading, data, refetch } = useQuery(QUERY_ME);

  const favoriteRestaurants = data?.me.favorites || [];

  const handleUpdateFavorites = async () => {
    await refetch();
  };

  console.log(favoriteRestaurants);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="row card-container">
      {favoriteRestaurants?.map((restaurant) => (
        <RestaurantCard
          key={restaurant.businessId}
          restaurant={restaurant}
          favoritePage={true}
          onUpdate={handleUpdateFavorites}
        />
      ))}
    </div>
  );
};

export default FavoritesList;
