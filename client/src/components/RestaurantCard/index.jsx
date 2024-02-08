import { useMutation } from "@apollo/client";
import { ADD_FAVORITE } from "../../utils/mutations";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import auth from "../../utils/auth.js";

const RestaurantCard = ({ restaurant }) => {
  const [addFavorite] = useMutation(ADD_FAVORITE);

  const handleAddFavorite = async () => {
    const restaurantData = {
      businessId: restaurant.id,
      name: restaurant.name,
      rating: restaurant.rating,
      image: restaurant.image_url,
      url: restaurant.url,
      location: restaurant.location.address1,
    };

    console.log(restaurantData);

    await addFavorite({ variables: { restaurantData: restaurantData } });
  };
  return (
    <Card key={restaurant.id}>
      <Card.Img
        variant="top"
        src={restaurant.image_url}
        alt={restaurant.name}
      />
      <Card.Body>
        <Card.Title>{restaurant.name}</Card.Title>
        <Card.Text>{restaurant.rating} ⭐️</Card.Text>
        <Card.Text>{restaurant.location.address1}</Card.Text>
      </Card.Body>
      {auth.loggedIn() && <Button onClick={handleAddFavorite}>Favorite</Button>}
      <Card.Body>
        <a href={restaurant.url} target="_blank" rel="noopener noreferrer">
          View on Yelp for more details.
        </a>
      </Card.Body>
    </Card>
  );
};

export default RestaurantCard;
