import React, { useState, useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { QUERY_USER_BY_USERNAME } from "../../utils/queries";
import { ADD_FRIEND } from "../../utils/mutations";
import { Card, Form, Button } from "react-bootstrap";
import { BsPlus } from "react-icons/bs";

const useMessageTimeout = (message, setMessage) => {
  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        setMessage("");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [message, setMessage]);
};

const FriendsSearchAdd = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState(null);
  const [searchError, setSearchError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [duplicateMessage, setDuplicateMessage] = useState("");

  const [searchUser] = useLazyQuery(QUERY_USER_BY_USERNAME, {
    onCompleted: (result) => setData(result),
    onError: (error) => setSearchError("Username not found."),
  });
  const [addFriend] = useMutation(ADD_FRIEND);

  useMessageTimeout(searchError, setSearchError);
  useMessageTimeout(successMessage, setSuccessMessage);
  useMessageTimeout(duplicateMessage, setDuplicateMessage);

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
      setSuccessMessage("Friend added successfully!");
    } catch (error) {
      console.error("Error adding friend:", error);
      setDuplicateMessage("You already have this user as a friend!");
      setData(null);
    }
  };

  return (
    <Card>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Card.Title>Add New Friends</Card.Title>
          <Form.Group controlId="searchForm">
            <Form.Control
              type="text"
              placeholder="Search by username"
              value={searchTerm}
              onChange={handleChange}
            />
          </Form.Group>
          {searchError && <p className="text-danger">{searchError}</p>}
          {successMessage && <p className="text-success">{successMessage}</p>}
          {duplicateMessage && (
            <p className="text-danger">{duplicateMessage}</p>
          )}
          <Button variant="primary" type="submit">
            Search
          </Button>
        </Form>
        {data && data.user && (
          <div>
            <h2>Search Results:</h2>
            <ul>
              <li>
                <strong>Username:</strong> {data.user.username}
                <BsPlus onClick={() => handleAddFriend(data.user)} />
              </li>
            </ul>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default FriendsSearchAdd;
