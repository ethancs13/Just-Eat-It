import RestaurantCard from "../RestaurantCard";

// Put this into the searchBar folder for organization

const SearchResults = ({ results }) => (
  <div className="row card-container">
    {results.map((restaurant) => (
      <RestaurantCard
        key={restaurant.id}
        restaurant={restaurant}
        favoritePage={false}
      />
    ))}
  </div>
);

export default SearchResults;
