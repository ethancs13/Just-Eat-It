import RestaurantCard from "../RestaurantCard";

const SearchResults = ({ results }) => (
  <section className="results-wrapper">
    <div className="row card-container">
      {results?.map((restaurant) => (
        <RestaurantCard
          key={restaurant?.id}
          restaurant={restaurant}
          favoritePage={false}
        />
      ))}
    </div>
  </section>
);

export default SearchResults;
