import React from 'react';
import Card from 'react-bootstrap/Card';

const RestaurantCard = ({ restaurant }) => (
  <Card key={restaurant._id}>
    <Card.Img variant="top" src={restaurant.image} alt={restaurant.name} />
    <Card.Body>
      <Card.Title>{restaurant.name}</Card.Title>
      <Card.Text>{restaurant.rating} ⭐️</Card.Text>
      <Card.Text>{restaurant.location}</Card.Text>
    </Card.Body>
    <Card.Body>
      <a href={restaurant.url} target="_blank" rel="noopener noreferrer">
        View on Yelp for more details.
      </a>
    </Card.Body>
  </Card>
);

export default RestaurantCard;
