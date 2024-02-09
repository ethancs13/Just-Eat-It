import { useMutation } from "@apollo/client";
import { ADD_FAVORITE, REMOVE_FAVORITE } from "../../utils/mutations";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import auth from "../../utils/auth.js";

const RestaurantCard = ({ restaurant, favoritePage }) => {
  const [addFavorite] = useMutation(ADD_FAVORITE);
  const [removeFavorite] = useMutation(REMOVE_FAVORITE);

  const imageUrl = restaurant.image || restaurant.image_url;
  const address =
    typeof restaurant.location === "object"
      ? restaurant.location.address1
      : restaurant.location;

  const bothId = restaurant.id || restaurant.businessId;

  const handleAddFavorite = async () => {
    const restaurantData = {
      businessId: bothId,
      name: restaurant.name,
      rating: restaurant.rating,
      image: imageUrl,
      url: restaurant.url,
      location: address,
    };

    console.log(restaurantData);
    console.log(restaurant);

    await addFavorite({ variables: { restaurantData: restaurantData } });
  };

  const handleRemoveFavorite = async () => {
    await removeFavorite({ variables: { businessId: bothId } });
  };

  return (
    <Card>
      <Card.Img variant="top" src={imageUrl} alt={restaurant.name} />
      <Card.Body>
        <Card.Title>{restaurant.name}</Card.Title>
        <Card.Text>{restaurant.rating} ⭐️</Card.Text>
        <Card.Text>{address}</Card.Text>
      </Card.Body>
      {auth.loggedIn() && (
        <>
          {!favoritePage && (
            <Button onClick={handleAddFavorite}>Favorite</Button>
          )}
          {favoritePage && (
            <Button onClick={handleRemoveFavorite}>Remove Favorite</Button>
          )}
        </>
      )}
      <Card.Body>
        <a href={restaurant.url} target="_blank" rel="noopener noreferrer">
          View on Yelp for more details.
        </a>
      </Card.Body>
    </Card>
  );
};

export default RestaurantCard;
