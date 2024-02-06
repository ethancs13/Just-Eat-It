import RestaurantCard from '../RestaurantCard';

const SearchResults = ({ results }) => (
  <div className="row card-container">
    {results.map((restaurant) => (
      <RestaurantCard restaurant={restaurant} />
    ))}
  </div>
);

export default SearchResults;
