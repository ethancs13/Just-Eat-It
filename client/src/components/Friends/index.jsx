import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { REMOVE_FRIEND } from "../../utils/mutations";
import FriendsSearchAdd from "./FriendsSearchAdd";
import { Card, CardBody, ListGroup, ListGroupItem } from "react-bootstrap";
import { BsX } from "react-icons/bs";

const FriendsSection = () => {
  const { loading, error, data, refetch } = useQuery(QUERY_ME);
  console.log(loading, error, data)
  const [removeFriend] = useMutation(REMOVE_FRIEND);

  const [friends, setFriends] = useState([]);

  useEffect(() => {
    if (data) {
      setFriends(data.me.friends || []);
    }
  }, [data]);

  const handleRemoveFriend = async (friendId) => {
    try {
      await removeFriend({
        variables: {
          friendId: friendId,
        },
      });
      // Refetch user data to update the friends list
      refetch();
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const styles = {
    removeIcon: {
      height: "2em",
      width: "2em",
      color: "#f02b61",
    },
    mainHeader: {
      fontSize: "26px",
      letterSpacing: "1px",
      color: "#fe9553",
      textShadow: "0 0 5px #ff663d",
      textAlign: "left",
    },
    card: {
      marginTop: "20px",
      background: "#1b2b4599",
    },
    friend: {
      margin: "5px",
      padding: "2px",
      color: "#1b2b45",
      listStyleType: "none",
      fontSize: "19px",
      borderRadius: "8px",
      background: "#FFFFFF",
    },
  };

  return (
    <div>
      <div>
        <FriendsSearchAdd />
      </div>
      <div>
        <Card style={styles.card}>
          <CardBody>
            <Card.Title style={styles.mainHeader}>Friends</Card.Title>
            <ListGroup>
              {friends.map((friend) => (
                <ListGroupItem style={styles.friend} key={friend._id}>
                  {friend.username}
                  <BsX
                    style={styles.removeIcon}
                    onClick={() => handleRemoveFriend(friend._id)}
                  />
                </ListGroupItem>
              ))}
            </ListGroup>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default FriendsSection;
