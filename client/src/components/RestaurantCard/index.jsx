import Card from "react-bootstrap/Card";
import auth from "../../utils/auth.js";

import FavoriteButton from "./FavoriteButton.jsx";
import RemoveFavoriteButton from "./RemoveFavoriteButton.jsx";

const RestaurantCard = ({ restaurant, favoritePage, onUpdate }) => {
  if (!restaurant) {
    return null;
  }

  const imageUrl = restaurant.image || restaurant.image_url;
  const address =
    typeof restaurant.location === "object"
      ? restaurant.location.address1
      : restaurant.location;

  return (
    <Card>
      <Card.Img variant="top" src={imageUrl} alt={restaurant.name} />
      <Card.Body>
        <Card.Title className="restCardTitle">{restaurant.name}</Card.Title>
        <Card.Text className="restCardDescription">
          {restaurant.rating} ⭐️
        </Card.Text>
        <Card.Text className="restCardDescription">{address}</Card.Text>
      </Card.Body>
      {auth.loggedIn() && !favoritePage && (
        <FavoriteButton restaurant={restaurant} />
      )}
      {auth.loggedIn() && favoritePage && (
        <RemoveFavoriteButton restaurant={restaurant} onUpdate={onUpdate} />
      )}
      <Card.Body className="yelpLink">
        <a href={restaurant.url} target="_blank" rel="noopener noreferrer">
          View on Yelp for more details.
        </a>
      </Card.Body>
    </Card>
  );
};

export default RestaurantCard;
