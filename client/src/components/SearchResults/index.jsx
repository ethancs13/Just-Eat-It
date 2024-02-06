import RestaurantCard from '../RestaurantCard';

const SearchResults = ({ results }) => (
  <div className="row card-container">
    {results.map((restaurant, index) => (
      <RestaurantCard key={index} restaurant={restaurant} />
    ))}
  </div>
);

export default SearchResults;
