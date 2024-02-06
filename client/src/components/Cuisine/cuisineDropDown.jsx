import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ALL_CUISINES } from "../../utils/queries";
import { ADD_CUISINE } from "../../utils/mutations";

export default function CuisineDropDown() {
  const { loading, error, data } = useQuery(QUERY_ALL_CUISINES);
  const [addCuisine] = useMutation(ADD_CUISINE);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const selectedCuisines = Array.from(event.target.elements)
      .filter((el) => el.type === "checkbox" && el.checked)
      .map((el) => el.value);

    try {
      await addCuisine({
        variables: { cuisineData: { ...selectedCuisines } },
      });
      alert("Food preferences successfully saved!");
    } catch (error) {
      alert(`Error saving food preferences: ${error.message}`);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const cuisines = data.allCuisines;

  console.log("Cuisines:", cuisines);

  return (
    <div>
      <h3>Select your preferred cuisines:</h3>
      <form onSubmit={handleSubmit}>
        {/* {cuisines.map((cuisine) => (
          <div key={cuisine._id}>
            <input type="checkbox" id={cuisine._id} value={cuisine.name} />
            <label htmlFor={cuisine._id}>{cuisine.name}</label>
          </div>
        ))} */}

        {/* Need to add ID to Cuisine? */}

        {cuisines.map((cuisine, index) => (
          <div key={`${cuisine.name}-${index}`}>
            <input
              type="checkbox"
              id={`${cuisine.name}-${index}`}
              value={cuisine.name}
            />
            <label htmlFor={`${cuisine.name}-${index}`}>{cuisine.name}</label>
          </div>
        ))}
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
