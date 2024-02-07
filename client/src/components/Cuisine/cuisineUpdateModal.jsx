import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ALL_CUISINES } from "../../utils/queries";
import { ADD_CUISINE } from "../../utils/mutations";
import { Modal, Button } from "react-bootstrap";

export default function CuisineUpdateModal() {
  const { loading, error, data } = useQuery(QUERY_ALL_CUISINES);
  const [addCuisine] = useMutation(ADD_CUISINE);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    const cuisine = {
      name: event.target.value,
      cuisineId: id,
    };

    setSelectedCuisines((prevSelectedCuisines) =>
      checked
        ? [...prevSelectedCuisines, cuisine]
        : prevSelectedCuisines.filter((c) => c.cuisineId !== id)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addCuisine({
        variables: { cuisineData: selectedCuisines },
      });
      console.log("Food preferences successfully saved!");
      console.log("Saved cuisines:", data);
      alert("Food preferences successfully saved!");
      setShowModal(false);
    } catch (error) {
      console.log(`Error saving food preferences: ${error.message}`);
    }

    setSelectedCuisines([]);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const cuisines = data.allCuisines;

  return (
    <div>
      {/* Button to open modal */}
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Update Preferences
      </Button>

      {/* Modal for preferences form */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select your preferred cuisines:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            {cuisines.map((cuisine) => (
              <div key={cuisine.cuisineId}>
                <input
                  type="checkbox"
                  id={cuisine.cuisineId}
                  value={cuisine.name}
                  onChange={handleCheckboxChange}
                  checked={selectedCuisines.some(
                    (c) => c.cuisineId === cuisine.cuisineId
                  )}
                />
                <label htmlFor={cuisine.cuisineId}>{cuisine.name}</label>
              </div>
            ))}
            <Button variant="primary" type="submit">
              Save
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}