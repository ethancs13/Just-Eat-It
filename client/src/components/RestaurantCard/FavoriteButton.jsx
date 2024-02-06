import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Button } from "react-bootstrap";

import { CREATE_RESTAURANT, REMOVE_RESTAURANT } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";

const FavoriteButton = ({ restaurant }) => {
  const [createRestaurant] = useMutation(CREATE_RESTAURANT);
  const [removeRestaurant] = useMutation(REMOVE_RESTAURANT);

  const { loading, data } = useQuery(QUERY_ME);
  const [favorite, setFavorite] = useState(false);

  const userData = data?.me || {};

  const handleAddFavorite = async () => {
    try {
      console.log(restaurant);
      console.log(restaurant.id);
      const { data } = await createRestaurant({
        variables: {
          businessId: restaurant.id,
          name: restaurant.name,
          rating: restaurant.rating,
          image: restaurant.image_url,
          location: restaurant.location.address1,
        },
      });

      if (!data) {
        throw new Error("something went wrong!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFavorite = async () => {
    try {
      const { data } = await removeRestaurant({
        variables: {
          businessId: restaurant.id,
          name: restaurant.name,
          rating: restaurant.rating,
          image: restaurant.image_url,
          location: restaurant.location.address1,
        },
      });

      if (!data) {
        throw new Error("something went wrong!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userData.favorite) {
      let favoriteState = false;
      for (let i = 0; i < userData.favorite.length; i++) {
        let current = userData.favorite[i];
        if (current.businessId === restaurant.id) {
          favoriteState = true;
          break;
        }
      }
      setFavorite(favoriteState);
    }
  }, [userData, restaurant]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return favorite ? (
    <Button onClick={handleRemoveFavorite}>Unfavorite</Button>
  ) : (
    <Button onClick={handleAddFavorite}>Favorite</Button>
  );
};

export default FavoriteButton;
