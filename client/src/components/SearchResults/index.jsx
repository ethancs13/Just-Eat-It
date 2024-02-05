import React from 'react';

export default function SearchResults({ results }) {
  return (
    <div>
      {results.map((businesses) => (
        <div key={businesses.id}>
          <img src={businesses.image_url} alt={businesses.name} />
          <h2>{businesses.name}</h2>
          <p>{businesses.rating} Stars</p>
          <p>{businesses.location.address1}</p>
          <a href={businesses.url} target="_blank">
            View on Yelp
          </a>
        </div>
      ))}
    </div>
  );
}
