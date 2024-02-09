import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { QUERY_USER_BY_USERNAME } from "../../utils/queries";

const FriendsSearchAdd = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchUser, { loading, error, data }] = useLazyQuery(
    QUERY_USER_BY_USERNAME
  );

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      searchUser({
        variables: { username: searchTerm.trim() },
      });
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
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && data.user && (
        <div>
          <h2>Search Results:</h2>
          <ul>
            <li>
              <strong>Username:</strong> {data.user.username}
            </li>
            <li>
              <button>Add Friend</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default FriendsSearchAdd;
