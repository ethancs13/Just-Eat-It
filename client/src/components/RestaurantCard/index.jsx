import { Card, Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";

import { CREATE_RESTAURANT, DELETE_RESTAURANT } from "../../utils/mutations";
import auth from "../../utils/auth";

const RestaurantCard = ({ restaurant }) => {
  const [createRestaurant, { error }] = useMutation(CREATE_RESTAURANT);
  const [deleteRestaurant] = useMutation(DELETE_RESTAURANT);

  const handleAddFavorite = async () => {
    try {
      const { data } = await createRestaurant({
        variables: { businessId: restaurant.id },
      });

      if (!data) {
        throw new Error("something went wrong!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteFavorite = async () => {
    try {
      const { data } = await deleteRestaurant({
        variables: { businessId: restaurant.id },
      });

      if (!data) {
        throw new Error("something went wrong!");
      }
    } catch (error) {
      console.error(error);
    }
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
