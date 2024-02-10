// Friends MODAL!!!!!!

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER_BY_USERNAME, QUERY_ME } from "../../utils/queries";
import { Modal, Button } from "react-bootstrap";
// import FriendPreferences from "./FriendPreferences";

export default function FriendModal({ friendFoods }) {

  console.log('Imported Favorites', friendFoods);

  // console.log('Friend Prop:', friends);
  // const [selectedFriends, setSelectedFriends] = useState(friends);
  // console.log('Selected Friends:', selectedFriends);
  // const mappedFriends = friends.map(friend => friend.username);
  // console.log('Mapped Friends:', mappedFriends);
  const [showModal, setShowModal] = useState(false);

  const {loading, error, data} = useQuery(QUERY_ME);
  console.log('Me Data:', data);

  const handleCheckboxChange = (event) => {
    const { username, checked } = event.target;
    const friendArray = {
      name: event.target.value,
      username: username,
    };

    setSelectedFriends((prevSelectedFriends) =>
      checked
        ? [...prevSelectedFriends, friendArray ]
        : prevSelectedFriends.filter((f) => f.username !== username)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // try {
    //   const { data } = await addCuisine({
    //     variables: { cuisineData: selectedCuisines },
    //   });
    //   console.log("Saved cuisines:", data);
    //   setShowModal(false);
    // } catch (error) {
    //   console.log(`Error saving food preferences: ${error.message}`);
    // }

    setSelectedFriends([]);
  };


  return (
    <div>
      {/* Button to open modal */}
      <Button variant="primary" onClick={() => setShowModal(true)}>
       Let's Find a Restaurant!
      </Button>

  {/* Modal for preferences form */}

  <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">Let's Find a Place to Eat</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#060c24" }}>
        <p>You both enjoy:</p>
            <Button
              variant="primary"
              type="submit"
              style={{
                backgroundColor: "#fe9553",
                color: "white",
                display: "block",
                margin: "0 auto",
              }}
            >
              Find me something to Eat
            </Button>
          
        </Modal.Body>
      </Modal>
    

    </div>
  );
}
