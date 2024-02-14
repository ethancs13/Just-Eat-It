import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER_BY_USERNAME, QUERY_ME } from "../../utils/queries";
import { Modal, Button, Card } from "react-bootstrap";
import { handleSearch } from "../../utils/API";
import { Box, Input, ChakraProvider, Flex } from "@chakra-ui/react";

export default function FriendModal({ friendFoods }) {
  const { loading, error, data } = useQuery(QUERY_ME);
  const [showModal, setShowModal] = useState(false);
  const [results, setResults] = useState([]);
  const [location, setLocation] = useState({ locationName: "" });
  const [sharedFavorites, setSharedFavorites] = useState([]);

  let myFavorites = data.me.savedCuisines.map((food) => food.name);
  let friendFavorites = friendFoods.map((food) => food.name);

  let ourFavorites = myFavorites.filter((food) =>
    friendFavorites.includes(food)
  );

  const handleChange = (e) => {
    const newLocation = e.target.value;

    setLocation((currData) => {
      currData.locationName = newLocation;
      return { ...currData };
    });
  };

  const search = async (e) => {
    e.preventDefault();

    if (!location.locationName) {
      console.error("Please provide a location.");
      return;
    }

    const randomFood = Math.floor(Math.random() * ourFavorites.length);
    let foodData = await handleSearch(
      location.locationName,
      ourFavorites[randomFood]
    );
    setResults(foodData.businesses);
  };

  const handleHide = () => {
    setShowModal(false);
    setResults([]);
    setSharedFavorites([]);
    setLocation({ locationName: "" });
  };

  return (
    <div>
      {/* Button to open modal */}
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Let's Find a Restaurant!
      </Button>

      {/* Modal for preferences form */}
      <Modal show={showModal} onHide={handleHide}>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">
            Let's Find a Place to Eat
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ background: "#060c24" }}>
          <p>You both enjoy:</p>
          <ul>
            {ourFavorites.map((cuisine) => (
              <li key={cuisine}>{cuisine}</li>
            ))}
          </ul>

          {!location.locationName && (
            <p className="no-location">Please enter a location to search.</p>
          )}
          {/* <label htmlFor="modal-location">Enter a City to Search</label> */}

          <form className="modal-search-form">
            <input
              placeholder="Enter your location"
              name="locationName"
              id="modal-location"
              onChange={handleChange}
              value={location.locationName}
            ></input>
            <Button
              variant="primary"
              type="submit"
              style={{
                backgroundColor: "#fe9553",
                color: "white",
                display: "block",
                margin: "0 auto",
              }}
              onClick={search}
            >
              Find me something to Eat
            </Button>
          </form>

          <div className="row card-container">
            {results?.map((restaurant) => (
              <Card key={restaurant.id} className="dashboard-modal-card">
                <Card.Img
                  variant="top"
                  src={restaurant.image_url}
                  alt={restaurant.name}
                />
                <Card.Body>
                  <Card.Title className="restCardTitle">
                    {restaurant.name}
                  </Card.Title>
                  <Card.Text className="restCardDescription">
                    {restaurant.rating} ⭐️
                  </Card.Text>
                  <Card.Text className="restCardDescription">
                    {restaurant.address}
                  </Card.Text>
                  <Card.Body className="yelpLink">
                    <a
                      href={restaurant.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on Yelp for more details.
                    </a>
                  </Card.Body>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
