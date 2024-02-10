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
  const [duplicateMessage, setDuplicateMessage] = useState("");

  const [searchUser] = useLazyQuery(QUERY_USER_BY_USERNAME, {
    onCompleted: (result) => setData(result),
    onError: (error) => setSearchError("Username not found."),
  });

  const [addFriend] = useMutation(ADD_FRIEND);

  useMessageTimeout(searchError, setSearchError);
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
      window.location.reload();
    } catch (error) {
      console.error("Error adding friend:", error);
      setDuplicateMessage("You already have this user as a friend!");
      setData(null);
    }
  };

  const styles = {
    addIcon: {
      height: "2.5em",
      width: "2.5em",
      color: "#5fb1f0",
    },
    card: {
      marginTop: "25px",
      background: "#1b2b4580",
      alignItems: "none",
    },
    mainHeader: {
      color: "#5fb1f0",
      fontSize: "24px",
    },
    message: {
      marginTop: "10px",
      fontStyle: "italic",
      letterSpacing: "1px",
    },
    btn: {
      marginTop: "10px",
    },
    resultsHeader: {
      paddingTop: "20px",
      color: "#fe9553",
      textShadow: "0 0 5px #ff663d",
      textAlign: "left",
    },
    results: {
      color: "#f02b61",
      listStyleType: "none",
      fontSize: "16px",
    },
  };

  return (
    <Card style={styles.card}>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Card.Title style={styles.mainHeader}>Add New Friends</Card.Title>
          <Form.Group controlId="searchForm">
            <Form.Control
              type="text"
              placeholder="Search by username"
              value={searchTerm}
              onChange={handleChange}
            />
          </Form.Group>
          <div style={styles.message}>
            {searchError && <p>{searchError}</p>}

            {duplicateMessage && <p>{duplicateMessage}</p>}
          </div>
          <Button style={styles.btn} variant="primary" type="submit">
            Search
          </Button>
        </Form>
        {data && data.user && (
          <div>
            <h4 style={styles.resultsHeader}>Search Results:</h4>
            <ul style={styles.results}>
              <li>
                <strong>Add</strong> {data.user.username}
                <BsPlus
                  style={styles.addIcon}
                  onClick={() => handleAddFriend(data.user)}
                />
              </li>
            </ul>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default FriendsSearchAdd;
