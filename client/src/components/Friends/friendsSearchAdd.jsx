import { useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { QUERY_USER_BY_USERNAME } from "../../utils/queries";
import { ADD_FRIEND } from "../../utils/mutations";

const FriendsSearchAdd = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState(null);
  const [searchError, setSearchError] = useState("");
  const [searchUser] = useLazyQuery(QUERY_USER_BY_USERNAME, {
    onCompleted: (result) => setData(result),
    onError: (error) => setSearchError("Username not found."),
  });
  const [addFriend] = useMutation(ADD_FRIEND);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setSearchError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      searchUser({
        variables: { username: searchTerm.trim() },
      });
    }
  };

  const handleAddFriend = async (friendData) => {
    try {
      await addFriend({
        variables: {
          friendData: {
            _id: friendData._id,
            username: friendData.username,
          },
        },
      });
      setSearchTerm("");
      setData(null);
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search by username"
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      {/* Added temporary styling */}
      {searchError && <p style={{ color: "blue" }}> {searchError}</p>}
      {data && data.user && (
        <div>
          <h2>Search Results:</h2>
          <ul>
            <li>
              <strong>Username:</strong> {data.user.username}
            </li>
            <li>
              <button onClick={() => handleAddFriend(data.user)}>Add</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default FriendsSearchAdd;
