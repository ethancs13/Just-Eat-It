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
      .map((el) => ({
        name: el.value,
        cuisineId: el.id,
      }));

    console.log("Mutation variables:", selectedCuisines);

    try {
      const { data } = await addCuisine({
        variables: { cuisineData: selectedCuisines },
      });
      console.log("Saved cuisines:", data.addCuisine);
      alert("Food preferences successfully saved!");
    } catch (error) {
      console.log(`Error saving food preferences: ${error.message}`);
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
        {cuisines.map((cuisine) => (
          <div key={cuisine.cuisineId}>
            <input
              type="checkbox"
              id={cuisine.cuisineId}
              value={cuisine.name}
            />
            <label htmlFor={cuisine.cuisineId}>{cuisine.name}</label>
          </div>
        ))}
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
