import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import auth from '../../utils/auth';

const RestaurantCard = ({ restaurant }) => (
  <Card key={restaurant.id}>
    <Card.Img variant="top" src={restaurant.image_url} alt={restaurant.name} />
    <Card.Body>
      <Card.Title>{restaurant.name}</Card.Title>
      <Card.Text>{restaurant.rating} ⭐️</Card.Text>
      <Card.Text>{restaurant.location.address1}</Card.Text>
    </Card.Body>
    {auth.loggedIn() && <Button>Favorite</Button>}
    <Card.Body>
      <a href={restaurant.url} target="_blank" rel="noopener noreferrer">
        View on Yelp for more details.
      </a>
    </Card.Body>
  </Card>
);

export default RestaurantCard;
