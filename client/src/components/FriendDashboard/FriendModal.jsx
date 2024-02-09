// Friends MODAL!!!!!!

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../../utils/queries";
import { Modal, Button } from "react-bootstrap";

export default function FriendModal({ friends }) {
// This data variable was updated to differentiate it from get-me.
console.log('Friend Prop:', friends);


  const { meData } = useQuery(QUERY_ME);
  console.log('Me data:', meData);
  
  const [selectedFriends, setSelectedFriends] = useState([]);
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

    </div>
  );
}
