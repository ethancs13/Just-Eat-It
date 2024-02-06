import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';

import RestaurantCard from '../RestaurantCard';

const FavoritesList = () => {
  const { loading, data } = useQuery(QUERY_ME);

  const favoriteRestaurants = data?.me.favorites || [];

  return (
    <div className="row card-container">
      {favoriteRestaurants.map((restaurant) => (
        <RestaurantCard restaurant={restaurant} />
      ))}
    </div>
  );
};

export default FavoritesList;
