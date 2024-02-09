import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";

import RestaurantCard from "../RestaurantCard";

const FavoritesList = () => {
  const { loading, data } = useQuery(QUERY_ME);

  const favoriteRestaurants = data?.me.favorites || [];

  console.log(favoriteRestaurants);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="row card-container">
      {favoriteRestaurants?.map((restaurant) => (
        <RestaurantCard
          key={restaurant.businessId}
          restaurant={restaurant}
          favoritePage={true}
        />
      ))}
    </div>
  );
};

export default FavoritesList;
