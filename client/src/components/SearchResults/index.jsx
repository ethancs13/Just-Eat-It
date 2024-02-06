import React from "react";
import Card from "react-bootstrap/Card";

export default function SearchResults({ results }) {
  return (
    <div className="row card-container">
      {results.map((businesses) => (
        <Card key={businesses.id}>
          <Card.Img
            variant="top"
            src={businesses.image_url}
            alt={businesses.name}
          />
          <Card.Body>
            <Card.Title>{businesses.name}</Card.Title>
            <Card.Text>{businesses.rating} ⭐️</Card.Text>
            <Card.Text>{businesses.location.address1}</Card.Text>
          </Card.Body>
          <Card.Body>
            <a href={businesses.url} target="_blank" rel="noopener noreferrer">
              View on Yelp for more details.
            </a>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
