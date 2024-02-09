// Friends MODAL!!!!!!

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../../utils/queries";
import { Modal, Button } from "react-bootstrap";
import FriendPreferences from "./FriendPreferences";

export default function FriendModal() {

  // console.log('Friend Prop:', friends);
  // const [selectedFriends, setSelectedFriends] = useState(friends);
  // console.log('Selected Friends:', selectedFriends);
  // const mappedFriends = friends.map(friend => friend.username);
  // console.log('Mapped Friends:', mappedFriends);
  const [showModal, setShowModal] = useState(false);

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
       Add Friends
      </Button>
  {/* Modal for preferences form
  <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select your Friends:</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#060c24" }}>
          <form onSubmit={handleSubmit}>
            {selectedFriends.map((friend) => (
              <div key={friend.username}>
                <input
                  type="checkbox"
                  id={friend.username}
                  value={friend.username}
                  onChange={handleCheckboxChange}
                  checked={selectedFriends.some(
                    (f) => f.username === friend.username
                  )}
                  style={{ marginRight: "15px", marginBottom: "10px", height: "18px", width: "18px" }}
                />
                <label
                  style={{ fontSize: "24px", color: "#f02b61" }}
                  htmlFor={friend.username}
                >
                  {friend[0].username}
                </label>
              </div>
            ))}
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
              Save
            </Button>
          </form>
        </Modal.Body>
      </Modal> */}
    

    </div>
  );
}
